import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import {
  handleApproveTransaction,
  handleCancelTransaction,
  handleRejectTransaction,
  handleUploadPaymentProof,
} from "../controllers/transaction.controller.js";
import requireAuth from "../middlewares/auth.middleware.js";
import requireRole from "../middlewares/role.middleware.js";

const router = express.Router();

router.patch(
  "/:transactionId/paymentProof",
  upload.single("paymentProof"),
  handleUploadPaymentProof,
);

router.patch(
  "/:transactionId/approve",
  requireAuth,
  requireRole("EVENT_ORGANIZER"),
  handleApproveTransaction,
);

router.patch(
  "/:transactionId/reject",
  requireAuth,
  requireRole("EVENT_ORGANIZER"),
  handleRejectTransaction,
);

router.patch("/:transactionId/cancel", handleCancelTransaction);

export default router;
