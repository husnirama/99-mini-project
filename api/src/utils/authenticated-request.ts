import type { Request } from "express";
import type { CustomJwtPayload } from "../types/express.js";

export interface AuthenticatedRequest extends Request {
  user: CustomJwtPayload;
}
