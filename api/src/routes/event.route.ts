import express from "express";
import { cacheTags, createGetCacheMiddleware } from "../lib/cache.js";
import requireAuth from "../middlewares/auth.middleware.js";
import requireRole from "../middlewares/role.middleware.js";
import {
  getEvent,
  getEvents,
  handleCreateEvent,
  handleGetOwnedEvent,
  handleUpdateEvent,
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
  "/manage/:id",
  requireAuth,
  requireRole("EVENT_ORGANIZER"),
  createGetCacheMiddleware({
    namespace: "events:manage",
    ttlSeconds: 60,
    tags: (req) => {
      const eventId = Number(req.params.id);
      const organizerId = req.user?.userId ?? req.user?.id;

      if (!Number.isFinite(eventId) || !organizerId) {
        return [cacheTags.eventsList];
      }

      return [
        cacheTags.eventsList,
        cacheTags.event(eventId),
        cacheTags.organizerDashboard(organizerId),
        cacheTags.organizerScope(organizerId),
      ];
    },
  }),
  handleGetOwnedEvent,
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
router.patch(
  "/:id",
  requireAuth,
  requireRole("EVENT_ORGANIZER"),
  upload.array("arrayImages", 10),
  handleUpdateEvent,
);

export default router;
