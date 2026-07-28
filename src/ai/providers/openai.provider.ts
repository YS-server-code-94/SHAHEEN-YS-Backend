import {
AIResponse,
AIRequest
} from "../ai.types.js";


export async function openAIProvider(
request:AIRequest
):Promise<AIResponse>{


return {

content:
"OpenAI provider placeholder",

provider:
"OPENAI",

model:
"gpt-4o",

tokens:0,

latency:0

};


}
