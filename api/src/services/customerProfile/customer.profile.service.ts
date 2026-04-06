import fs from "node:fs/promises";
import bcrypt from "bcrypt";
import { cacheTags, invalidateCacheTags } from "../../lib/cache.js";
import cloudinary from "../../lib/cloudinary.js";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/app-error.js";
import {
  customerPasswordUpdateSchema,
  customerProfileUpdateSchema,
  type CustomerPasswordUpdateInput,
  type CustomerProfileUpdateInput,
} from "../../validations/customer.validation.js";

const customerProfileSelect = {
  id: true,
  name: true,
  email: true,
  address: true,
  profilePicture: true,
  role: true,
  referralCode: true,
  referredBy: true,
  createdAt: true,
  updatedAt: true,
} as const;

async function ensureCustomerExists(userId: number) {
  const customer = await prisma.user.findFirst({
    where: {
      id: userId,
      role: "CUSTOMER",
      deletedAt: null,
    },
    select: {
      ...customerProfileSelect,
      password: true,
    },
  });

  if (!customer) {
    throw new AppError("Customer profile not found", 404);
  }

  return customer;
}

async function buildCustomerProfile(userId: number) {
  const customer = await prisma.user.findFirst({
    where: {
      id: userId,
      role: "CUSTOMER",
      deletedAt: null,
    },
    select: customerProfileSelect,
  });

  if (!customer) {
    throw new AppError("Customer profile not found", 404);
  }

  const [totalOrders, completedOrders, pointsBalance, activeCoupons, referrer] =
    await Promise.all([
      prisma.order.count({
        where: {
          customerId: userId,
        },
      }),
      prisma.order.count({
        where: {
          customerId: userId,
          status: "COMPLETED",
        },
      }),
      prisma.points.aggregate({
        where: {
          userId,
          deletedAt: null,
        },
        _sum: {
          points: true,
        },
      }),
      prisma.userPromotion.count({
        where: {
          userId,
          status: "ACTIVE",
          usedAt: null,
          expiresAt: {
            gt: new Date(),
          },
        },
      }),
      customer.referredBy
        ? prisma.user.findFirst({
            where: {
              referralCode: customer.referredBy,
              deletedAt: null,
            },
            select: {
              name: true,
              referralCode: true,
            },
          })
        : Promise.resolve(null),
    ]);

  return {
    ...customer,
    stats: {
      totalOrders,
      completedOrders,
      availablePoints: pointsBalance._sum.points ?? 0,
      activeCoupons,
    },
    referrer,
  };
}

function normalizeAddress(address?: string) {
  const trimmedAddress = address?.trim();
  return trimmedAddress ? trimmedAddress : null;
}

export async function getCustomerProfile(userId: number) {
  return buildCustomerProfile(userId);
}

export async function updateCustomerProfile(
  userId: number,
  payload: CustomerProfileUpdateInput,
) {
  const parsedPayload = customerProfileUpdateSchema.parse(payload);
  const customer = await ensureCustomerExists(userId);
  const normalizedEmail = parsedPayload.email.trim().toLowerCase();

  if (normalizedEmail !== customer.email.toLowerCase()) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: normalizedEmail,
        deletedAt: null,
        NOT: {
          id: userId,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      throw new AppError("Email has been used", 400);
    }
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: parsedPayload.name.trim(),
      email: normalizedEmail,
      address: normalizeAddress(parsedPayload.address),
    },
  });

  await invalidateCacheTags([
    cacheTags.authMe(userId),
    cacheTags.customerProfile(userId),
    cacheTags.customerScope(userId),
  ]);

  return buildCustomerProfile(userId);
}

export async function updateCustomerPassword(
  userId: number,
  payload: CustomerPasswordUpdateInput,
) {
  const parsedPayload = customerPasswordUpdateSchema.parse(payload);
  const customer = await ensureCustomerExists(userId);
  const isCurrentPasswordValid = await bcrypt.compare(
    parsedPayload.currentPassword,
    customer.password,
  );

  if (!isCurrentPasswordValid) {
    throw new AppError("Current password is incorrect", 400);
  }

  const hashedPassword = await bcrypt.hash(parsedPayload.newPassword, 10);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  await invalidateCacheTags([
    cacheTags.authMe(userId),
    cacheTags.customerProfile(userId),
    cacheTags.customerScope(userId),
  ]);

  return true;
}

export async function updateCustomerProfilePicture(
  userId: number,
  file?: Express.Multer.File,
) {
  await ensureCustomerExists(userId);

  if (!file) {
    throw new AppError("Profile image is required", 400);
  }

  let uploadedPublicId: string | null = null;

  try {
    const uploadResult = await cloudinary.uploader.upload(file.path);
    uploadedPublicId = uploadResult.public_id;

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profilePicture: uploadResult.secure_url,
      },
    });

    await invalidateCacheTags([
      cacheTags.authMe(userId),
      cacheTags.customerProfile(userId),
      cacheTags.customerScope(userId),
    ]);

    return buildCustomerProfile(userId);
  } catch (error) {
    if (uploadedPublicId) {
      await cloudinary.uploader.destroy(uploadedPublicId).catch(() => null);
    }

    throw error;
  } finally {
    try {
      await fs.unlink(file.path);
    } catch {
      return null;
    }
  }
}
