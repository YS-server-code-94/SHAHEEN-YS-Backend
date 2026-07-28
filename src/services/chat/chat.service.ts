import { prisma } from "../../database/prisma.js";


import {
getAIProvider
} from "../ai/index.js";



export async function sendMessage(
userId:string,
message:string,
providerName:string="OPENAI",
conversationId?:string
)
{


 let conversation;


 if(conversationId)
 {


 conversation =
 await prisma.conversation.findFirst({

 where:{
 id:conversationId,
 userId
 }

 });


 }


 if(!conversation)
 {

 conversation =
 await prisma.conversation.create({

 data:{


 userId,


 title:
 message.substring(0,50)


 }


 });


 }



 await prisma.message.create({

 data:{


 conversationId:
 conversation.id,


 role:
 "USER",


 content:
 message


 }


 });



 const history =
 await prisma.message.findMany({

 where:{
 conversationId:
 conversation.id
 },


 orderBy:{
 createdAt:"asc"
 }


 });



 const ai =
 getAIProvider(providerName);



 const result =
 await ai.chat(
 message,
 history
 );




 await prisma.message.create({

 data:{


 conversationId:
 conversation.id,


 role:
 "ASSISTANT",


 content:
 result.content,


 provider:
 providerName as any,


 model:
 result.model,


 tokens:
 result.tokens,


 latency:
 result.latency


 }


 });



 return {

 conversationId:
 conversation.id,


 answer:
 result.content,


 provider:
 result.provider,


 model:
 result.model,


 tokens:
 result.tokens,


 latency:
 result.latency


 };


}
