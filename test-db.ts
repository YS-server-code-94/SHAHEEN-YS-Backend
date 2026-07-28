import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const users = await prisma.user.count();

  const tokens = await prisma.refreshToken.count();

  console.log({
    users,
    tokens
  });

}

main()
.catch((error)=>{
  console.error(error);
  process.exit(1);
})
.finally(async()=>{
  await prisma.$disconnect();
});
