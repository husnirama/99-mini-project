import type { NextFunction, Request, Response } from "express";
import {
  getCustomerProfile,
  updateCustomerPassword,
  updateCustomerProfile,
  updateCustomerProfilePicture,
} from "../services/customerProfile/customer.profile.service.js";
import { AppError } from "../utils/app-error.js";

function getAuthorizedCustomerId(req: Request) {
  const customerId = req.user?.userId ?? req.user?.id;

  if (!customerId) {
    throw new AppError("Unauthorized", 401);
  }

  return Number(customerId);
}

export async function handleGetCustomerProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const customerId = getAuthorizedCustomerId(req);
    const profile = await getCustomerProfile(customerId);

    return res.status(200).json({
      message: "Customer profile fetched successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleUpdateCustomerProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const customerId = getAuthorizedCustomerId(req);
    const profile = await updateCustomerProfile(customerId, req.body);

    return res.status(200).json({
      message: "Customer profile updated successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleUpdateCustomerPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const customerId = getAuthorizedCustomerId(req);
    await updateCustomerPassword(customerId, req.body);

    return res.status(200).json({
      message: "Customer password updated successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleUpdateCustomerProfilePicture(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const customerId = getAuthorizedCustomerId(req);
    const profile = await updateCustomerProfilePicture(
      customerId,
      req.file as Express.Multer.File | undefined,
    );

    return res.status(200).json({
      message: "Customer profile image updated successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}
