import type { NextFunction, Request, Response } from "express";
import {
  getOrganizerProfile,
  updateOrganizerPassword,
  updateOrganizerProfile,
  updateOrganizerProfilePicture,
} from "../services/organizerProfile/organizer.profile.service.js";
import { AppError } from "../utils/app-error.js";

function getAuthorizedOrganizerId(req: Request) {
  const organizerId = req.user?.userId ?? req.user?.id;

  if (!organizerId) {
    throw new AppError("Unauthorized", 401);
  }

  return Number(organizerId);
}

export async function handleGetOrganizerProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const organizerId = getAuthorizedOrganizerId(req);
    const profile = await getOrganizerProfile(organizerId);

    return res.status(200).json({
      message: "Organizer profile fetched successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleUpdateOrganizerProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const organizerId = getAuthorizedOrganizerId(req);
    const profile = await updateOrganizerProfile(organizerId, req.body);

    return res.status(200).json({
      message: "Organizer profile updated successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleUpdateOrganizerPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const organizerId = getAuthorizedOrganizerId(req);
    await updateOrganizerPassword(organizerId, req.body);

    return res.status(200).json({
      message: "Organizer password updated successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleUpdateOrganizerProfilePicture(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const organizerId = getAuthorizedOrganizerId(req);
    const profile = await updateOrganizerProfilePicture(
      organizerId,
      req.file as Express.Multer.File | undefined,
    );

    return res.status(200).json({
      message: "Organizer profile image updated successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}
