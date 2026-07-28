import rateLimit from "express-rate-limit";


export const globalRateLimiter = rateLimit({

    windowMs:15 * 60 * 1000,

    max:300,

    standardHeaders:true,

    legacyHeaders:false,


    message:{
        error:"Too many requests"
    }

});



export const chatRateLimiter = rateLimit({

    windowMs:60 * 1000,

    max:30,

    standardHeaders:true,

    legacyHeaders:false,


    keyGenerator:(req)=>{

        return (
            req.user?.id ||
            req.ip ||
            "unknown"
        );

    },


    message:{
        error:"Chat rate limit exceeded"
    }

});
