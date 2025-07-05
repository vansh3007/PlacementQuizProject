import { Response } from "express";

export const setAuthCookie = (
  res: Response,
  accessToken: string,
  message: string,
  refreshToken?: string,
  user?: any
) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    httpOnly: false,
    secure: isProduction,
    sameSite: "none",
    maxAge: 15 * 60 * 1000,
  });

  if (refreshToken) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  res.status(201).json({
    success: true,
    message,
    user,
  });
};

export const setOtpCookie = (res: Response, token: string) => {
  res.cookie("otp_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 10 * 60 * 1000,
  });
};

export const clearOtpCookie = (res: Response) => {
  res.clearCookie("otp_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
};
