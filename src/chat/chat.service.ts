import {
  prisma
} from "../database/prisma.js";

import {
  aiGateway
} from "../ai/ai.gateway.js";


import {
  AIProviderName
} from "../ai/ai.types.js";



export interface ChatInput {

  userId:string;

  message:string;

  title?:string;

  language?: 
    "AR" |
    "EN";

  gender?:
    "MALE" |
    "FEMALE";

  conversationId?:string;

  provider?:AIProviderName;

}



class ChatService {


  async processMessage(
    input:ChatInput
  ){


    let conversation;



    if(input.conversationId){


      conversation =
        await prisma.conversation.findUnique({

          where:{
            id:input.conversationId
          }

        });


    }



    if(!conversation){


      conversation =
        await prisma.conversation.create({

          data:{

            userId:
              input.userId,


            title:
              input.title ??
              input.message.substring(
                0,
                60
              )

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
          input.message

      }

    });



    const aiResponse =
      await aiGateway.chat({

        messages:[

          {

            role:"user",

            content:
              input.message

          }

        ]

      });



    await prisma.message.create({

      data:{

        conversationId:
          conversation.id,


        role:
          "ASSISTANT",


        content:
          aiResponse.content,


        provider:
          aiResponse.provider,


        model:
          aiResponse.model,


        tokens:
          aiResponse.tokens,


        latency:
          aiResponse.latency

      }

    });



    return {

      conversationId:
        conversation.id,


      message:
        aiResponse.content,


      provider:
        aiResponse.provider,


      tokens:
        aiResponse.tokens,


      latency:
        aiResponse.latency

    };


  }


}



export const chatService =
  new ChatService();
