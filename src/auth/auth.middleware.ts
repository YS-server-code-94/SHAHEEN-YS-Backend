import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export interface AuthRequest extends Request {

    user?: {
        id:string;
        email:string;
    };

}



export function authMiddleware(
    req:AuthRequest,
    res:Response,
    next:NextFunction
){

    try{


        const header =
        req.headers.authorization;


        if(!header){

            return res.status(401).json({
                error:"Missing authorization header"
            });

        }



        const token =
        header.replace("Bearer ","");



        const decoded =
        jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as {
            id:string;
            email:string;
        };



        req.user = decoded;



        next();



    }catch(error){


        return res.status(401).json({
            error:"Invalid token"
        });


    }

}
