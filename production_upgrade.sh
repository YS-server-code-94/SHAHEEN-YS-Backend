#!/bin/bash

set -e


echo "🚀 SHAHEEN-YS Production Upgrade Started"


ROOT=$(pwd)


echo "📦 Installing required packages..."


npm install \
zod \
uuid \
openai \
@google/generative-ai \
@anthropic-ai/sdk \
groq-sdk \
express-rate-limit \
jsonwebtoken \
swagger-ui-express \
swagger-jsdoc


npm install -D \
@types/uuid \
@types/jsonwebtoken



echo "📁 Creating directories..."


mkdir -p \
src/ai/adapters \
src/ai/providers \
src/ai/usage \
src/chat \
src/types



#################################
# AI TYPES
#################################

cat > src/ai/ai.types.ts <<'TS'

export type AIProviderName =
| "OPENAI"
| "GEMINI"
| "CLAUDE"
| "GROQ";


export interface AIRequest {

message:string;

model?:string;

stream?:boolean;

}


export interface AIResponse {

text:string;

tokens:number;

latency:number;

provider:AIProviderName;

}


export interface AIAdapter {

name:AIProviderName;


chat(
input:AIRequest
):Promise<AIResponse>;


stream?(
input:AIRequest
):AsyncGenerator<string>;

}

TS



#################################
# CHAT TYPES
#################################

cat > src/types/chat.types.ts <<'TS'


import {
AIProviderName
} from "../ai/ai.types.js";


export interface ChatInput {

userId:string;

message:string;

title?:string;

language?:
"AR"|
"EN";


gender?:
"MALE"|
"FEMALE";


conversationId?:string;


provider?:AIProviderName;


stream?:boolean;


}


TS




#################################
# PROVIDER FACTORY
#################################

cat > src/ai/provider.factory.ts <<'TS'


import {
AIAdapter,
AIProviderName
} from "./ai.types.js";


import {
OpenAIAdapter
} from "./adapters/openai.adapter.js";


import {
GeminiAdapter
} from "./adapters/gemini.adapter.js";


import {
ClaudeAdapter
} from "./adapters/claude.adapter.js";


import {
GroqAdapter
} from "./adapters/groq.adapter.js";



export function createProvider(
name:AIProviderName
):AIAdapter {


switch(name){


case "OPENAI":
return new OpenAIAdapter();


case "GEMINI":
return new GeminiAdapter();


case "CLAUDE":
return new ClaudeAdapter();


case "GROQ":
return new GroqAdapter();


default:
return new OpenAIAdapter();


}


}

TS




#################################
# AI GATEWAY
#################################

cat > src/ai/ai.gateway.ts <<'TS'


import {
AIProviderName,
AIResponse
} from "./ai.types.js";


import {
createProvider
} from "./provider.factory.js";



export async function aiGateway(
provider:AIProviderName,
message:string
):Promise<AIResponse>{


const adapter =
createProvider(provider);


const start =
Date.now();



const result =
await adapter.chat({
message
});



return {

...result,

latency:
Date.now()-start,

provider

};


}


TS




#################################
# USER RATE LIMIT
#################################

cat > src/middleware/userRateLimit.ts <<'TS'


import rateLimit from "express-rate-limit";


export const userRateLimit =
rateLimit({

windowMs:
60*1000,


limit:50,


standardHeaders:true,


legacyHeaders:false,


keyGenerator(req){

return (
req.user?.id ??
req.ip ??
"unknown"
);

}

});


TS




#################################
# VALIDATION
#################################

cat > src/chat/chat.validation.ts <<'TS'


import {
z
} from "zod";


export const chatSchema =
z.object({

message:
z.string()
.min(1)
.max(10000),


title:
z.string()
.max(100)
.optional(),


language:
z.enum([
"AR",
"EN"
])
.optional(),


provider:
z.enum([
"OPENAI",
"GEMINI",
"CLAUDE",
"GROQ"
])
.optional()


});


TS





#################################
# CLEAN BUILD
#################################

echo "🧹 Cleaning..."

rm -rf dist


echo "🔄 Prisma generate..."

npx prisma generate



echo "🔍 TypeScript checking..."

npm run build



echo ""
echo "================================="
echo "✅ Production Upgrade Completed"
echo "================================="

