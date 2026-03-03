import express from "express";
import requireAuth from "../middlewares/auth.middleware.js";
import requireRole from "../middlewares/role.middleware.js";
import { handleCreateEvent } from "../controllers/event.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();
router.post(
  "/draft",
  requireAuth,
  requireRole("EVENT_ORGANIZER"),
  upload.single("arrayImages"),
  handleCreateEvent,
);

export default router;
