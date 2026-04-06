import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
function getAuthorizedUserId(req) {
    return Number(req.user?.userId ?? req.user?.id);
}
function normalizeAddress(address) {
    const trimmedAddress = address?.trim();
    return trimmedAddress ? trimmedAddress : null;
}
async function getCustomerProfileData(userId) {
    const customer = await prisma.user.findFirst({
        where: {
            id: userId,
            role: "CUSTOMER",
            deletedAt: null,
        },
        select: {
            id: true,
            name: true,
            email: true,
            address: true,
            role: true,
            referralCode: true,
            referredBy: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!customer) {
        return null;
    }
    const [totalOrders, completedOrders, referrer, activePoints, nextPointsExpiry, successfulReferrals, activeCoupons,] = await Promise.all([
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
            : null,
        prisma.$queryRaw `
        SELECT COALESCE(SUM("points" - "discount"), 0) AS "totalPoints"
        FROM public."Points"
        WHERE "userId" = ${userId}
          AND "deletedAt" IS NULL
          AND "expiresAt" > NOW()
      `,
        prisma.$queryRaw `
        SELECT "expiresAt"
        FROM public."Points"
        WHERE "userId" = ${userId}
          AND "deletedAt" IS NULL
          AND "expiresAt" > NOW()
        ORDER BY "expiresAt" ASC
        LIMIT 1
      `,
        prisma.user.count({
            where: {
                referredBy: customer.referralCode,
                deletedAt: null,
            },
        }),
        prisma.$queryRaw `
        SELECT COUNT(*)::int AS "count"
        FROM public."UserPromotion"
        WHERE "userId" = ${userId}
          AND status = 'ACTIVE'
          AND "usedAt" IS NULL
          AND "expiresAt" > NOW()
      `,
    ]);
    return {
        ...customer,
        stats: {
            totalOrders,
            completedOrders,
            availablePoints: Number(activePoints[0]?.totalPoints ?? 0),
            nextPointsExpiry: nextPointsExpiry[0]?.expiresAt
                ? new Date(nextPointsExpiry[0].expiresAt).toISOString()
                : null,
            successfulReferrals,
            activeCoupons: Number(activeCoupons[0]?.count ?? 0),
        },
        referrer: referrer
            ? {
                name: referrer.name,
                referralCode: referrer.referralCode,
            }
            : null,
    };
}
export async function getCustomerById(req, res, next) {
    try {
        const userId = getAuthorizedUserId(req);
        const profile = await getCustomerProfileData(userId);
        if (!profile) {
            return res.status(404).json({ message: "Customer profile not found" });
        }
        return res.status(200).json({
            message: "Customer profile fetched successfully",
            data: profile,
        });
    }
    catch (error) {
        next(error);
    }
}
export async function updateCustomerProfile(req, res, next) {
    try {
        const userId = getAuthorizedUserId(req);
        const { name, email, address } = req.body;
        if (!name?.trim() || !email?.trim()) {
            return res.status(400).json({ message: "Name and email are required" });
        }
        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await prisma.user.findFirst({
            where: {
                email: normalizedEmail,
                deletedAt: null,
                NOT: { id: userId },
            },
            select: { id: true },
        });
        if (existingUser) {
            return res.status(400).json({ message: "Email has been used" });
        }
        await prisma.user.update({
            where: { id: userId },
            data: {
                name: name.trim(),
                email: normalizedEmail,
                address: normalizeAddress(address),
            },
        });
        const profile = await getCustomerProfileData(userId);
        return res.status(200).json({
            message: "Customer profile updated successfully",
            data: profile,
        });
    }
    catch (error) {
        next(error);
    }
}
export async function updateCustomerPassword(req, res, next) {
    try {
        const userId = getAuthorizedUserId(req);
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({ message: "All password fields are required" });
        }
        if (newPassword !== confirmNewPassword) {
            return res
                .status(400)
                .json({ message: "Password confirmation does not match" });
        }
        const customer = await prisma.user.findFirst({
            where: {
                id: userId,
                role: "CUSTOMER",
                deletedAt: null,
            },
            select: {
                password: true,
            },
        });
        if (!customer) {
            return res.status(404).json({ message: "Customer profile not found" });
        }
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, customer.password);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedPassword,
            },
        });
        return res.status(200).json({
            message: "Customer password updated successfully",
        });
    }
    catch (error) {
        next(error);
    }
}
export async function getCustomerCoupons(req, res, next) {
    try {
        const userId = getAuthorizedUserId(req);
        const customer = await prisma.user.findFirst({
            where: {
                id: userId,
                role: "CUSTOMER",
                deletedAt: null,
            },
            select: {
                referralCode: true,
                referredBy: true,
            },
        });
        if (!customer) {
            return res.status(404).json({ message: "Customer profile not found" });
        }
        const promotions = await prisma.$queryRaw `
      SELECT
        up.id,
        up.status,
        up."createdAt",
        up."expiresAt",
        up."usedAt",
        p.name,
        p.code,
        p."discountType",
        p."discountValue",
        p."maxDiscount",
        p."minPurchase",
        e.title AS "eventTitle"
      FROM public."UserPromotion" up
      INNER JOIN public."Promotion" p
        ON p.id = up."promotionId"
      INNER JOIN public."Event" e
        ON e.id = p."eventId"
      WHERE up."userId" = ${userId}
        AND up.status = 'ACTIVE'
        AND up."usedAt" IS NULL
        AND up."expiresAt" > NOW()
        AND p."deletedAt" IS NULL
      ORDER BY up."expiresAt" ASC, up."createdAt" DESC
    `;
        return res.status(200).json({
            message: "Customer coupons fetched successfully",
            data: {
                summary: {
                    referralCode: customer.referralCode,
                    referredBy: customer.referredBy,
                    activeCouponCount: promotions.length,
                },
                coupons: promotions.map((promotion) => ({
                    id: promotion.id,
                    name: promotion.name,
                    eventTitle: promotion.eventTitle,
                    code: promotion.code,
                    description: `${promotion.name} for ${promotion.eventTitle}`,
                    discountType: promotion.discountType,
                    discountAmount: Number(promotion.discountValue),
                    maxDiscount: promotion.maxDiscount
                        ? Number(promotion.maxDiscount)
                        : null,
                    minPurchase: promotion.minPurchase
                        ? Number(promotion.minPurchase)
                        : null,
                    createdAt: new Date(promotion.createdAt).toISOString(),
                    expiresAt: new Date(promotion.expiresAt).toISOString(),
                    usedAt: promotion.usedAt
                        ? new Date(promotion.usedAt).toISOString()
                        : null,
                    status: promotion.status === "USED" || promotion.status === "EXPIRED"
                        ? promotion.status
                        : "ACTIVE",
                })),
            },
        });
    }
    catch (error) {
        next(error);
    }
}
export async function getOrganizerById(req, res) {
    return res.status(200).json({ message: "Organizer Profile" });
}
//# sourceMappingURL=user.controller.js.map