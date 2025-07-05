import { z } from "zod";

// Wrap schemas in { body: ... } to match the validate middleware
export const signUpSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    enrollment: z.string(),
    profile: z.string().optional(),
    branch: z.string(),
    admissionYear: z.number(),
    currentYear: z.number(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export const studentValidate = {
  signUpSchema,
  loginSchema,
};
