import type { Request, Response, NextFunction } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import type { CustomJwtPayload } from "../types/express.js";

type JwtTokenPayload = { userId: number; role: string };

export default function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = header.substring("Bearer ".length);

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not Defined");

    const decoded = jwt.verify(token, secret) as JwtTokenPayload;

    req.user = {
      ...decoded,
      id: Number(decoded.userId),
      userId: Number(decoded.userId),
      role: decoded.role as CustomJwtPayload["role"],
    };

    next();
  } catch (err: any) {
    if (err?.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Unauthorized" });
  }
}
