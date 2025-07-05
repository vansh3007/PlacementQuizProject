import { z } from "zod";

export const createJobSchema = z.object({
  body: z.object({
    jobTitle: z.string(),
    jobDescription: z.string(),
    companyName: z.string(),
    applyLink: z.string().url(),
    package: z.string().optional(),
    logo: z.string().optional(),
    location: z.string().optional(),
  }),
});

export const updateJobSchema = z.object({
  body: z.object({
    jobTitle: z.string().optional(),
    jobDescription: z.string().optional(),
    companyName: z.string().optional(),
    applyLink: z.string().url().optional(),
    package: z.string().optional(),
    logo: z.string().optional(),
    location: z.string().optional(),
  }),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;

export const jobValidate = {
  createJobSchema,
  updateJobSchema,
};
