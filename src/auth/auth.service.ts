import bcrypt from "bcryptjs";

import {
createAccessToken,
createRefreshToken
}
from "./jwt.js";


interface UserRecord {

id:string;

email:string;

password:string;

}



const users:UserRecord[]=[];



export async function register(
email:string,
password:string
){


const exists =
users.find(
u=>u.email===email
);


if(exists){

throw new Error(
"User already exists"
);

}



const hashed =
await bcrypt.hash(
password,
12
);



const user={

id:crypto.randomUUID(),

email,

password:hashed

};



users.push(user);



return {

accessToken:
createAccessToken({
id:user.id,
email:user.email
}),


refreshToken:
createRefreshToken({
id:user.id
})

};

}



export async function login(
email:string,
password:string
){


const user =
users.find(
u=>u.email===email
);



if(!user){

throw new Error(
"Invalid credentials"
);

}



const valid =
await bcrypt.compare(
password,
user.password
);



if(!valid){

throw new Error(
"Invalid credentials"
);

}



return {

accessToken:
createAccessToken({
id:user.id,
email:user.email
}),


refreshToken:
createRefreshToken({
id:user.id
})

};

}
