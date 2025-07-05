import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodEffects, ZodError } from "zod";

declare module "express-serve-static-core" {
  interface Request {
    validatedBody?: any;
    validatedQuery?: any;
    validatedParams?: any;
  }
}

const validate =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.validatedBody = parsed.body;
      req.validatedQuery = parsed.query;
      req.validatedParams = parsed.params;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors,
        });
      } else {
        next(error);
      }
    }
  };

export default validate;
