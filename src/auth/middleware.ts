import {
Request,
Response,
NextFunction
}
from "express";


import {
verifyAccessToken
}
from "./jwt.js";



export function authMiddleware(
req:Request,
res:Response,
next:NextFunction
){


try{


const header =
req.headers.authorization;


if(!header){

return res.status(401)
.json({
error:"Missing token"
});

}



const token =
header.replace(
"Bearer ",
""
);



const user =
verifyAccessToken(token);



(req as any).user=user;



next();



}catch{


res.status(401)
.json({

error:"Invalid token"

});


}


}
