import { z } from "zod";

const difficultyEnumValues = [
  "EASY",
  "MEDIUM",
  "HARD",
  "MIXED",
  "HARD,EASY,MEDIUM",
] as const;

export const generateQuizSchema = z.object({
  query: z.object({
    categoryId: z.string().uuid(),
    topicsId: z.string(),
    difficulty: z
      .string()
      .refine(
        (val) =>
          difficultyEnumValues.includes(val as any) ||
          val
            .split(",")
            .every((d) =>
              difficultyEnumValues.includes(d.trim().toUpperCase() as any)
            ),
        {
          message: `Difficulty must be one of: ${difficultyEnumValues.join(
            ", "
          )} or a comma-separated list of them`,
        }
      ),
    totalQuestions: z.string(),
    timeLimit: z.string(),
    mode: z.string(),
  }),
});

export const submitQuizSchema = z.object({
  body: z.object({
    category: z.string(),
    topics: z.array(z.string()),
    difficulty: z
      .string()
      .refine(
        (val) =>
          difficultyEnumValues.includes(val as any) ||
          val
            .split(",")
            .every((d) =>
              difficultyEnumValues.includes(d.trim().toUpperCase() as any)
            ),
        {
          message: `Difficulty must be one of: ${difficultyEnumValues.join(
            ", "
          )} or a comma-separated list of them`,
        }
      ),
    totalQuestions: z.number().min(1),
    timeLimit: z.number().min(1),
    mode: z.string(),
    questions: z.array(z.object({ id: z.string().uuid() })),
    answers: z.array(
      z.object({
        questionId: z.string().uuid(),
        selectedAnswer: z.string(),
      })
    ),
    timeTaken: z.number().min(0),
  }),
});

export type GenerateQuizInput = z.infer<typeof generateQuizSchema>;
export type SubmitQuizInput = z.infer<typeof submitQuizSchema>;

export const quizValidate = {
  generateQuizSchema,
  submitQuizSchema,
};
