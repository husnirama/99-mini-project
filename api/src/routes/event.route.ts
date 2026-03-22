import express from "express";
import requireAuth from "../middlewares/auth.middleware.js";
import requireRole from "../middlewares/role.middleware.js";
import {
  getEvent,
  getEvents,
  handleCreateEvent,
} from "../controllers/event.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();
router.post(
  "/draft",
  requireAuth,
  requireRole("EVENT_ORGANIZER"),
  upload.array("arrayImages", 10),
  handleCreateEvent,
);
router.get("/event-list", getEvents);
router.get("/:id", getEvent);

export default router;
