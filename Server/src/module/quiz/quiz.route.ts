import { Router } from "express";
import { quizController } from "./quiz.controller";
import { authenticateToken } from "@/middlewares/auth.middleware";
import validate from "@/middlewares/validate";
import { quizValidate } from "./quiz.validators";
const quizRouter = Router();
quizRouter.use(authenticateToken);
quizRouter.get(
  "/newquiz",
  validate(quizValidate.generateQuizSchema),
  quizController.generateQuiz
);
quizRouter.post(
  "/submit",
  validate(quizValidate.submitQuizSchema),
  quizController.submitQuiz
);
quizRouter.get("/userQuiz", quizController.getAllUserQuizzes);
quizRouter.get("/topics", quizController.getTopics);
quizRouter.get("/categories", quizController.getCategories);
quizRouter.get("/topics/:categoryId", quizController.getTopicsByCategoryId);
quizRouter.get("/:quizId", quizController.getUserQuizById);

export default quizRouter;
