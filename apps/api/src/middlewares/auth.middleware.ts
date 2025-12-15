// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  rol: string;
}

export interface AuthRequest extends Request {
  userId?: string;
  rol?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret_key"
    ) as JwtPayload;

    req.userId = decoded.id;
    req.rol = decoded.rol;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
};
