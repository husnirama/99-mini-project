import express from "express";
import { createOrderController } from "../controllers/order.controller.js";

const router = express.Router();
router.post("/creation", createOrderController);

export default router;
