import { AppError } from "../utils/app-error.js";
import { ZodError, z } from "zod";
export function error(error, req, res, next) {
    console.error(error);
    if (error instanceof AppError) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
    if (error instanceof ZodError) {
        return res.status(400).json({
            message: "Validation Failed",
            error: z.flattenError(error),
        });
    }
    res.status(500).json({ message: "Unexpected Error", error });
    next();
}
//# sourceMappingURL=error.middleware.js.map