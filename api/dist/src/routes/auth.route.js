import express from "express";
import { cacheTags, createGetCacheMiddleware } from "../lib/cache.js";
import { handleUserRegister, handleUserLogin, handleUserLogout, handleRefreshToken, } from "../controllers/auth.controller.js";
import requireAuth from "../middlewares/auth.middleware.js";
import { handleAuthentication } from "../controllers/auth.controller.js";
const router = express.Router();
router.route("/register").post(handleUserRegister);
router.route("/login").post(handleUserLogin);
router.get("/me", requireAuth, createGetCacheMiddleware({
    namespace: "auth:me",
    ttlSeconds: 60,
    tags: (req) => [cacheTags.authMe(req.user.userId)],
}), handleAuthentication);
router.post("/logout", handleUserLogout);
router.post("/refresh", handleRefreshToken);
export default router;
//# sourceMappingURL=auth.route.js.map