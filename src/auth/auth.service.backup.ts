import bcrypt from "bcryptjs";
import { prisma } from "../database/prisma.js";
import {
createAccessToken,
createRefreshToken
} from "./jwt.js";


export async function register(
email:string,
password:string,
gender:"MALE"|"FEMALE"="MALE"
){

const exists =
await prisma.user.findUnique({
where:{email}
});


if(exists)
throw new Error("User already exists");


const hash =
await bcrypt.hash(password,12);


const user =
await prisma.user.create({

data:{
email,
password:hash,
gender
}

});


const refresh =
createRefreshToken({
id:user.id
});


await prisma.refreshToken.create({

data:{
token:refresh,
userId:user.id,
expiresAt:
new Date(Date.now()+30*24*60*60*1000)
}

});


return {

accessToken:
createAccessToken({
id:user.id,
email:user.email
}),

refreshToken:refresh

};

}



export async function login(
email:string,
password:string
){

const user =
await prisma.user.findUnique({
where:{email}
});


if(!user)
throw new Error("Invalid credentials");


const valid =
await bcrypt.compare(
password,
user.password
);


if(!valid)
throw new Error("Invalid credentials");


const refresh =
createRefreshToken({
id:user.id
});


await prisma.refreshToken.create({

data:{
token:refresh,
userId:user.id,
expiresAt:
new Date(Date.now()+30*24*60*60*1000)
}

});


return {

accessToken:
createAccessToken({
id:user.id,
email:user.email
}),

refreshToken:refresh

};

}
