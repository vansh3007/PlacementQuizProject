import { Request, Response, NextFunction } from "express";

export function asyncWrap(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error: any) {
      console.error("API Error:", error);
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };
}
