import {
Request,
Response,
NextFunction
}
from "express";


import jwt from "jsonwebtoken";


const SECRET =
process.env.JWT_ACCESS_SECRET ||
"development_access_secret";



export function authMiddleware(

req:Request,

res:Response,

next:NextFunction

){


try{


const header =
req.headers.authorization;



if(!header){

return res.status(401).json({

error:"Missing token"

});

}



const token =
header.replace(
"Bearer ",
""
);



const decoded =
jwt.verify(
token,
SECRET
);



req.user =
decoded as any;



next();



}catch(error){


return res.status(401).json({

error:"Invalid token"

});


}



}


export interface AuthRequest extends Request {

    user?: {

        id:string;

        role?:string;

        email?:string;

    };

}

