import type { NextFunction, Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import type { CustomJwtPayload } from "../types/express.js";

type JwtTokenPayload = { userId: number; role: string };

export default function optionalAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      next();
      return;
    }

    const token = header.substring("Bearer ".length);
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      next();
      return;
    }

    const decoded = jwt.verify(token, secret) as JwtTokenPayload;

    req.user = {
      ...decoded,
      id: Number(decoded.userId),
      userId: Number(decoded.userId),
      role: decoded.role as CustomJwtPayload["role"],
    };
  } catch {
    delete req.user;
  }

  next();
}
