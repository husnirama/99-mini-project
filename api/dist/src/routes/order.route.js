import express from "express";
import { createOrderController, previewOrderController, } from "../controllers/order.controller.js";
import requireAuth from "../middlewares/auth.middleware.js";
const router = express.Router();
router.post("/preview", requireAuth, previewOrderController);
router.post("/creation", requireAuth, createOrderController);
export default router;
//# sourceMappingURL=order.route.js.map