

import rateLimit from "express-rate-limit";


export const userRateLimit =
rateLimit({

windowMs:
60*1000,


limit:50,


standardHeaders:true,


legacyHeaders:false,


keyGenerator(req){

return (
req.user?.id ??
req.ip ??
"unknown"
);

}

});


