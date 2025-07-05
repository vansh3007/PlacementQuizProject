import { Response, Request } from "express";
import { jobService } from "./job.service";
import { asyncWrap } from "@/utils/asyncWrap";
import { checkAdmin } from "@/lib/checkAdmin";
import { uploadToCloudinary } from "@/utils/cloudinaryUpload";

const createJob = asyncWrap(async (req: Request, res: Response) => {
  const adminEmail = req.user?.email;
  if (!adminEmail || !(await checkAdmin(adminEmail))) {
    return res.status(401).json({ message: "Use are not authorized" });
  }
  const job = await jobService.createJob(req.body);
  return res.json({ success: true, message: "job created", job }).status(201);
});

const updateJob = asyncWrap(async (req: Request, res: Response) => {
  const adminEmail = req.user?.email;
  if (!adminEmail || !(await checkAdmin(adminEmail))) {
    return res.status(401).json({ message: "Use are not authorized" });
  }
  const data = req.body;

  const id = req.params.id as string;
  const job = await jobService.updateJob(id, data);
  return res.json({ success: true, message: "job updated", job });
});

const deleteJob = asyncWrap(async (req: Request, res: Response) => {
  const adminEmail = req.user?.email;
  if (!adminEmail || !(await checkAdmin(adminEmail))) {
    return res.status(401).json({ message: "Use are not authorized" });
  }
  const id = req.params.id as string;
  const job = await jobService.deleteJob(id);
  return res.json({ success: true, message: "job deleted", job });
});

const getAllJobs = asyncWrap(async (_req: Request, res: Response) => {
  const jobs = await jobService.getAllJobs();
  return res.json({ success: true, message: "jobs fetched", jobs });
});

const getJobById = asyncWrap(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const job = await jobService.getJobById(id);
  return res.json({ success: true, message: "job fetched", job });
});

const uploadLogo = asyncWrap(async (req: Request, res: Response) => {
  const adminEmail = req.user?.email;
  if (!adminEmail || !(await checkAdmin(adminEmail))) {
    return res.status(401).json({ message: "Use are not authorized" });
  }
  const file = req.file;
  if (!file) {
    return res
      .status(401)
      .json({ success: false, message: "No file uploaded" });
  }
  const result: any = await uploadToCloudinary(
    file.buffer,
    "job_logos",
    file.originalname,
    "image"
  );

  return res.json({
    success: true,
    message: "logo uploaded",
    logoUrl: result.secure_url,
  });
});

export const jobController = {
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getJobById,
  uploadLogo,
};
