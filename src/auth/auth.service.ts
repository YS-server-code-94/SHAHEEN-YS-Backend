import bcrypt from "bcryptjs";

import {
prisma
}
from "../database/prisma.js";


import {
createAccessToken,
createRefreshToken,
verifyRefreshToken
}
from "./jwt.js";




async function saveRefreshToken(
userId:string
){

const token=createRefreshToken({
id:userId
});


await prisma.refreshToken.create({

data:{
token,
userId,
expiresAt:new Date(
Date.now()+30*24*60*60*1000
)
}

});


return token;

}




export async function register(
email:string,
password:string,
gender:any
){

const exists=
await prisma.user.findUnique({
where:{
email
}
});


if(exists){

throw new Error(
"User already exists"
);

}



const hash=
await bcrypt.hash(
password,
12
);



const user=
await prisma.user.create({

data:{
email,
password:hash,
gender
}

});



const refreshToken=
await saveRefreshToken(
user.id
);



return {

accessToken:createAccessToken({

id:user.id,
email:user.email

}),


refreshToken

};

}





export async function login(
email:string,
password:string
){

const user=
await prisma.user.findUnique({

where:{
email
}

});


if(!user){

throw new Error(
"Invalid credentials"
);

}



const valid=
await bcrypt.compare(
password,
user.password
);



if(!valid){

throw new Error(
"Invalid credentials"
);

}



const refreshToken=
await saveRefreshToken(
user.id
);



return {

accessToken:createAccessToken({

id:user.id,
email:user.email

}),


refreshToken

};

}





export async function refresh(
token:string
){


const stored=
await prisma.refreshToken.findUnique({

where:{
token
}

});


if(
!stored ||
stored.revoked
){

throw new Error(
"Invalid refresh token"
);

}



verifyRefreshToken(token);



await prisma.refreshToken.update({

where:{
id:stored.id
},

data:{
revoked:true
}

});



const newToken=
await saveRefreshToken(
stored.userId
);



const user=
await prisma.user.findUnique({

where:{
id:stored.userId
}

});



return {

accessToken:createAccessToken({

id:user!.id,
email:user!.email

}),


refreshToken:newToken

};


}





export async function logout(
token:string
){

await prisma.refreshToken.updateMany({

where:{
token
},

data:{
revoked:true
}

});


return {
message:
"Logged out successfully"
};

}




export async function logoutAll(
userId:string
){

await prisma.refreshToken.updateMany({

where:{
userId
},

data:{
revoked:true
}

});


return {

message:
"All sessions closed"

};

}
