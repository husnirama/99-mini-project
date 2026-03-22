import crypto from "crypto";
export function genereateRefreshToken() {
    return crypto.randomBytes(64).toString("hex");
}
export function hashToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
}
//# sourceMappingURL=tokens.js.map