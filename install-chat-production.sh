#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "🚀 Installing SHAHEEN-YS Production Chat Architecture..."

BASE="src"

mkdir -p \
$BASE/chat \
$BASE/services/ai \
$BASE/middleware \
$BASE/types \
$BASE/routes


#################################
# Types
#################################

cat > $BASE/types/auth.ts <<'TS'
import { Request } from "express";

export interface AuthUser {
  id: string;
  role: "USER" | "ADMIN";
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}
TS


#################################
# AI Provider Adapter
#################################

cat > $BASE/services/ai/provider.adapter.ts <<'TS'
export interface AIResponse {
  content: string;
  model: string;
  provider: string;
  tokens: number;
  latency: number;
}


export interface AIProvider {
  chat(message:string):Promise<AIResponse>;
}


export class DefaultAIProvider implements AIProvider {


async chat(message:string):Promise<AIResponse>{

const start = Date.now();


/*
 Temporary adapter.
 Replace with OpenAI/Gemini/Groq adapters.
*/


const response = `SHAHEEN-YS AI Response: ${message}`;


return {

content:response,

model:"default",

provider:"internal",

tokens:response.length,

latency:Date.now()-start

};


}

}
TS


#################################
# Chat Service
#################################

cat > $BASE/chat/chat.service.ts <<'TS'
import { prisma } from "../database/prisma.js";
import { DefaultAIProvider } from "../services/ai/provider.adapter.js";


const ai = new DefaultAIProvider();



export async function createChat(
userId:string,
message:string,
language:"AR"|"EN"="EN"
){


let conversation =
await prisma.conversation.findFirst({

where:{
userId
},

orderBy:{
createdAt:"desc"
}

});



if(!conversation){

conversation =
await prisma.conversation.create({

data:{

userId,

title:
message.substring(0,40),

language

}

});

}



await prisma.message.create({

data:{

conversationId:conversation.id,

role:"USER",

content:message

}

});



const aiResponse =
await ai.chat(message);



await prisma.message.create({

data:{

conversationId:conversation.id,

role:"ASSISTANT",

content:aiResponse.content,

provider:"OPENROUTER",

model:aiResponse.model,

tokens:aiResponse.tokens,

latency:aiResponse.latency

}

});



return {

conversationId:conversation.id,

response:aiResponse

};


}
TS



#################################
# Chat Controller
#################################

cat > $BASE/chat/chat.controller.ts <<'TS'
import { Response } from "express";
import { AuthRequest } from "../types/auth.js";
import { createChat } from "./chat.service.js";


export async function chatController(
req:AuthRequest,
res:Response
){


try{


if(!req.user){

return res.status(401).json({

error:"Unauthorized"

});

}


const {
message,
language
}=req.body;



if(!message){

return res.status(400).json({

error:"Message required"

});

}



const result =
await createChat(

req.user.id,

message,

language || "EN"

);



return res.json(result);



}catch(error){


console.error(error);


return res.status(500).json({

error:"Chat failed"

});


}



}
TS



#################################
# Chat Routes
#################################

cat > $BASE/chat/chat.routes.ts <<'TS'
import {Router} from "express";
import {chatController} from "./chat.controller.js";
import {authMiddleware} from "../auth/auth.middleware.js";


const router=Router();


router.post(
"/",
authMiddleware,
chatController
);


export default router;
TS



#################################
# Rate Limiter
#################################

cat > $BASE/middleware/rateLimiter.ts <<'TS'
import rateLimit from "express-rate-limit";


export const userRateLimiter =
rateLimit({

windowMs:60*1000,

limit:30,

message:{

error:"Too many requests"

}

});
TS



#################################
# Roles Middleware
#################################

cat > $BASE/middleware/roles.ts <<'TS'

import {Response,NextFunction} from "express";
import {AuthRequest} from "../types/auth.js";


export function roleMiddleware(
role:"USER"|"ADMIN"
){

return (

req:AuthRequest,

res:Response,

next:NextFunction

)=>{


if(!req.user){

return res.status(401).json({

error:"Unauthorized"

});

}


if(req.user.role!==role){

return res.status(403).json({

error:"Forbidden"

});

}


next();


};


}

TS



#################################
# Language Middleware
#################################

cat > $BASE/middleware/language.ts <<'TS'

import {Request,Response,NextFunction} from "express";


export function languageMiddleware(
req:Request,
res:Response,
next:NextFunction
){


const lang =
req.headers["accept-language"];


if(lang?.includes("ar")){

(req as any).language="AR";

}else{

(req as any).language="EN";

}


next();


}

TS



#################################
# Routes Update
#################################

cat > $BASE/routes/chat.ts <<'TS'
import {Router} from "express";
import {chatController} from "../chat/chat.controller.js";
import {authMiddleware} from "../auth/auth.middleware.js";
import {userRateLimiter} from "../middleware/rateLimiter.js";


const router=Router();


router.post(

"/",

authMiddleware,

userRateLimiter,

chatController

);



export default router;
TS



echo "✅ Chat Production Architecture Installed"

