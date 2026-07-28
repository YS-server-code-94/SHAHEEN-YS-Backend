export const PROVIDER_TYPES = {
  CHAT: 'chat',
  SEARCH: 'search',
  VOICE: 'voice',
  INTEGRATION: 'integration',
} as const;

export const CHAT_PROVIDERS = {
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
  GEMINI: 'gemini',
  GROQ: 'groq',
  MISTRAL: 'mistral',
  DEEPSEEK: 'deepseek',
  XAI: 'xai',
  OPENROUTER: 'openrouter',
} as const;

export const SEARCH_PROVIDERS = {
  GOOGLE: 'google',
  TAVILY: 'tavily',
  EXA: 'exa',
  FIRECRAWL: 'firecrawl',
} as const;

export const VOICE_PROVIDERS = {
  ELEVENLABS: 'elevenlabs',
} as const;

export const INTEGRATIONS = {
  TELEGRAM: 'telegram',
} as const;

export const DEFAULT_MODEL_SETTINGS = {
  temperature: 0.7,
  maxTokens: 2048,
  topP: 0.9,
} as const;
