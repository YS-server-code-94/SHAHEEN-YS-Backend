import { prisma } from "../../database/prisma.js";


export async function getChatHistory(
userId:string
)
{


 return prisma.conversation.findMany({

 where:{
 userId
 },


 include:{


 messages:true


 },


 orderBy:{


 updatedAt:"desc"


 }


 });


}
