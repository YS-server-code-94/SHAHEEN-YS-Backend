import { prisma } from "../../database/prisma.js";


interface ChatInput {

    userId:string;

    message:string;

    conversationId?:string;

    language?:"AR"|"EN";

    gender?:"MALE"|"FEMALE";

}



async function createConversation(
    userId:string,
    language:"AR"|"EN" = "EN",
    gender?: "MALE"|"FEMALE"
){

    return prisma.conversation.create({

        data:{
            userId,
            language,
            gender,
            title:"New Conversation"
        }

    });

}



async function generateAIResponse(
    message:string
){

    /*
      لاحقاً سيتم استبداله
      بـ OpenAI/Gemini/Groq Adapter
    */

    return {

        content:
        `AI Response: ${message}`,

        provider:"OPENAI",

        model:"development",

        tokens:0,

        latency:0

    };

}



export async function sendMessage(
input:ChatInput
){

    let conversation;


    if(input.conversationId){

        conversation =
        await prisma.conversation.findFirst({

            where:{
                id:input.conversationId,
                userId:input.userId
            }

        });


        if(!conversation){

            throw new Error(
                "Conversation not found"
            );

        }


    }else{


        conversation =
        await createConversation(
            input.userId,
            input.language,
            input.gender
        );


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



    const ai =
    await generateAIResponse(
        input.message
    );



    const assistant =
    await prisma.message.create({

        data:{

            conversationId:
            conversation.id,

            role:"ASSISTANT",

            content:
            ai.content,

            provider:
            ai.provider as any,

            model:
            ai.model,

            tokens:
            ai.tokens,

            latency:
            ai.latency

        }

    });



    return {

        conversationId:
        conversation.id,

        message:
        assistant

    };

}



export async function getHistory(
userId:string,
conversationId:string
){


    return prisma.message.findMany({

        where:{

            conversationId,

            conversation:{
                userId
            }

        },

        orderBy:{
            createdAt:"asc"
        }

    });


}
