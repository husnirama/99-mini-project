import crypto from "crypto";

export function generateGuestToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashGuestToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
