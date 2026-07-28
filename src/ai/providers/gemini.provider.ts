import {
AIResponse,
AIRequest
} from "../ai.types.js";


export async function geminiProvider(
request:AIRequest
):Promise<AIResponse>{


return {

content:
"Gemini provider placeholder",

provider:
"GEMINI",

model:
"gemini-pro",

tokens:0,

latency:0

};


}
