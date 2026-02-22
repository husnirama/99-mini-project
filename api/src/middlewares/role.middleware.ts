import type { Request, Response, NextFunction } from "express";

export default function requireRole(...allowedRoles: String[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user?.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
