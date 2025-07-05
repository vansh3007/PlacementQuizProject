import z from "zod";

export const createBranchSchema = z.object({
  body: z.object({
    key: z.string(),
    name: z.string(),
  }),
});



export const updateBranchSchema = z.object({
  body: z.object({
    key: z.string().optional(),
    name: z.string().optional(),
  }),
});


export type CreateBranchSchema = z.infer<typeof createBranchSchema>;
export type UpdateBranchSchema = z.infer<typeof updateBranchSchema>;

export const branchValidate = {
  createBranchSchema,
  updateBranchSchema,
}

