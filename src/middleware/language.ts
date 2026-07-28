
import {Request,Response,NextFunction} from "express";


export function languageMiddleware(
req:Request,
res:Response,
next:NextFunction
){


const lang =
req.headers["accept-language"];


if(lang?.includes("ar")){

(req as any).language="AR";

}else{

(req as any).language="EN";

}


next();


}

