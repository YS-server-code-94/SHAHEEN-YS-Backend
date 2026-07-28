
export type AIProviderName =
  | "OPENAI"
  | "GEMINI"
  | "CLAUDE"
  | "GROQ";


export interface AIRequest {

  message: string;

  model?: string;

  stream?: boolean;

}


export interface AIResponse {

  content: string;

  model: string;

  tokens: number;

  latency: number;

  provider: AIProviderName;

}


export interface AIAdapter {

  name: AIProviderName;


  chat(
    input: AIRequest
  ): Promise<AIResponse>;


  stream?(
    input: AIRequest
  ): AsyncGenerator<string>;

}

