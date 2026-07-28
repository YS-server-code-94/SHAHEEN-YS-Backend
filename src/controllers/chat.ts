import {
    Response
} from "express";

import {
    AIService
} from "../services/AIService.js";

import {
    AuthRequest
} from "../auth/auth.middleware.js";


export async function chat(
    req:AuthRequest,
    res:Response
){

    console.log("CHAT CONTROLLER HIT");

    console.log(
        "USER:",
        req.user
    );

    console.log(
        "BODY:",
        req.body
    );


    try{


        const {
            provider="mock",
            messages
        } = req.body;



        if(!messages || !Array.isArray(messages)){

            return res.status(400).json({

                error:"Messages array required"

            });

        }



        const ai =
        AIService.getProvider(provider);



        const answer =
        await ai.chat(messages);



        return res.json({

            success:true,

            user:req.user,

            provider,

            answer

        });



    }catch(error){


        console.error(
            "CHAT ERROR:",
            error
        );


        return res.status(500).json({

            error:"AI request failed",

            details:
            error instanceof Error
            ? error.message
            : "Unknown error"

        });


    }

}
