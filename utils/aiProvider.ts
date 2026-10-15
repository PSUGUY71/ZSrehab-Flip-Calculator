/**
 * Which AI service the app's AI features (chat assistant, lender doc import) talk to.
 * Both providers speak the OpenAI Chat Completions format and allow direct browser calls.
 */
export type AIProvider = 'openai' | 'grok';

export interface AIConfig {
  provider: AIProvider;
  label: string;
  apiKey: string;
  url: string;
  chatModel: string; // AI chat assistant
  docModel: string;  // reading lender documents (accuracy matters more than cost)
  keyUrl: string;    // where to get a key
}

export const getAIConfig = (prefs: { aiProvider?: AIProvider; openaiApiKey?: string; xaiApiKey?: string }): AIConfig =>
  prefs.aiProvider === 'grok'
    ? {
        provider: 'grok',
        label: 'Grok (xAI)',
        apiKey: prefs.xaiApiKey || '',
        url: 'https://api.x.ai/v1/chat/completions',
        chatModel: 'grok-4.7',
        docModel: 'grok-4.7',
        keyUrl: 'https://console.x.ai',
      }
    : {
        provider: 'openai',
        label: 'OpenAI',
        apiKey: prefs.openaiApiKey || '',
        url: 'https://api.openai.com/v1/chat/completions',
        chatModel: 'gpt-4o-mini',
        docModel: 'gpt-4o',
        keyUrl: 'https://platform.openai.com/api-keys',
      };
