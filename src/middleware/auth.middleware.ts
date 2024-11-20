import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const jwtAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"];

    if (!header) {
      res.status(401).json({ message: "Authorization header is missing." });
      return;
    }

    const token = header.startsWith("Bearer ") ? header.slice(7) : header;

    const decoded = jwt.verify(token, JWT_PASSWORD) as JwtPayload;

    if (!decoded || typeof decoded !== "object" || !decoded.id) {
      res.status(403).json({ message: "Invalid token." });
    }

    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(403).json({ message: "Token verification failed." });
  }
};
