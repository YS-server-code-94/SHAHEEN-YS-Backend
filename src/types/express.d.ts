import { AuthUser } from "../auth/auth.middleware.js";

declare global {
 namespace Express {

  interface Request {
    user?: AuthUser;
  }

 }
}

export {};
