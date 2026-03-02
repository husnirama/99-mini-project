import express from "express";

import {
  getCustomerById,
  getOrganizerById,
} from "../controllers/user.controller.js";
import requireAuth from "../middlewares/auth.middleware.js";
import requireRole from "../middlewares/role.middleware.js";

const router = express.Router();

router.route("/customer/profile").get(requireAuth, requireRole("CUSTOMER"));
router
  .route("/organizer/profile")
  .get(requireAuth, requireRole("EVENT_ORGANIZER"));

export default router;
