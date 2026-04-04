import express from "express";

import {
  getCustomerCoupons,
  getCustomerById,
  getOrganizerById,
  updateCustomerPassword,
  updateCustomerProfile,
} from "../controllers/user.controller.js";
import requireAuth from "../middlewares/auth.middleware.js";
import requireRole from "../middlewares/role.middleware.js";

const router = express.Router();

router
  .route("/customer/profile")
  .get(requireAuth, requireRole("CUSTOMER"), getCustomerById)
  .patch(requireAuth, requireRole("CUSTOMER"), updateCustomerProfile);
router.patch(
  "/customer/profile/password",
  requireAuth,
  requireRole("CUSTOMER"),
  updateCustomerPassword,
);
router.get(
  "/customer/coupons",
  requireAuth,
  requireRole("CUSTOMER"),
  getCustomerCoupons,
);
router
  .route("/organizer/profile")
  .get(requireAuth, requireRole("EVENT_ORGANIZER"), getOrganizerById);

export default router;
