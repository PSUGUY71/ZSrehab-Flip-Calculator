import type Anthropic from '@anthropic-ai/sdk';
import { AIConfig, PROVIDERS, omnirouteBase, AIPrefs } from './aiProvider';

/**
 * One place that talks to the chosen AI service. Claude goes through the Anthropic SDK
 * (loaded only when Claude is picked); everything else uses OpenAI-format fetch calls.
 */

export type ChatTurn = { role: 'user' | 'assistant'; content: string };
/** Provider-neutral document pieces; converted to each API's content format below. */
export type DocPart =
  | { type: 'text'; text: string }
  | { type: 'image'; dataUrl: string }
  | { type: 'pdf'; dataUrl: string; name: string };

// Request may get one silent server-side retry on another Claude model if the first declines.
const CLAUDE_BETAS = ['server-side-fallback-2026-07-01'];

const anthropicClient = async (apiKey: string) => {
  const { default: AnthropicSDK } = await import('@anthropic-ai/sdk');
  // The key is the user's own, stored in their browser and sent only to Anthropic.
  return { sdk: AnthropicSDK, client: new AnthropicSDK({ apiKey, dangerouslyAllowBrowser: true }) };
};

const abortError = () => new DOMException('Cancelled', 'AbortError');

/** Friendly message for an Anthropic SDK error. */
const claudeError = (sdk: typeof Anthropic, err: unknown, label: string): Error => {
  if (err instanceof sdk.APIUserAbortError) return abortError();
  if (err instanceof sdk.AuthenticationError) return new Error(`Invalid ${label} API key — check Settings → AI Assistant.`);
  if (err instanceof sdk.PermissionDeniedError) return new Error(`API key issue: check your ${label} account billing or permissions.`);
  if (err instanceof sdk.RateLimitError) return new Error('Rate limit reached. Please wait a moment and try again.');
  if (err instanceof sdk.NotFoundError) return new Error(`Model not found — check the model name in Settings → AI Assistant.`);
  if (err instanceof sdk.APIError) return new Error(err.message);
  return err instanceof Error ? err : new Error(String(err));
};

const openaiHttpError = async (resp: Response, label: string) => {
  const body = await resp.json().catch(() => ({}));
  if (resp.status === 401) return new Error(`Invalid ${label} API key — check Settings → AI Assistant.`);
  if (resp.status === 429) return new Error('Rate limit reached (free tiers have daily/minute limits). Please wait and try again.');
  if (resp.status === 402 || resp.status === 403) return new Error(`API key issue: check your ${label} account billing or permissions.`);
  const msg = body?.error?.message || (Array.isArray(body) && body[0]?.error?.message) || body?.error;
  return new Error(typeof msg === 'string' ? msg : `${label} error (${resp.status})`);
};

/** Stream a chat reply; calls onDelta with each new piece of text. */
export const streamChat = async (
  ai: AIConfig, system: string, turns: ChatTurn[], onDelta: (text: string) => void, signal: AbortSignal,
) => {
  if (ai.api === 'anthropic') {
    const { sdk, client } = await anthropicClient(ai.apiKey);
    try {
      const stream = client.beta.messages.stream({
        model: ai.chatModel,
        max_tokens: 16000,
        system,
        messages: turns,
        output_config: { effort: 'low' }, // chat answers don't need deep reasoning
        betas: CLAUDE_BETAS,
        fallbacks: 'default',
      }, { signal });
      stream.on('text', onDelta);
      const msg = await stream.finalMessage();
      if (msg.stop_reason === 'refusal') onDelta('\n\n*(Claude declined to answer this one.)*');
    } catch (err) {
      throw claudeError(sdk, err, ai.label);
    }
    return;
  }

  const resp = await fetch(ai.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ai.apiKey}` },
    body: JSON.stringify({
      model: ai.chatModel,
      messages: [{ role: 'system', content: system }, ...turns],
      stream: true,
      temperature: 0.7,
      max_tokens: 1000,
    }),
    signal,
  });
  if (!resp.ok) throw await openaiHttpError(resp, ai.label);
  const reader = resp.body?.getReader();
  if (!reader) throw new Error('No response stream');

  const decoder = new TextDecoder();
  let buffer = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || ''; // keep a partial line for the next chunk
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6).trim();
      if (data === '[DONE]') return;
      try {
        const delta = JSON.parse(data).choices?.[0]?.delta?.content;
        if (delta) onDelta(delta);
      } catch {
        // skip malformed / keep-alive chunks
      }
    }
  }
};

const splitDataUrl = (dataUrl: string) => {
  const [, mediaType, data] = /^data:([^;]+);base64,(.*)$/.exec(dataUrl) || [];
  return { mediaType, data };
};

/** Read documents and return the JSON object matching `schema`. Falls back to plain-JSON mode if strict schema is rejected. */
export const extractJSON = async (
  ai: AIConfig, prompt: string, instruction: string, parts: DocPart[], schema: object,
): Promise<any> => {
  const looseSystem = `${prompt}\nReply with only a JSON object matching this JSON schema (every key present, null when unknown):\n${JSON.stringify(schema)}`;
  const parse = (text: string) => JSON.parse(text.trim().replace(/^```(?:json)?\s*|\s*```$/g, '') || '{}');

  if (ai.api === 'anthropic') {
    const { sdk, client } = await anthropicClient(ai.apiKey);
    const content: Anthropic.Beta.BetaContentBlockParam[] = parts.map((p) => {
      if (p.type === 'text') return { type: 'text', text: p.text };
      const { mediaType, data } = splitDataUrl(p.dataUrl);
      return p.type === 'pdf'
        ? { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data }, title: p.name }
        : { type: 'image', source: { type: 'base64', media_type: mediaType as 'image/png', data } };
    });
    content.push({ type: 'text', text: instruction }); // documents first, question last
    const call = (strict: boolean) => client.beta.messages.create({
      model: ai.docModel,
      max_tokens: 16000,
      system: strict ? prompt : looseSystem,
      messages: [{ role: 'user', content }],
      output_config: strict
        ? { effort: 'high', format: { type: 'json_schema', schema: schema as Record<string, unknown> } }
        : { effort: 'high' },
      betas: CLAUDE_BETAS,
      fallbacks: 'default',
    });
    try {
      let msg;
      try {
        msg = await call(true);
      } catch (err) {
        if (!(err instanceof sdk.BadRequestError)) throw err;
        msg = await call(false); // model/schema combo not supported for structured output
      }
      if (msg.stop_reason === 'refusal') throw new Error('Claude declined to read these documents.');
      const text = msg.content.map((b) => (b.type === 'text' ? b.text : '')).join('');
      return parse(text);
    } catch (err) {
      throw claudeError(sdk, err, ai.label);
    }
  }

  const content = [
    { type: 'text', text: instruction },
    ...parts.map((p) =>
      p.type === 'text' ? { type: 'text', text: p.text }
        : p.type === 'pdf' ? { type: 'file', file: { filename: p.name, file_data: p.dataUrl } }
        : { type: 'image_url', image_url: { url: p.dataUrl, detail: 'high' } }),
  ];
  const call = (strict: boolean) => fetch(ai.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ai.apiKey}` },
    body: JSON.stringify({
      model: ai.docModel,
      temperature: 0,
      messages: [{ role: 'system', content: strict ? prompt : looseSystem }, { role: 'user', content }],
      response_format: strict
        ? { type: 'json_schema', json_schema: { name: 'loan_terms', strict: true, schema } }
        : { type: 'json_object' },
    }),
  });
  let resp = await call(true);
  if (resp.status === 400) {
    const text = await resp.clone().text();
    if (/schema|response_format|json/i.test(text)) resp = await call(false);
  }
  if (!resp.ok) throw await openaiHttpError(resp, ai.label);
  const body = await resp.json();
  const msg = body.choices?.[0]?.message;
  if (msg?.refusal) throw new Error(msg.refusal);
  return parse(String(msg?.content || '{}'));
};

/** Model ids the provider offers, for the Settings model picker. OpenRouter is filtered to free models. */
export const listModels = async (ai: AIConfig, prefs: AIPrefs): Promise<string[]> => {
  if (ai.api === 'anthropic') {
    const { sdk, client } = await anthropicClient(ai.apiKey);
    try {
      const ids: string[] = [];
      for await (const m of client.models.list()) ids.push(m.id);
      return ids;
    } catch (err) {
      throw claudeError(sdk, err, ai.label);
    }
  }
  const base = ai.provider === 'omniroute' ? omnirouteBase(prefs.omnirouteUrl) : PROVIDERS[ai.provider].url.replace(/\/chat\/completions$/, '');
  const resp = await fetch(`${base}/models`, { headers: { Authorization: `Bearer ${ai.apiKey}` } });
  if (!resp.ok) throw await openaiHttpError(resp, ai.label);
  const body = await resp.json();
  let models: any[] = body?.data || [];
  if (ai.provider === 'openrouter') {
    models = models.filter((m) => m.id === 'openrouter/free' || String(m.id).endsWith(':free') || m.pricing?.prompt === '0');
  }
  return models
    .map((m) => String(m.id).replace(/^models\//, '')) // Gemini prefixes ids with "models/"
    .filter(Boolean)
    .sort();
};

/** Error text that means the model can't take images/PDFs — used to show a friendlier hint. */
export const looksLikeNoVision = (msg: string) =>
  /image|vision|multimodal|modalit|pdf|file type|unsupported content|not support.*(file|input)/i.test(msg);
