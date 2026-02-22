import express from "express";
import {
  handleUserRegister,
  handleUserLogin,
  handleUserLogout,
  handleRefreshToken,
} from "../controllers/auth.controller.js";
import requireAuth from "../middlewares/auth.middleware.js";
import { handleAuthentication } from "../controllers/auth.controller.js";

const router = express.Router();
router.route("/register").post(handleUserRegister);
router.route("/login").post(handleUserLogin);
router.get("/me", requireAuth, handleAuthentication);
router.post("/logout", handleUserLogout);
router.post("/refresh", handleRefreshToken);

export default router;
