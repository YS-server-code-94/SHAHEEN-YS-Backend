import express from "express";
import {globalRateLimiter} from "./middleware/rateLimit.js";
import {securityMiddleware} from "./security/security.js";
import { languageMiddleware } from "./middleware/language.js";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./auth/auth.routes.js";
import chatRoutes from "./chat/chat.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";


const app = express();



securityMiddleware.forEach(
middleware=>app.use(middleware)
);

app.use(globalRateLimiter);


app.use(languageMiddleware);


// Security
app.use(
  helmet()
);


// CORS
app.use(
  cors({
    origin: "*",
    credentials: true
  })
);


// Body parser
app.use(
  express.json({
    limit: "10mb"
  })
);


// Global Rate Limit
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
  })
);


// Health
app.get(
  "/health",
  (_req: express.Request, res: express.Response) => {
    res.json({
      status: "ok",
      service: "SHAHEEN-YS Backend"
    });
  }
);


// API Routes
app.use(
  "/api/v1/auth",
  authRoutes
);


app.use(
  "/api/v1/chat",
  chatRoutes
);


// Error Handler
app.use(
  errorHandler
);


export default app;
