import express from "express";
import { cacheTags, createGetCacheMiddleware } from "../lib/cache.js";
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
router.get(
  "/event-list",
  createGetCacheMiddleware({
    namespace: "events:list",
    ttlSeconds: 120,
    tags: () => [cacheTags.eventsList],
  }),
  getEvents,
);
router.get(
  "/:id",
  createGetCacheMiddleware({
    namespace: "events:detail",
    ttlSeconds: 120,
    tags: (req) => {
      const eventId = Number(req.params.id);
      return Number.isFinite(eventId)
        ? [cacheTags.eventsList, cacheTags.event(eventId)]
        : [cacheTags.eventsList];
    },
  }),
  getEvent,
);

export default router;
