import express from "express";
import { createOrderController } from "../controllers/order.controller.js";
import requireAuth from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/creation", requireAuth, createOrderController);

export default router;
