import express from "express";
import { createRegisterPointsController } from "../controllers/points.controller.js";

const router = express.Router();
router.post("/register", createRegisterPointsController);

export default router;
