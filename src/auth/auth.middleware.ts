import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type UserRole = "USER" | "ADMIN";

export interface AuthUser {
  id: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}


export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Missing authorization token"
      });
    }


    const token = header.split(" ")[1];


    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      id: string;
      role?: string;
    };


    const role: UserRole =
      decoded.role === "ADMIN"
        ? "ADMIN"
        : "USER";


    (req as AuthRequest).user = {
      id: decoded.id,
      role
    };


    next();


  } catch(error){

    return res.status(401).json({
      error:"Invalid token"
    });

  }
}
