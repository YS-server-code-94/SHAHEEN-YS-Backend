import { logger } from "../config/logger.js";


export function logInfo(
message:string,
data?:unknown
){

logger.info(
data,
message
);

}



export function logError(
error:unknown,
context?:unknown
){

logger.error(
{
error,
context
},
typeof error === "string"
? error
: "Unexpected error"
);

}



export function logWarning(
message:string,
data?:unknown
){

logger.warn(
data,
message
);

}
