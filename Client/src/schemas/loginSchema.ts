import * as z from "zod";

export const LoginSchema = z.object({
  identifier: z
    .string()
    .nonempty({ message: "please enter email or enrollment number" }),
  password: z
    .string()
    .nonempty({ message: "please enter the password" })
    .min(8, { message: "password must be at least 8 characters long" }),
});

export type SignInData = z.infer<typeof LoginSchema>;
