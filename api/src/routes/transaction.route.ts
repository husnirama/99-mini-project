import express from "express";
import { cacheTags, createGetCacheMiddleware } from "../lib/cache.js";
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

router.get(
  "/",
  requireAuth,
  createGetCacheMiddleware({
    namespace: "transactions:list",
    ttlSeconds: 30,
    tags: (req) =>
      req.user?.role === "EVENT_ORGANIZER"
        ? [cacheTags.transactionsOrganizer(req.user.userId)]
        : req.user?.userId
          ? [cacheTags.transactionsUser(req.user.userId)]
          : [],
  }),
  handleGetTransactions,
);
router.get(
  "/:transactionId",
  optionalAuth,
  createGetCacheMiddleware({
    namespace: "transactions:detail",
    ttlSeconds: 30,
    tags: (req) => {
      const transactionId = Number(req.params.transactionId);
      const tags = Number.isFinite(transactionId)
        ? [cacheTags.transaction(transactionId)]
        : [];

      if (req.user?.role === "EVENT_ORGANIZER") {
        tags.push(cacheTags.transactionsOrganizer(req.user.userId));
      } else if (req.user?.userId) {
        tags.push(cacheTags.transactionsUser(req.user.userId));
      }

      return tags;
    },
  }),
  handleGetTransactionDetail,
);

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
