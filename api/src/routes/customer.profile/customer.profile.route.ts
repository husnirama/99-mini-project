import express from "express";
import {
  handleGetCustomerProfile,
  handleUpdateCustomerPassword,
  handleUpdateCustomerProfile,
  handleUpdateCustomerProfilePicture,
} from "../../controllers/customer.profile.controller.js";
import { customerPointsController } from "../../controllers/customer.dashboard/customer.points.controller.js";
import {
  createCustomerReviewController,
  customerReviewsController,
} from "../../controllers/customer.dashboard/customer.reviews.controller.js";
import { customerTicketsController } from "../../controllers/customer.dashboard/customer.tickets.controller.js";
import requireRole from "../../middlewares/role.middleware.js";
import requireAuth from "../../middlewares/auth.middleware.js";
import { cacheTags, createGetCacheMiddleware } from "../../lib/cache.js";
import { upload } from "../../middlewares/upload.middleware.js";

const router = express.Router();
router.get(
  "/profile",
  requireAuth,
  requireRole("CUSTOMER"),
  createGetCacheMiddleware({
    namespace: "customer:profile",
    ttlSeconds: 60,
    tags: (req) => [
      cacheTags.customerProfile(req.user!.userId),
      cacheTags.customerScope(req.user!.userId),
    ],
  }),
  handleGetCustomerProfile,
);
router.patch("/profile", requireAuth, requireRole("CUSTOMER"), handleUpdateCustomerProfile);
router.patch(
  "/profile/image",
  requireAuth,
  requireRole("CUSTOMER"),
  upload.single("image"),
  handleUpdateCustomerProfilePicture,
);
router.patch(
  "/profile/password",
  requireAuth,
  requireRole("CUSTOMER"),
  handleUpdateCustomerPassword,
);
router.get(
  "/points",
  requireAuth,
  requireRole("CUSTOMER"),
  createGetCacheMiddleware({
    namespace: "customer:points",
    ttlSeconds: 60,
    tags: (req) => [
      cacheTags.customerPoints(req.user!.userId),
      cacheTags.customerScope(req.user!.userId),
    ],
  }),
  customerPointsController,
);
router.get(
  "/reviews",
  requireAuth,
  requireRole("CUSTOMER"),
  createGetCacheMiddleware({
    namespace: "customer:reviews",
    ttlSeconds: 60,
    tags: (req) => [
      cacheTags.customerReviews(req.user!.userId),
      cacheTags.customerScope(req.user!.userId),
    ],
  }),
  customerReviewsController,
);
router.post(
  "/reviews",
  requireAuth,
  requireRole("CUSTOMER"),
  createCustomerReviewController,
);
router.get(
  "/tickets",
  requireAuth,
  requireRole("CUSTOMER"),
  createGetCacheMiddleware({
    namespace: "customer:tickets",
    ttlSeconds: 60,
    tags: (req) => [
      cacheTags.customerScope(req.user!.userId),
      cacheTags.customerTickets(req.user!.userId),
    ],
  }),
  customerTicketsController,
);

export default router;
