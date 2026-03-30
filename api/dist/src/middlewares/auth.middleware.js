import "dotenv/config";
import jwt from "jsonwebtoken";
export default function requireAuth(req, res, next) {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = header.substring("Bearer ".length);
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new Error("JWT_SECRET not Defined");
        const decoded = jwt.verify(token, secret);
        req.user = {
            ...decoded,
            id: Number(decoded.userId),
            userId: Number(decoded.userId),
            role: decoded.role,
        };
        next();
    }
    catch (err) {
        if (err?.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(401).json({ message: "Unauthorized" });
    }
}
//# sourceMappingURL=auth.middleware.js.map