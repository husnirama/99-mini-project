import crypto from "crypto";
import { prisma } from "../lib/prisma.js";
function extractNamePrefix(fullname) {
    const firstPart = fullname.split(/[ .]/)[0];
    return firstPart.toUpperCase();
}
function generateRandomSuffix() {
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const numbers = Math.floor(10000 + Math.random() * 90000);
    return `${letter}${numbers}`;
}
export async function generateUniqueReferralCode(fullname) {
    const prefix = extractNamePrefix(fullname);
    const projectCode = "EVM";
    while (true) {
        const suffix = generateRandomSuffix();
        const code = `${prefix}-${projectCode}-${suffix}`;
        const exist = await prisma.user.findUnique({
            where: { referralCode: code },
        });
        if (!exist) {
            return code;
        }
    }
}
//# sourceMappingURL=referral.js.map