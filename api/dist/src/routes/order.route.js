import express from "express";
import { createOrderController } from "../controllers/order.controller.js";
import optionalAuth from "../middlewares/optional-auth.middleware.js";
const router = express.Router();
router.post("/creation", optionalAuth, createOrderController);
export default router;
//# sourceMappingURL=order.route.js.map