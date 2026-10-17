/**
 * Which AI service the app's AI features (chat assistant, lender doc import) talk to.
 * Claude uses the Anthropic SDK; every other provider speaks the OpenAI Chat Completions format.
 * All of them allow direct browser calls (CORS verified 2026-10-17).
 */
export type AIProvider = 'openai' | 'claude' | 'gemini' | 'grok' | 'openrouter' | 'omniroute';

/** How a provider takes PDFs: OpenAI `file` part, Anthropic `document` block, or rendered page images. */
export type PdfMode = 'file' | 'document' | 'images';

export interface ProviderInfo {
  label: string;      // shown in Settings + chat header
  api: 'openai' | 'anthropic';
  url: string;        // chat endpoint (OpenAI format) — unused for Claude
  chatModel: string;  // default model for the AI chat assistant
  docModel: string;   // default model for reading lender documents (accuracy matters more than cost)
  keyUrl: string;     // where to get a key
  keyPlaceholder: string;
  pdfMode: PdfMode;
  free?: string;      // shown as a "free" note in Settings
}

export const PROVIDERS: Record<AIProvider, ProviderInfo> = {
  openai: {
    label: 'OpenAI', api: 'openai', url: 'https://api.openai.com/v1/chat/completions',
    chatModel: 'gpt-4o-mini', docModel: 'gpt-4o', keyUrl: 'https://platform.openai.com/api-keys',
    keyPlaceholder: 'sk-...', pdfMode: 'file',
  },
  claude: {
    label: 'Claude (Anthropic)', api: 'anthropic', url: '',
    chatModel: 'claude-opus-5-5', docModel: 'claude-opus-5-5', keyUrl: 'https://console.anthropic.com/settings/keys',
    keyPlaceholder: 'sk-ant-...', pdfMode: 'document',
  },
  gemini: {
    label: 'Gemini (Google)', api: 'openai', url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
    chatModel: 'gemini-3.6-flash', docModel: 'gemini-3.6-flash', keyUrl: 'https://aistudio.google.com/apikey',
    keyPlaceholder: 'AIza...', pdfMode: 'images',
    free: 'Free tier with a Google AI Studio key (rate-limited; Google may use free-tier prompts to improve its models).',
  },
  grok: {
    label: 'Grok (xAI)', api: 'openai', url: 'https://api.x.ai/v1/chat/completions',
    chatModel: 'grok-4.7', docModel: 'grok-4.7', keyUrl: 'https://console.x.ai',
    keyPlaceholder: 'xai-...', pdfMode: 'images',
  },
  openrouter: {
    label: 'OpenRouter', api: 'openai', url: 'https://openrouter.ai/api/v1/chat/completions',
    chatModel: 'openrouter/free', docModel: 'openrouter/free', keyUrl: 'https://openrouter.ai/keys',
    keyPlaceholder: 'sk-or-...', pdfMode: 'images',
    free: 'Free models: "openrouter/free" picks a free model automatically, or choose any ":free" model. Free OpenRouter account key, daily limits apply.',
  },
  omniroute: {
    label: 'OmniRoute', api: 'openai', url: '', // built from the user's OmniRoute URL
    chatModel: '', docModel: '', keyUrl: '', keyPlaceholder: 'key from your OmniRoute dashboard', pdfMode: 'images',
    free: 'Runs on this computer and routes through the subscriptions/free providers you connected in OmniRoute.',
  },
};

/** Settings fields that hold each provider's API key. */
export const KEY_FIELD = {
  openai: 'openaiApiKey', claude: 'anthropicApiKey', gemini: 'geminiApiKey',
  grok: 'xaiApiKey', openrouter: 'openrouterApiKey', omniroute: 'omnirouteApiKey',
} as const satisfies Record<AIProvider, string>;

export interface AIPrefs {
  aiProvider?: AIProvider;
  openaiApiKey?: string;
  anthropicApiKey?: string;
  geminiApiKey?: string;
  xaiApiKey?: string;
  openrouterApiKey?: string;
  omnirouteApiKey?: string;
  omnirouteUrl?: string;
  aiModels?: Partial<Record<AIProvider, string>>; // user-picked model per provider (overrides the defaults)
}

export interface AIConfig extends ProviderInfo {
  provider: AIProvider;
  apiKey: string;
}

/** OmniRoute: self-hosted OpenAI-compatible router (default dashboard at localhost:20128). */
export const DEFAULT_OMNIROUTE_URL = 'http://localhost:20128/v1';

/** Normalize a user-entered OmniRoute base URL to ".../v1" (no trailing slash). */
export const omnirouteBase = (url?: string): string => {
  const base = (url || DEFAULT_OMNIROUTE_URL).trim().replace(/\/+$/, '').replace(/\/chat\/completions$/, '');
  return /\/v1$/.test(base) ? base : `${base}/v1`;
};

export const getAIConfig = (prefs: AIPrefs): AIConfig => {
  const provider: AIProvider = prefs.aiProvider && PROVIDERS[prefs.aiProvider] ? prefs.aiProvider : 'openai';
  const info = { ...PROVIDERS[provider] };
  if (provider === 'omniroute') {
    const base = omnirouteBase(prefs.omnirouteUrl);
    info.url = `${base}/chat/completions`;
    info.keyUrl = base.replace(/\/v1$/, '/dashboard');
  }
  const model = prefs.aiModels?.[provider]?.trim();
  if (model) { info.chatModel = model; info.docModel = model; }
  return { ...info, provider, apiKey: (prefs[KEY_FIELD[provider]] as string) || '' };
};
