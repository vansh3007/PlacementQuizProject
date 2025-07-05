import { Request, Response, NextFunction } from "express";
import { verifyOtpToken, otpTokenPayload } from "@/lib/auth";
import ApiError from "@/utils/ApiError";
import httpStatus from "http-status";

declare global {
  namespace Express {
    interface Request {
      otpUser?: otpTokenPayload;
    }
  }
}

export const verifyOtpTokenMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const otpToken = req.cookies.otp_token;

    if (!otpToken) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "OTP token is required");
    }

    const decoded = verifyOtpToken(otpToken);

    if (!decoded) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Invalid or expired OTP token"
      );
    }

    req.otpUser = decoded;

    next();
  } catch (error) {
    next(error);
  }
};
