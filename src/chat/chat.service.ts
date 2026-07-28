import { prisma } from "../database/prisma.js";
import { AIProvider } from "@prisma/client";


interface ChatInput {

userId:string;

message:string;

conversationId?:string;

provider?:string;

model?:string;

language?:string;

}



export async function processChat(

input:ChatInput

){



const start =
Date.now();



let conversation;



if(input.conversationId){


conversation =
await prisma.conversation.findFirst({

where:{

id:input.conversationId,

userId:input.userId

}

});


}



if(!conversation){


conversation =
await prisma.conversation.create({

data:{


userId:input.userId,


title:
input.message.substring(0,50),


language:
input.language === "AR"
?
"AR"
:
"EN"


}

});


}



await prisma.message.create({

data:{


conversationId:
conversation.id,


role:"USER",


content:
input.message


}

});





/*
AI Provider Placeholder


OpenAI
Gemini
Claude
Groq

 المرحلة القادمة
*/


const aiResponse =
`Echo: ${input.message}`;



const latency =
Date.now()-start;



const assistantMessage =
await prisma.message.create({

data:{


conversationId:
conversation.id,


role:"ASSISTANT",


content:
aiResponse,


provider:
input.provider
? input.provider as AIProvider
: null,


model:
input.model || null,


tokens:
aiResponse.length,


latency

}

});




return {


conversationId:
conversation.id,


message:
assistantMessage.content,


createdAt:
assistantMessage.createdAt


};



}
