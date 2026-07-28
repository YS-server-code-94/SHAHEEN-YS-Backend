import helmet from "helmet";
import cors from "cors";


export const securityMiddleware = [

helmet(),


cors({

origin:true,

credentials:true

})


];
