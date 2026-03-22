import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { genereateRefreshToken, hashToken } from "../utils/tokens.js";
import { generateUniqueReferralCode } from "../utils/referral.js";
import { AppError } from "../utils/app-error.js";
import { loginSchema, registerSchema } from "../validations/auth.validation.js";
import SendEmail from "../utils/email.js";
// register service
export async function createUser(data) {
    const { referralCode: usedReferralCode, ...rest } = data;
    const dataInput = registerSchema.parse(data);
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (existingUser) {
        throw new AppError("Email has been used", 400);
    }
    if (usedReferralCode) {
        const refOwner = await prisma.user.findUnique({
            where: {
                referralCode: usedReferralCode,
            },
        });
        if (!refOwner) {
            throw new AppError("Invalid Referral Code", 400);
        }
    }
    const hashedPassword = await bcrypt.hash(dataInput.password, 10);
    const newReferralCode = await generateUniqueReferralCode(dataInput.name);
    const user = await prisma.user.create({
        data: {
            ...dataInput,
            password: hashedPassword,
            referralCode: newReferralCode,
            referredBy: usedReferralCode ?? null,
        },
    });
    SendEmail({
        to: "husniramandalubis@gmail.com",
        subject: "Welcome to Our Platform",
        emailData: {
            name: user.name,
            referralCode: user.referralCode,
        },
        emailTemplate: "src/templates/emails/onboarding-email-template.hbs",
    });
    return user;
}
// login service
export async function loginUser(email, pwd) {
    const emailValidation = loginSchema.parse({ email });
    const user = await prisma.user.findFirst({
        where: {
            email: emailValidation.email,
            deletedAt: null,
        },
    });
    if (!user) {
        throw new AppError("Invalid Credentials", 400);
    }
    const isPasswordValid = await bcrypt.compare(pwd, user.password);
    if (!isPasswordValid) {
        throw new AppError("Invalid Credentials", 400);
    }
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new AppError("JWT_SECRET is not defined, check your env file", 400);
    const token = jwt.sign({
        userId: user.id,
        role: user.role,
    }, secret, { expiresIn: "1h" });
    const refreshToken = genereateRefreshToken();
    const refreshHash = hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await prisma.session.create({
        data: {
            userId: user.id,
            refreshHash,
            expiresAt,
        },
    });
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token,
        refreshToken,
    };
}
// auth me service
export async function authorizeMe(userId) {
    const user = await prisma.user.findFirst({
        where: {
            id: userId,
            deletedAt: null,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            address: true,
            referralCode: true,
            referredBy: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!user) {
        throw new AppError("User not found", 400);
    }
    return user;
}
export async function refreshToken(refreshToken) {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new AppError("JWT_SECRET is not defined, check your env file", 400);
    if (!refreshToken) {
        throw new AppError("Refresh Token required", 400);
    }
    const session = await prisma.session.findUnique({
        where: {
            refreshHash: hashToken(refreshToken),
        },
        include: { user: true },
    });
    if (!session)
        throw new Error("Invalid refresh token");
    if (session.revokedAt)
        throw new Error("Session revoked");
    if (session.expiresAt.getTime() < Date.now())
        throw new Error("Refresh Token Expired");
    if (session.user.deletedAt)
        throw new Error("User not found");
    const token = jwt.sign({
        userId: session.userId,
        role: session.user.role,
    }, secret, { expiresIn: "15m" });
    // Rotation means: if someone steals an old refresh token, it stops working after one use.
    const newRefreshToken = genereateRefreshToken();
    const newRefreshHash = hashToken(newRefreshToken);
    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await prisma.session.update({
        where: { id: session.id },
        data: {
            refreshHash: newRefreshHash,
            expiresAt: newExpiresAt,
        },
    });
    return {
        token,
        refreshToken: newRefreshToken,
    };
}
export async function userLogout(refreshToken) {
    if (!refreshToken) {
        throw new AppError("Refresh token required", 400);
    }
    await prisma.session.updateMany({
        where: {
            refreshHash: hashToken(refreshToken),
            revokedAt: null,
        },
        data: {
            revokedAt: new Date(),
        },
    });
    return true;
}
//# sourceMappingURL=auth.service.js.map