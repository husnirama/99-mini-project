import type { Response, Request } from "express";

export async function getCustomerById(res: Response, req: Request) {
  res.status(200).json({ message: "Customer Profile" });
}

export async function getOrganizerById(res: Response, req: Request) {
  res.status(200).json({ message: "Organizer Profile" });
}
