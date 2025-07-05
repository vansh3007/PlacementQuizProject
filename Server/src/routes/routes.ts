import { Router } from "express";
import userRouter from "@/module/student/student.route";
import adminRouter from "@/module/admin/admin.routes";
import quizRouter from "@/module/quiz/quiz.route";
import jobRouter from "@/module/job/job.route";
import branchRouter from "@/module/branch/branch.route";
const v1Router = Router();

const routes = [
  { path: "/user", router: userRouter },
  { path: "/admin", router: adminRouter },
  { path: "/quiz", router: quizRouter },
  { path: "/jobs", router: jobRouter },
  {path:"/branch",router:branchRouter}
];

routes.forEach((route) => v1Router.use(route.path, route.router));

export default v1Router;
