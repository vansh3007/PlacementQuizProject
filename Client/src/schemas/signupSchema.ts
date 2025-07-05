import { z } from "zod";

export const SignupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must include a letter, number, and symbol"
      ),
    confirmPassword: z.string().min(6, "Please confirm your password"),
    enrollment: z.string().min(1),
    profile: z.string().optional(),
    branch: z.string(),
    admissionYear: z.number(),
    currentYear: z.number(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpData = z.infer<typeof SignupSchema>;
