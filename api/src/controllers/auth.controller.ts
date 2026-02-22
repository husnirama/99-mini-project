import type { Request, Response } from "express";
import {
  createUser,
  loginUser,
  authorizeMe,
  userLogout,
  refreshToken as refreshTokenService,
} from "../services/auth.service.js";

export async function handleUserRegister(req: Request, res: Response) {
  const userInput = req.body;
  const createdUser = await createUser(userInput);

  res.status(201).json({ message: "User Created", data: createdUser });
}

export async function handleUserLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  const logedUser = await loginUser(email, password);

  res.status(201).json({ message: "User Successfully login", data: logedUser });
}

export async function handleAuthentication(req: Request, res: Response) {
  const userId = (req as any).user.userId as number;
  const user = await authorizeMe(userId);
  return res.json({ user });
}

export async function handleUserLogout(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token required" });
    }

    await userLogout(refreshToken);

    return res.status(200).json({
      message: "Logged out Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function handleRefreshToken(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: " Refresh Token required" });
    }
    const result = await refreshTokenService(refreshToken);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({
      message: error.message || "Invalid refresh token",
    });
  }
}
