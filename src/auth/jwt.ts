import jwt from "jsonwebtoken";


const ACCESS_SECRET =
process.env.JWT_SECRET ||
"change_this";


const REFRESH_SECRET =
process.env.JWT_REFRESH_SECRET ||
"change_this_refresh";


export function createAccessToken(payload:any){

return jwt.sign(
payload,
ACCESS_SECRET,
{
expiresIn:"15m"
});

}



export function createRefreshToken(payload:any){

return jwt.sign(
payload,
REFRESH_SECRET,
{
expiresIn:"30d"
});

}



export function verifyAccessToken(token:string){

return jwt.verify(
token,
ACCESS_SECRET
);

}
