import express from "express";
import { cacheTags, createGetCacheMiddleware } from "../lib/cache.js";
import requireAuth from "../middlewares/auth.middleware.js";
import requireRole from "../middlewares/role.middleware.js";
import { organizerDahsboardController } from "../controllers/organizer.dashboard/organizer.dashboard.controller.js";
import { handleGetOrganizerProfile, handleUpdateOrganizerPassword, handleUpdateOrganizerProfile, } from "../controllers/organizer.profile.controller.js";
const router = express.Router();
router.get("/dashboard", requireAuth, requireRole("EVENT_ORGANIZER"), createGetCacheMiddleware({
    namespace: "organizer:dashboard",
    ttlSeconds: 60,
    tags: (req) => [
        cacheTags.organizerDashboard(req.user.userId),
        cacheTags.organizerScope(req.user.userId),
    ],
}), organizerDahsboardController);
router.get("/profile", requireAuth, requireRole("EVENT_ORGANIZER"), createGetCacheMiddleware({
    namespace: "organizer:profile",
    ttlSeconds: 60,
    tags: (req) => [
        cacheTags.organizerProfile(req.user.userId),
        cacheTags.organizerScope(req.user.userId),
    ],
}), handleGetOrganizerProfile);
router.patch("/profile", requireAuth, requireRole("EVENT_ORGANIZER"), handleUpdateOrganizerProfile);
router.patch("/profile/password", requireAuth, requireRole("EVENT_ORGANIZER"), handleUpdateOrganizerPassword);
export default router;
//# sourceMappingURL=organizer.profile.route.js.map