import {
Request,
Response
}
from "express";


import {
processChat
}
from "./chat.service.js";



export async function chatController(

req:Request,

res:Response

){


try{


const userId =
req.user?.id;



if(!userId){


return res.status(401).json({

error:"Unauthorized"

});


}



const result =
await processChat({

userId,


message:req.body.message,


conversationId:
req.body.conversationId,


provider:
req.body.provider,


model:
req.body.model,


language:
req.headers["accept-language"] === "ar"
?
"AR"
:
"EN"


});



return res.json(result);



}catch(error:any){



return res.status(500).json({

error:error.message

});


}


}
