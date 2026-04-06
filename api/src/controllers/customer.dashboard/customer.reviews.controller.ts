import type { NextFunction, Request, Response } from "express";
import {
  createCustomerReview,
  getCustomerReviews,
} from "../../services/customerProfile/customer.reviews.js";
import { AppError } from "../../utils/app-error.js";

function getAuthorizedCustomerId(req: Request) {
  const customerId = req.user?.userId ?? req.user?.id;

  if (!customerId) {
    throw new AppError("Unauthorized", 401);
  }

  return Number(customerId);
}

export async function customerReviewsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const customerId = getAuthorizedCustomerId(req);
    const reviews = await getCustomerReviews(customerId);

    res.status(200).json({
      message: "Fetch Success",
      data: reviews,
      source: "database",
    });
  } catch (error) {
    next(error);
  }
}

export async function createCustomerReviewController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const customerId = getAuthorizedCustomerId(req);
    const review = await createCustomerReview(customerId, req.body);

    res.status(201).json({
      message: "Review submitted successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
}
