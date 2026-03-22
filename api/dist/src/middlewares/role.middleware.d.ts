import type { Request, Response, NextFunction } from "express";
export default function requireRole(...allowedRoles: String[]): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=role.middleware.d.ts.map