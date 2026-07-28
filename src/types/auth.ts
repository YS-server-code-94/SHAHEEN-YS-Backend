import { Request } from "express";

export interface AuthUser {
  id: string;
  role: "USER" | "ADMIN";
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}
