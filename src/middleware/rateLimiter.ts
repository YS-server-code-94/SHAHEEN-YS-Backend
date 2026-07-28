import rateLimit from "express-rate-limit";


export const userRateLimiter =
rateLimit({

windowMs:60*1000,

limit:30,

message:{

error:"Too many requests"

}

});
