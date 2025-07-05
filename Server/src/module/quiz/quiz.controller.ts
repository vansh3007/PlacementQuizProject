import { asyncWrap } from "@/utils/asyncWrap";
import { Request, Response } from "express";
import { Difficulty } from "@/generated/prisma";
import { quizService } from "./quiz.service";

const generateQuiz = asyncWrap(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    throw new Error("User ID is required");
  }

  const { categoryId, topicsId, difficulty, totalQuestions, timeLimit, mode } =
    req.query;

  if (!categoryId || !topicsId) {
    return res
      .status(400)
      .json({ message: "categoryId and topicsId are required" });
  }

  let difficultyFilter: Difficulty | Difficulty[];
  if (typeof difficulty === "string" && difficulty.includes(",")) {
    difficultyFilter = difficulty
      .split(",")
      .map((d) => d.trim().toUpperCase()) as Difficulty[];
  } else {
    difficultyFilter = (difficulty as string).toUpperCase() as Difficulty;
  }

  const data = await quizService.generateQuiz({
    userId,
    categoryId: String(categoryId),
    topicsId: String(topicsId).split(","),
    difficulty: difficultyFilter,
    totalQuestions: Number(totalQuestions),
    timeLimit: Number(timeLimit),
    mode: String(mode),
  });
  return res.json({ message: "quiz generated", data });
});

const submitQuiz = asyncWrap(async (req: Request, res: Response) => {
  const userId = req.user?.userId || req.user?.id;
  if (!userId) {
    throw new Error("User ID is required");
  }
  const result = await quizService.submitQuiz({ ...req.body, userId });
  return res.json({ message: "quiz submitted", result });
});

const getAllUserQuizzes = asyncWrap(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    throw new Error("User ID is required");
  }

  const data = await quizService.getAllUserQuizzes(userId);
  res.json({ quizzes: data });
});

const getUserQuizById = asyncWrap(async (req: Request, res: Response) => {
  const quizId = req.params.quizId;
  if (!quizId) {
    throw new Error("Quiz ID is required");
  }

  const quiz = await quizService.getUserQuizById(quizId);

  res.json({ quiz });
});

const getTopics = asyncWrap(async (_req: Request, res: Response) => {
  const topics = await quizService.getTopics();
  res.json({ success: true, message: "topics fetched", topics });
});

const getCategories = asyncWrap(async (_req: Request, res: Response) => {
  const categories = await quizService.getCategories();
  res.json({ success: true, message: "categories fetched", categories });
});

const getTopicsByCategoryId = asyncWrap(async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  if (!categoryId) throw new Error("Category ID is required");
  const topics = await quizService.getTopicsByCategoryId(categoryId);
  res.json({ success: true, message: "topics fetched", topics });
});

export const quizController = {
  generateQuiz,
  submitQuiz,
  getAllUserQuizzes,
  getUserQuizById,
  getTopics,
  getCategories,
  getTopicsByCategoryId,
};
