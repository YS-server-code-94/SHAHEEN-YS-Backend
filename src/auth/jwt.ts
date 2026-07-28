import jwt from "jsonwebtoken";


const ACCESS_SECRET =
process.env.JWT_ACCESS_SECRET ||
"development_access_secret";


const REFRESH_SECRET =
process.env.JWT_REFRESH_SECRET ||
"development_refresh_secret";



export function createAccessToken(payload:object){

return jwt.sign(
payload,
ACCESS_SECRET,
{
expiresIn:"15m"
}
);

}



export function createRefreshToken(payload:object){

return jwt.sign(
payload,
REFRESH_SECRET,
{
expiresIn:"30d"
}
);

}



export function verifyAccessToken(token:string){

return jwt.verify(
token,
ACCESS_SECRET
);

}



export function verifyRefreshToken(token:string){

return jwt.verify(
token,
REFRESH_SECRET
);

}
