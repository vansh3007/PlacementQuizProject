import prisma from "@/utils/prisma";
import { Prisma, Branch } from "@/generated/prisma";


const createBranch = async (
  data: Prisma.BranchCreateInput,
): Promise<Branch> => {
  const branch = await prisma.branch.create({ data });
  return branch;
};

const updateBranch = async (
  id: string,
  data: Prisma.BranchUpdateInput,
): Promise<Branch> => {
  const branch = await prisma.branch.update({ where: { id }, data });
  return branch;
};

const deleteBranch = async (
  id: string,
): Promise<Branch> => {
  const branch = await prisma.branch.delete({ where: { id } });
  return branch;
};

const getAllBranches = async (): Promise<Branch[]> => {
  const branches = await prisma.branch.findMany();
  return branches;
};

export const branchService = {
  createBranch,
  updateBranch,
  deleteBranch,
  getAllBranches,
};
