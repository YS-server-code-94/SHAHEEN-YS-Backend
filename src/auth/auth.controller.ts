import {
Request,
Response
}
from "express";


import {
register,
login
}
from "./auth.service.js";



export async function registerController(
req:Request,
res:Response
){


try{


const {
email,
password
}=req.body;



const result =
await register(
email,
password
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


const {
email,
password
}=req.body;



const result =
await login(
email,
password
);



res.json(result);



}catch(error:any){


res.status(401)
.json({

error:error.message

});


}


}
