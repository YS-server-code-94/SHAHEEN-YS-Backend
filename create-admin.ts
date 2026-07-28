import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main(){

const passwordHash = await bcrypt.hash(
"Password123!",
12
);

const user = await prisma.user.upsert({

where:{
email:"admin@shaheen.com"
},

update:{
password:passwordHash,
role:"ADMIN",
gender:"MALE",
language:"EN"
},

create:{
email:"admin@shaheen.com",
password:passwordHash,
role:"ADMIN",
gender:"MALE",
language:"EN"
}

});

console.log({
id:user.id,
email:user.email,
role:user.role
});

}

main()
.finally(async()=>{
await prisma.$disconnect();
});
