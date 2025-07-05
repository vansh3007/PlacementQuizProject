import Router from "express";
import { branchController } from "./branch.controller";
import validate from "@/middlewares/validate";
import { branchValidate } from "./branch.valdate";
import { authenticateToken } from "@/middlewares/auth.middleware";
const branchRouter = Router();

branchRouter.use(authenticateToken);
branchRouter.post(
  "/newbranch",
  validate(branchValidate.createBranchSchema),
  branchController.createBranch
);
branchRouter.get("/", branchController.getAllBranches);
branchRouter.patch(
  "/:id",
  validate(branchValidate.updateBranchSchema),
  branchController.updateBranch
);
branchRouter.delete("/:id", branchController.deleteBranch);
export default branchRouter;
