import {
AIResponse,
AIRequest
} from "../ai.types.js";


export async function claudeProvider(
request:AIRequest
):Promise<AIResponse>{


return {

content:
"Claude provider placeholder",

provider:
"CLAUDE",

model:
"claude-3",

tokens:0,

latency:0

};


}
