import {
Request,
Response
}
from "express";


import {

register,
login,
refresh,
logout,
logoutAll

}
from "./auth.service.js";



export async function registerController(
req:Request,
res:Response
){

try{

const result=
await register(
req.body.email,
req.body.password,
req.body.gender
);


res.json(result);


}catch(error:any){

res.status(400)
.json({
error:error.message
});

}

}




export async function loginController(
req:Request,
res:Response
){

try{


const result=
await login(
req.body.email,
req.body.password
);


res.json(result);



}catch(error:any){

res.status(401)
.json({
error:error.message
});

}

}




export async function refreshController(
req:Request,
res:Response
){

try{


const result=
await refresh(
req.body.refreshToken
);


res.json(result);



}catch(error:any){

res.status(401)
.json({
error:error.message
});

}

}





export async function logoutController(
req:Request,
res:Response
){

try{


const result=
await logout(
req.body.refreshToken
);


res.json(result);



}catch(error:any){

res.status(400)
.json({
error:error.message
});

}

}





export async function logoutAllController(
req:Request,
res:Response
){

try{


if(!req.user){

return res.status(401).json({
error:"Unauthorized"
});

}


const result=
await logoutAll(
req.user.id
);


res.json(result);



}catch(error:any){

res.status(400)
.json({
error:error.message
});

}

}
