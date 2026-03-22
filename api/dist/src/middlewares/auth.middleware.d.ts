import type { Request, Response, NextFunction } from "express";
import "dotenv/config";
export default function requireAuth(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.middleware.d.ts.map