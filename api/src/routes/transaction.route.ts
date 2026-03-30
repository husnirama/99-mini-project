import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import {
  handleApproveTransaction,
  handleCancelTransaction,
  handleGetTransactionDetail,
  handleGetTransactions,
  handleRejectTransaction,
  handleUploadPaymentProof,
} from "../controllers/transaction.controller.js";
import requireAuth from "../middlewares/auth.middleware.js";
import optionalAuth from "../middlewares/optional-auth.middleware.js";
import requireRole from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", requireAuth, handleGetTransactions);
router.get("/:transactionId", optionalAuth, handleGetTransactionDetail);

router.patch(
  "/:transactionId/paymentProof",
  optionalAuth,
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

router.patch("/:transactionId/cancel", optionalAuth, handleCancelTransaction);

export default router;
