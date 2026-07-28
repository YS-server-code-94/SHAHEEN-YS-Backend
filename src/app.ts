import express from "express";

import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import { globalRateLimiter } from "./middleware/rateLimit.js";
import { securityMiddleware } from "./security/security.js";
import { languageMiddleware } from "./middleware/language.js";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./auth/auth.routes.js";
import chatRoutes from "./chat/chat.routes.js";

import { registerSwagger } from "./swagger/index.js";
import { openApiSpec } from "./swagger/openapi.js";

const app = express();

/* ---------- Core Security ---------- */

securityMiddleware.forEach(
middleware=>app.use(middleware)
);

app.use(globalRateLimiter);

app.use(languageMiddleware);

app.use(helmet());

app.use(compression());

app.use(hpp());

app.use(morgan("combined"));

app.use(cors({
origin:"*",
credentials:true
}));

app.use(express.json({
limit:"10mb"
}));

app.use(rateLimit({
windowMs:60000,
max:100,
standardHeaders:true,
legacyHeaders:false
}));

/* ---------- Swagger ---------- */

registerSwagger(app);

app.get(
"/openapi.json",
(_req,res)=>{
res.json(openApiSpec);
}
);

/* ---------- Health ---------- */

app.get("/health",(_req,res)=>{
res.status(200).json({
status:"ok",
service:"SHAHEEN-YS Backend",
timestamp:new Date().toISOString()
});
});

app.get("/ready",(_req,res)=>{
res.status(200).json({
ready:true
});
});

app.get("/live",(_req,res)=>{
res.status(200).json({
alive:true
});
});

/* ---------- API ---------- */

app.use("/api/v1/auth",authRoutes);

app.use("/api/v1/chat",chatRoutes);

/* ---------- Error ---------- */

app.use(errorHandler);

export default app;
