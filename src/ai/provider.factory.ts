import {
  AIAdapter,
  AIProviderName
} from "./ai.types.js";


import { OpenAIAdapter } from "./adapters/openai.adapter.js";
import { GeminiAdapter } from "./adapters/gemini.adapter.js";
import { ClaudeAdapter } from "./adapters/claude.adapter.js";
import { GroqAdapter } from "./adapters/groq.adapter.js";



export function createProvider(
  provider: AIProviderName
): AIAdapter {


  switch(provider){


    case "OPENAI":

      return new OpenAIAdapter();



    case "GEMINI":

      return new GeminiAdapter();



    case "CLAUDE":

      return new ClaudeAdapter();



    case "GROQ":

      return new GroqAdapter();



    default:

      throw new Error(
        `Unsupported AI Provider: ${provider}`
      );

  }

}
