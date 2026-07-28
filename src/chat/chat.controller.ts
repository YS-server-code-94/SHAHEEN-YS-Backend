import { Response } from "express";
import { z } from "zod";

import { prisma } from "../database/prisma.js";
import { AuthRequest } from "../auth/auth.middleware.js";
import { chatService } from "./chat.service.js";


const chatSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(10000, "Message too long"),

  conversationId: z
    .string()
    .uuid()
    .optional(),

  title: z
    .string()
    .max(120)
    .optional(),

  language: z
    .enum(["AR", "EN"])
    .optional(),

  gender: z
    .enum(["MALE", "FEMALE"])
    .optional()
});


/**
 * @swagger
 * /api/v1/chat:
 *   post:
 *     summary: Send chat message
 *     security:
 *       - bearerAuth: []
 */
export async function sendChat(
  req: AuthRequest,
  res: Response
) {

  try {

    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized"
      });
    }


    const userId = req.user.id;


    const data = chatSchema.parse(req.body);



    const result = await chatService.processMessage({

      userId,

      message: data.message,

      conversationId:
        data.conversationId,

      title:
        data.title,

      language:
        data.language,

      gender:
        data.gender

    });



    return res.status(200).json({

      success:true,

      data:result

    });



  } catch(error:any){


    if(error instanceof z.ZodError){

      return res.status(400).json({

        error:"Validation failed",

        details:error.errors

      });

    }


    console.error(error);


    return res.status(500).json({

      error:"Internal server error"

    });


  }

}




/**
 * @swagger
 * /api/v1/chat/history:
 *   get:
 *     summary: Get chat history
 *     security:
 *       - bearerAuth: []
 */
export async function chatHistory(
 req: AuthRequest,
 res: Response
){

 try {


  if(!req.user){

    return res.status(401).json({
      error:"Unauthorized"
    });

  }


  const conversations =
    await prisma.conversation.findMany({

      where:{
        userId:req.user.id
      },


      include:{

        messages:{
          orderBy:{
            createdAt:"asc"
          }
        }

      },


      orderBy:{
        updatedAt:"desc"
      }

    });



 return res.json({

   success:true,

   data:conversations

 });



 }catch(error){


 console.error(error);


 return res.status(500).json({

  error:"Failed loading history"

 });


 }


}
