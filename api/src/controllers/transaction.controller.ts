import type { NextFunction, Request, Response } from "express";
import {
  approveTransaction,
  cancelTransaction,
  getTransactionDetail,
  listTransactions,
  rejectTransaction,
  uploadPaymentProof,
} from "../services/transaction.service.js";
import { transactionListQuerySchema } from "../validations/transaction.validation.js";

function getActorFromRequest(req: Request) {
  const userId = req.user?.id ?? null;

  return {
    userId,
    role: req.user?.role ?? null,
    guestToken: req.headers["x-guest-token"] as string | null,
  };
}

export async function handleGetTransactions(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const query = transactionListQuerySchema.parse(req.query);
    const actor = getActorFromRequest(req);
    const transactions = await listTransactions(actor, query);

    return res.status(200).json({
      message: "Transactions fetched successfully",
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleGetTransactionDetail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const transactionId = Number(req.params.transactionId);
    const actor = getActorFromRequest(req);
    const transaction = await getTransactionDetail(transactionId, actor);

    return res.status(200).json({
      message: "Transaction fetched successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleUploadPaymentProof(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const transactionId = Number(req.params.transactionId);
    const file = req.file as Express.Multer.File;
    const actor = getActorFromRequest(req);
    const transaction = await uploadPaymentProof(transactionId, file, actor);

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
    const actor = getActorFromRequest(req);
    const transaction = await rejectTransaction(
      transactionId,
      actor.userId!,
      String(actor.role),
      actor,
    );

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
    const actor = getActorFromRequest(req);
    const transaction = await approveTransaction(
      transactionId,
      actor.userId!,
      actor,
    );

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
    const actor = getActorFromRequest(req);
    const transaction = await cancelTransaction(transactionId, actor);

    return res.status(200).json({
      message: "Transaction canceled successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
}
