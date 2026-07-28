import {Request,Response,NextFunction} from "express";

import parser from "accept-language-parser";

import i18next from "../i18n/index.js";



declare global {

    namespace Express {

        interface Request {

            language?:string;

            t?:Function;

        }

    }

}



export function languageMiddleware(
req:Request,
res:Response,
next:NextFunction
){


const header =
req.headers["accept-language"];



let language="en";



if(header){

const parsed =
parser.parse(header);


if(
parsed.length &&
["ar","en"]
.includes(parsed[0].code)
){

language =
parsed[0].code;

}

}



req.language =
language;



req.t =
(key:string)=>
i18next.t(
key,
{
lng:language
}
);



next();


}
