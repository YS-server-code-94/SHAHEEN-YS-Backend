import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){

 const result = await prisma.user.count();

 const conversations = await prisma.conversation.count();

 const messages = await prisma.message.count();

 console.log({
   users: result,
   conversations,
   messages
 });

}

main()
.catch(console.error)
.finally(async()=>{
 await prisma.$disconnect();
});
