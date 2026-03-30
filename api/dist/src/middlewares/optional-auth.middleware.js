import "dotenv/config";
import jwt from "jsonwebtoken";
export default function optionalAuth(req, _res, next) {
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
        const decoded = jwt.verify(token, secret);
        req.user = {
            ...decoded,
            id: Number(decoded.userId),
            userId: Number(decoded.userId),
            role: decoded.role,
        };
    }
    catch {
        delete req.user;
    }
    next();
}
//# sourceMappingURL=optional-auth.middleware.js.map