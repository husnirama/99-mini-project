import type { JwtPayload } from "jsonwebtoken";
import { Role } from "../generated/prisma/enums.js";

export interface CustomJwtPayload extends JwtPayload {
  email: string;
  name: string;
  role: Role;
  id: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload;
    }
  }
}
