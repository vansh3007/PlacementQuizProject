import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import { env } from "../config/env.config";
import ApiError from "@/utils/ApiError";

const globalErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.log(`[APP ERROR]`, { error });

  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message = "Internal server error";
  let errors: unknown[] | undefined;

  if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
  } else if (error instanceof ZodError) {
    message = "Validation error";
    errors = error.errors;
  } else if (error instanceof Error) {
    message = error?.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    stack: env.nodeEnv === "development" ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
