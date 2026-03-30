import crypto from "crypto";
export function generateGuestToken() {
    return crypto.randomBytes(32).toString("hex");
}
export function hashGuestToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
}
//# sourceMappingURL=guest-token.js.map