import Router from "express";
import adminController from "./admin.controller";
import { authenticateToken } from "@/middlewares/auth.middleware";
import { upload } from "@/middlewares/upload.middleware";
import validate from "@/middlewares/validate";
import { adminValidate } from "./admin.validator";
const adminRouter = Router();

adminRouter.post(
  "/signup",
  validate(adminValidate.adminSignUpSchema),
  adminController.registerAdmin
);
adminRouter.post(
  "/login",
  validate(adminValidate.adminLoginSchema),
  adminController.login
);
adminRouter.post("/logout", authenticateToken, adminController.logout);
adminRouter.post("/refresh", adminController.refreshToken);

adminRouter.post(
  "/upload",
  upload.single("file"),
  authenticateToken,
  adminController.uploadExcel
);

adminRouter.use(authenticateToken);
adminRouter.get("/questions", adminController.getAllQuestions);
adminRouter.get("/users", adminController.getAllUsers);
adminRouter.get("/questions/:id", adminController.getAllQuestionsById);
adminRouter.patch(
  "/questions/:id",
  validate(adminValidate.updateQuestionSchema),
  adminController.updateQuestion
);
adminRouter.delete("/questions/:id", adminController.deleteQuestions);

export default adminRouter;
