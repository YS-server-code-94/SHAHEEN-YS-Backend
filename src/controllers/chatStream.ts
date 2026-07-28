import { Request, Response } from "express";

import {
    AIService
} from "../services/AIService.js";


export async function chatStream(
    req: Request,
    res: Response
) {

    const {
        provider = "openai",
        messages
    } = req.body;


    if (!messages || !Array.isArray(messages)) {

        res.status(400).json({
            success:false,
            error:"Messages are required"
        });

        return;
    }


    const ai =
        AIService.getProvider(provider);



    res.setHeader(
        "Content-Type",
        "text/event-stream"
    );

    res.setHeader(
        "Cache-Control",
        "no-cache"
    );

    res.setHeader(
        "Connection",
        "keep-alive"
    );


    try {


        await ai.stream(
            messages,

            (token:string)=>{

                res.write(
                    `data: ${JSON.stringify({
                        token
                    })}\n\n`
                );

            }
        );


        res.write(
            "data: [DONE]\n\n"
        );


        res.end();


    } catch(error){


        console.error(
            "STREAM ERROR:",
            error
        );


        res.write(
            `data: ${JSON.stringify({
                error:
                error instanceof Error
                ? error.message
                : "Unknown error"
            })}\n\n`
        );


        res.end();

    }

}
