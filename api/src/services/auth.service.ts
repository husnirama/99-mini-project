import type { UserCreateInput } from "../generated/prisma/models.js";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { genereateRefreshToken, hashToken } from "../utils/tokens.js";
import { ref } from "process";
import { error } from "console";
import { generateUniqueReferralCode } from "../utils/referral.js";

// register service
export async function createUser(data: UserCreateInput) {
  const { referralCode: usedReferralCode, ...rest } = data;

  if (usedReferralCode) {
    const refOwner = await prisma.user.findUnique({
      where: {
        referralCode: usedReferralCode,
      },
    });
    if (!refOwner) {
      throw new Error("Invalid Referral Code");
    }
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newReferralCode = await generateUniqueReferralCode(data.name);
  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      referralCode: newReferralCode,
      referredBy: usedReferralCode ?? null,
    },
  });
  return user;
}

// login service
export async function loginUser(email: string, pwd: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
      deletedAt: null,
    },
  });
  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isPasswordValid = await bcrypt.compare(pwd, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid Credentials");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret)
    throw new Error("JWT_SECRET is not defined, check your env file");

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    secret,
    { expiresIn: "15m" },
  );

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
export async function authorizeMe(userId: number) {
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
    throw new Error("User not found");
  }
  return user;
}

export async function refreshToken(refreshToken: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret)
    throw new Error("JWT_SECRET is not defined, check your env file");

  const session = await prisma.session.findUnique({
    where: {
      refreshHash: hashToken(refreshToken),
    },
    include: { user: true },
  });

  if (!session) throw new Error("Invalid refresh token");
  if (session.revokedAt) throw new Error("Session revoked");
  if (session.expiresAt.getTime() < Date.now())
    throw new Error("Refresh Token Expired");
  if (session.user.deletedAt) throw new Error("User not found");

  const token = jwt.sign(
    {
      userId: session.userId,
      role: session.user.role,
    },
    secret,
    { expiresIn: "15m" },
  );

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

export async function userLogout(refreshToken: string) {
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
