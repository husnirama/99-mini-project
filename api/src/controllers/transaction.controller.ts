import type { Response, Request, NextFunction } from "express";
import {
  approveTransaction,
  cancelTransaction,
  rejectTransaction,
  uploadPaymentProof,
} from "../services/transaction.service.js";
import { AppError } from "../utils/app-error.js";

export async function handleUploadPaymentProof(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const transactionId = Number(req.params.transactionId);
    const file = req.file as Express.Multer.File;

    const transaction = await uploadPaymentProof(transactionId, file, {
      userId: req.user?.id ?? null,
      role: req.user?.role ?? null,
      guestToken: req.headers["x-guest-token"] as string | null,
    });

    return res.status(200).json({
      message: "Payment proof uploaded successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleRejectTransaction(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const transactionId = Number(req.params.transactionId);
    const adminId = req.user!.id;
    const role = req.user!.role;

    const transaction = await rejectTransaction(transactionId, adminId, role, {
      userId: req.user?.id ?? null,
      role: req.user?.role ?? null,
    });
    return res.status(200).json({
      message: "Transaction rejected successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleApproveTransaction(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const transactionId = Number(req.params.transactionId);
    const adminId = req.user!.id;

    const transaction = await approveTransaction(transactionId, adminId, {
      userId: req.user?.id ?? null,
      role: req.user?.role ?? null,
    });
    return res.status(200).json({
      message: "Transaction approved successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleCancelTransaction(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const transactionId = Number(req.params.transactionId);
    const actor = {
      userId: req.user?.id ?? null,
      role: req.user?.role ?? null,
      guestToken: req.headers["x-guest-token"] as string | null,
    };

    const transaction = await cancelTransaction(transactionId, actor);
    return res.status(200).json({
      message: "Transaction canceled successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
}
