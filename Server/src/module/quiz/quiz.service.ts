import prisma from "@/utils/prisma";

import { Difficulty } from "@/generated/prisma";

interface QuizConfig {
  userId: string;
  categoryId: string;
  topicsId: string[];
  difficulty: Difficulty | Difficulty[];
  totalQuestions: number;
  timeLimit: number;
  mode: string;
}

const generateQuiz = async (config: QuizConfig) => {
  const {
    userId,
    categoryId,
    topicsId,
    difficulty,
    totalQuestions,
    timeLimit,
    mode,
  } = config;


  const categoryRecord = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!categoryRecord) throw new Error("Invalid category");

  const topicRecords = await prisma.topic.findMany({
    where: {
      id: { in: topicsId },
      categoryId: categoryId,
    },
  });

  const topicIds = topicRecords.map((t) => t.id);
  if (topicIds.length === 0) throw new Error("No matching topics found");

  const attemptedQuestions = await prisma.attemptedQuestion.findMany({
    where: {
      userQuiz: {
        userId,
      },
    },
    select: {
      questionId: true,
    },
  });
  const attemptedQuestionIds = attemptedQuestions.map((a) => a.questionId);

  const perTopic = Math.floor(totalQuestions / topicIds.length);
  const remainder = totalQuestions % topicIds.length;

  let selected: any[] = [];
  const isDifficultyArray = Array.isArray(difficulty);
  const questionIdSet = new Set<string>();

  for (let i = 0; i < topicIds.length; i++) {
    const numQuestions = perTopic + (i < remainder ? 1 : 0);

    const questions = await prisma.question.findMany({
      where: {
        topicId: topicIds[i],
        difficulty: isDifficultyArray
          ? { in: difficulty as Difficulty[] }
          : (difficulty as Difficulty),
        id: { notIn: attemptedQuestionIds },
      },
    });

    const shuffled = questions.sort(() => 0.5 - Math.random());
    for (const q of shuffled) {
      if (
        !questionIdSet.has(q.id) &&
        selected.length < (i + 1) * numQuestions
      ) {
        selected.push(q);
        questionIdSet.add(q.id);
      }
      if (selected.length >= totalQuestions) break;
    }
  }

  if (selected.length === 0) {
    throw new Error("No unattempted questions available");
  }

  selected = selected.sort(() => 0.5 - Math.random());



  return {
    questions: selected.map(
      ({ id, question, options, difficulty, topicId }) => ({
        id,
        question,
        options,
        difficulty,
        topicId,
      })
    ),
    quizConfig: {
      category: categoryRecord.name,
      topics: topicRecords.map((t) => t.name),
      difficulty,
      totalQuestions,
      timeLimit,
      mode,
    },
  };
};

const submitQuiz = async ({
  userId,
  category,
  topics,
  difficulty,
  totalQuestions,
  timeLimit,
  mode,
  questions,
  answers,
  timeTaken,
}: {
  userId: string;
  category: string;
  topics: string[];
  difficulty: Difficulty | Difficulty[];
  totalQuestions: number;
  timeLimit: number;
  mode: string;
  questions: { id: string }[];
  answers: { questionId: string; selectedAnswer: string }[];
  timeTaken: number;
  }) => {
  const userQuiz = await prisma.userQuiz.create({
    data: {
      userId,
      category,
      topics,
      difficulty: Array.isArray(difficulty)
        ? difficulty[0] ?? "EASY"
        : difficulty,
      totalQuestions,
      timeLimit,
      mode,
      score: 0,
      timeTaken,
      correctCount: 0,
      wrongCount: 0,
    },
  });

  await prisma.quiz.createMany({
    data: questions.map((q) => ({
      questionId: q.id,
      userQuizId: userQuiz.id,
    })),
  });

  let correctCount = 0;
  let wrongCount = 0;

  for (const ans of answers) {
    const question = await prisma.question.findUnique({
      where: { id: ans.questionId },
    });

    if (!question) continue;

    await prisma.attemptedQuestion.create({
      data: {
        userQuizId: userQuiz.id,
        questionId: ans.questionId,
      },
    });

    await prisma.userAnswer.create({
      data: {
        userQuizId: userQuiz.id,
        questionId: ans.questionId,
        selected: ans.selectedAnswer,
        correct: question.correctAns,
      },
    });

    if (ans.selectedAnswer === question.correctAns) {
      correctCount++;
      await prisma.correctQuestion.create({
        data: {
          userQuizId: userQuiz.id,
          questionId: ans.questionId,
        },
      });
    } else {
      wrongCount++;
      await prisma.wrongQuestion.create({
        data: {
          userQuizId: userQuiz.id,
          questionId: ans.questionId,
        },
      });
    }
  }

  const total = correctCount + wrongCount;
  const score = (correctCount / userQuiz.totalQuestions) * 100;

  await prisma.userQuiz.update({
    where: { id: userQuiz.id },
    data: {
      score,
      timeTaken,
      correctCount: correctCount,
      wrongCount: wrongCount,
    },
  });

  return {
    userQuizId: userQuiz.id,
    totalAttempted: total,
    correct: correctCount,
    wrong: wrongCount,
    timeTaken,
    score,
  };
};

const getAllUserQuizzes = async (userId: string) => {
  const quizzes = await prisma.userQuiz.findMany({
    where: { userId },
    select: {
      id: true,
      category: true,
      topics: true,
      difficulty: true,
      totalQuestions: true,
      timeLimit: true,
      score: true,
      timeTaken: true,
      correctCount: true,
      wrongCount: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return quizzes;
};

const getUserQuizById = async (quizId: string) => {
  const quiz = await prisma.userQuiz.findUnique({
    where: { id: quizId },
    include: {
      quizQuestions: {
        include: {
          questions: {
            select: {
              id: true,
              question: true,
              options: true,
              correctAns: true,
              difficulty: true,
              topicId: true,
            },
          },
        },
      },
      userAnswers: {
        select: {
          questionId: true,
          selected: true,
          correct: true,
        },
      },
      correct: { select: { questionId: true } },
      wrong: { select: { questionId: true } },
      attempted: { select: { questionId: true } },
    },
  });

  if (!quiz) throw new Error("Quiz not found");

  const answerMap = new Map<string, { selected?: string; correct?: string }>(
    quiz.userAnswers.map((a) => [
      a.questionId,
      { selected: a.selected, correct: a.correct },
    ])
  );

  const questions = quiz.quizQuestions.map((q) => {
    const answer = answerMap.get(q.questionId);
    return {
      id: q.questionId,
      question: q.questions.question,
      options: q.questions.options,
      correctAns: q.questions.correctAns,
      difficulty: q.questions.difficulty,
      topicId: q.questions.topicId,
      userSelected: answer?.selected ?? null,
      correct: answer?.correct ?? q.questions.correctAns,
      isCorrect:
        answer?.selected === (answer?.correct ?? q.questions.correctAns),
    };
  });

  return {
    ...quiz,
    questions,
    correctQuestions: quiz.correct.map((q) => q.questionId),
    wrongQuestions: quiz.wrong.map((q) => q.questionId),
    attemptedQuestions: quiz.attempted.map((q) => q.questionId),
  };
};

const getTopics = async () => {
  const topics = await prisma.topic.findMany();
  return topics;
};

const getCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

const getTopicsByCategoryId = async (categoryId: string) => {
  const topics = await prisma.topic.findMany({
    where: { categoryId },
  });
  return topics;
};

export const quizService = {
  generateQuiz,
  submitQuiz,
  getAllUserQuizzes,
  getUserQuizById,
  getTopics,
  getCategories,
  getTopicsByCategoryId,
};
