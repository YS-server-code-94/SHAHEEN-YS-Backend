import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main(){

const user = await prisma.user.findUnique({
where:{
email:"admin@shaheen.com"
}
});


if(!user){
console.log("USER NOT FOUND");
return;
}


const result = await bcrypt.compare(
"Password123!",
user.password
);


console.log({
email:user.email,
passwordMatch:result
});

}

main()
.finally(()=>prisma.$disconnect());
