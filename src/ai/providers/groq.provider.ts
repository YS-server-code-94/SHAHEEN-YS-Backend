import {
AIResponse,
AIRequest
} from "../ai.types.js";


export async function groqProvider(
request:AIRequest
):Promise<AIResponse>{


return {

content:
"Groq provider placeholder",

provider:
"GROQ",

model:
"llama-3",

tokens:0,

latency:0

};


}
