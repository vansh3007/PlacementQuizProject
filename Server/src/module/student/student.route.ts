import Router from "express";
import { userController } from "./student.controller";
import { asyncWrap } from "@/utils/asyncWrap";
import { authenticateToken } from "@/middlewares/auth.middleware";
import { verifyOtpTokenMiddleware } from "@/middlewares/verifyOtpToken.middleware";
import validate from "@/middlewares/validate";
import { studentValidate } from "./student.validate";
const userRouter = Router();
userRouter.post(
  "/signup",
  validate(studentValidate.signUpSchema),
  asyncWrap(userController.signUpUser)
);
userRouter.post(
  "/login",
  validate(studentValidate.loginSchema),
  asyncWrap(userController.login)
);
userRouter.post("/logout", authenticateToken, asyncWrap(userController.logout));
userRouter.get("/google", asyncWrap(userController.googleLogin));
userRouter.post("/refresh", asyncWrap(userController.refreshToken));
userRouter.post("/sendotp", asyncWrap(userController.sendOtp));
userRouter.post("/verifyotp", asyncWrap(userController.verifyOtp));
userRouter.post(
  "/resetpassword",
  verifyOtpTokenMiddleware,
  asyncWrap(userController.resetPassword)
);
export default userRouter;
