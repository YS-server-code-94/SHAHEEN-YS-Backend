import express from "express";

import chatRoutes from "./routes/chat.js";

import authRoutes from "./auth/auth.routes.js";


const app = express();



app.use(
express.json()
);



app.get(
"/",
(req,res)=>{
    res.json({
        name:"SHAHEEN-YS Backend",
        status:"running"
    });
}
);



app.use(
"/api/auth",
authRoutes
);



app.use(
"/api",
chatRoutes
);



export default app;


app.use("/auth", authRoutes);
