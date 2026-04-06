import fs from "node:fs/promises";
import bcrypt from "bcrypt";
import { cacheTags, invalidateCacheTags } from "../../lib/cache.js";
import cloudinary from "../../lib/cloudinary.js";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/app-error.js";
import {
  organizerPasswordUpdateSchema,
  organizerProfileUpdateSchema,
  type OrganizerPasswordUpdateInput,
  type OrganizerProfileUpdateInput,
} from "../../validations/organizer.validation.js";

const organizerProfileSelect = {
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

async function ensureOrganizerExists(userId: number) {
  const organizer = await prisma.user.findFirst({
    where: {
      id: userId,
      role: "EVENT_ORGANIZER",
      deletedAt: null,
    },
    select: {
      ...organizerProfileSelect,
      password: true,
    },
  });

  if (!organizer) {
    throw new AppError("Organizer profile not found", 404);
  }

  return organizer;
}

async function buildOrganizerProfile(userId: number) {
  const organizer = await prisma.user.findFirst({
    where: {
      id: userId,
      role: "EVENT_ORGANIZER",
      deletedAt: null,
    },
    select: organizerProfileSelect,
  });

  if (!organizer) {
    throw new AppError("Organizer profile not found", 404);
  }

  const [totalEvents, totalTransactions, totalAttendees] = await Promise.all([
    prisma.event.count({
      where: {
        organizeBy: userId,
        deletedAt: null,
      },
    }),
    prisma.transaction.count({
      where: {
        order: {
          event: {
            organizeBy: userId,
            deletedAt: null,
          },
        },
      },
    }),
    prisma.order.count({
      where: {
        status: "COMPLETED",
        event: {
          organizeBy: userId,
          deletedAt: null,
        },
      },
    }),
  ]);

  return {
    ...organizer,
    stats: {
      totalEvents,
      totalTransactions,
      totalAttendees,
    },
  };
}

function normalizeAddress(address?: string) {
  const trimmedAddress = address?.trim();
  return trimmedAddress ? trimmedAddress : null;
}

export async function getOrganizerProfile(userId: number) {
  return buildOrganizerProfile(userId);
}

export async function updateOrganizerProfile(
  userId: number,
  payload: OrganizerProfileUpdateInput,
) {
  const parsedPayload = organizerProfileUpdateSchema.parse(payload);
  const organizer = await ensureOrganizerExists(userId);
  const normalizedEmail = parsedPayload.email.trim().toLowerCase();

  if (normalizedEmail !== organizer.email.toLowerCase()) {
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
    cacheTags.organizerProfile(userId),
    cacheTags.organizerScope(userId),
  ]);

  return buildOrganizerProfile(userId);
}

export async function updateOrganizerPassword(
  userId: number,
  payload: OrganizerPasswordUpdateInput,
) {
  const parsedPayload = organizerPasswordUpdateSchema.parse(payload);
  const organizer = await ensureOrganizerExists(userId);
  const isCurrentPasswordValid = await bcrypt.compare(
    parsedPayload.currentPassword,
    organizer.password,
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
    cacheTags.organizerProfile(userId),
    cacheTags.organizerScope(userId),
  ]);

  return true;
}

export async function updateOrganizerProfilePicture(
  userId: number,
  file?: Express.Multer.File,
) {
  await ensureOrganizerExists(userId);

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
      cacheTags.organizerProfile(userId),
      cacheTags.organizerScope(userId),
    ]);

    return buildOrganizerProfile(userId);
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
