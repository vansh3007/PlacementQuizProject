import { Request, Response, NextFunction } from "express";
import {
  verifyJWT,
  verifyRefreshToken,
  generateTokens,
  TokenPayload,
} from "@/lib/auth";
import ApiError from "@/utils/ApiError";
import httpStatus from "http-status";
import { setAuthCookie } from "@/lib/cookies";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Access token required");
    }

    const decoded = verifyJWT(accessToken);

    if (!decoded) {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Refresh token required");
      }

      const refreshDecoded = verifyRefreshToken(refreshToken);

      if (!refreshDecoded) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid refresh token");
      }

      const tokens = generateTokens({
        userId: refreshDecoded.userId,
        email: refreshDecoded.email,
        isStudent: refreshDecoded.isStudent,
        isFaculty: refreshDecoded.isFaculty,
      });

      setAuthCookie(
        res,
        tokens.accessToken,
        "Token refreshed",
        tokens.refreshToken
      );

      req.user = refreshDecoded;
    } else {
      req.user = decoded;
    }

    next();
  } catch (error) {
    next(error);
  }
};
