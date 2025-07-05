import Router from "express";
import { jobController } from "./job.controller";
import { authenticateToken } from "@/middlewares/auth.middleware";
import { uploadImage } from "@/middlewares/upload.middleware";
import validate from "@/middlewares/validate";
import { jobValidate } from "./job.validate";
const jobRouter = Router();

jobRouter.use(authenticateToken);
jobRouter.post(
  "/newjob",
  validate(jobValidate.createJobSchema),
  jobController.createJob
);
jobRouter.get("/", jobController.getAllJobs);
jobRouter.get("/:id", jobController.getJobById);
jobRouter.patch(
  "/:id",
  validate(jobValidate.updateJobSchema),
  jobController.updateJob
);
jobRouter.delete("/:id", jobController.deleteJob);
jobRouter.post(
  "/uploadlogo",
  authenticateToken,
  uploadImage.single("logo"),
  jobController.uploadLogo
);
export default jobRouter;
