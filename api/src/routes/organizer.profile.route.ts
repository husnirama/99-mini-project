import express from "express";
import requireAuth from "../middlewares/auth.middleware.js";
import requireRole from "../middlewares/role.middleware.js";
import { organizerDahsboardController } from "../controllers/organizer.dashboard/organizer.dashboard.controller.js";

const router = express.Router();
router.get(
  "/dashboard",
  requireAuth,
  requireRole("EVENT_ORGANIZER"),
  organizerDahsboardController,
);

export default router;
