import { z } from "zod";

export const adminSignUpSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export const adminLoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export const updateQuestionSchema = z.object({
  body: z.object({
    question: z.string().optional(),
    options: z.record(z.string(), z.string()).optional(),
    correctAns: z.string().optional(),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD", "MIXED"]).optional(),
    solution: z.string().optional(),
    topic: z.object({ id: z.string().uuid() }).optional(),
  }),
});

export type AdminSignUpSchema = z.infer<typeof adminSignUpSchema>;
export type AdminLoginSchema = z.infer<typeof adminLoginSchema>;
export type UpdateQuestionSchema = z.infer<typeof updateQuestionSchema>;

export const adminValidate = {
  adminSignUpSchema,
  adminLoginSchema,
  updateQuestionSchema,
};
