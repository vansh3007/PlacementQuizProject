import { Prisma, Jobs } from "@/generated/prisma";
import prisma from "@/utils/prisma";

const createJob = async (data: Prisma.JobsCreateInput): Promise<Jobs> => {
  const job = await prisma.jobs.create({ data });
  return job;
};

const updateJob = async (
  id: string,
  data: Prisma.JobsUpdateInput
): Promise<Jobs> => {
  const job = await prisma.jobs.update({ where: { id }, data });
  return job;
};

const deleteJob = async (id: string): Promise<Jobs> => {
  const job = await prisma.jobs.delete({ where: { id } });
  return job;
};

const getAllJobs = async (): Promise<Jobs[]> => {
  const jobs = await prisma.jobs.findMany();
  return jobs;
};

const getJobById = async (id: string): Promise<Jobs | null> => {
  const job = await prisma.jobs.findUnique({ where: { id } });
  return job;
};

export const jobService = {
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getJobById,
};
