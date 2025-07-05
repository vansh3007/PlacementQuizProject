import { create } from "zustand";
import axiosInstance from "../utils/clientApiInstace";

interface Quiz {
  questions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
  quizConfig: {
    category: string;
    difficulty: string;
    mode: "examMode";
    timeLimit: number;
    topics: string[];
    totalQuestions: number;
    userId: string;
  };
  userQuizId: string;
}
interface fetchQuiz {
  id: string;
  userId: string;
  category: string;
  topics: string[];
  difficulty: string;
  totalQuestions: number;
  mode: "examMode";
  timeLimit: number;
  createdAt: string;
  correctCount: number;
  wrongCount: number;
  questions: {
    id: string;
    questionId: string;
    userQuizId: string;
    questions: {
      id: string;
      question: string;
      options: {
        a: string;
        b: string;
        c: string;
        d: string;
      };
      correctAns: string;
      difficulty: string;
      topicId: string;
    };
  }[];
  quizQuestions: {
    id: string;
    questionId: string;
    userQuizId: string;
    questions: {
      id: string;
      question: string;
      options: {
        a: string;
        b: string;
        c: string;
        d: string;
      };
      correctAns: string;
      difficulty: string;
      topicId: string;
    };
  }[];
  score: number;
  timeTaken: number;
  attempted: {
    questionId: string;
  }[];
  attemptedQuestions: string[];
  correct: {
    questionId: string;
  }[];
  correctQuestions: string[];
  userAnswers: {
    questionId: string;
    selected: string;
    correct: string;
  }[];
  wrong: {
    questionId: string;
  }[];
  wrongQuestions: string[];
};

interface CategoryAndTopics{
  category: string[][];
  topics: string[][];
}
  


interface QuizStore {
  createQuizState: Quiz | null;
  fetchQuizState: fetchQuiz | null;
  quizList: fetchQuiz[] | null;
  categoryAndTopics: CategoryAndTopics | null;
  userQuizId: string | null;
  isCheckingQuiz: boolean;
  isCreatingQuiz: boolean;
  isUpdatingQuiz: boolean;
  isDeletingQuiz: boolean;
  isQuizStarted: boolean;
  isQuizCompleted: boolean;
  error: string | null;
  createQuiz: (quizData: CreateQuizData) => Promise<void>;
  updateQuiz: (quizData: AnswerSubmission) => Promise<void>;
  fetchQuiz: (quizId: string) => Promise<void>;
  getAllQuizzes: () => Promise<void>;
  getCategoryAndTopicsData: () => Promise<void>;
  theme: string;
  setTheme: (newTheme: string) => void;
}
interface CreateQuizData {
  category: string;
  topics: string[];
  difficulty: string;
  totalQuestions: number;
  timeLimit: number;
}

interface AnswerSubmission {
  category: string;
  topics: string[];
  difficulty: string;
  totalQuestions: number;
  timeLimit: number;
  mode: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
  timeTaken: number;
  answers: {
    questionId: string;
    selectedAnswer: string;
  }[];
}


export const useQuizStore = create<QuizStore>((set) => ({
  createQuizState: null,
  fetchQuizState: null,
  categoryAndTopics: null,
  quizList: null,
  userQuizId: null,
  isCheckingQuiz: true,
  isCreatingQuiz: false,
  isUpdatingQuiz: false,
  isDeletingQuiz: false,
  isQuizStarted: false,
  isQuizCompleted: false,
  error: null,

  createQuiz: async (quizData: CreateQuizData) => {
    set({ isCreatingQuiz: true, error: null });
    try {
      const queryParams = new URLSearchParams({
        categoryId: quizData.category,
        topicsId: quizData.topics.join(","),
        difficulty: quizData.difficulty,
        totalQuestions: quizData.totalQuestions.toString(),
        timeLimit: quizData.timeLimit.toString(),
        mode: "examMode",
      }).toString();

      const response = await axiosInstance.get(`/quiz/newquiz?${queryParams}`);

      set({
        createQuizState: response.data.data,
        isCreatingQuiz: false,
      });
    } catch (error) {
      let errorMessage = "Failed to create quiz";
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        errorMessage =
          (error.response as { data: { message?: string } }).data.message ||
          errorMessage;
      }
      set({
        isCreatingQuiz: false,
        error: errorMessage,
      });
    }
  },

  updateQuiz: async (quizData: AnswerSubmission) => {
    set({ isUpdatingQuiz: true, error: null });
    try {
      const response = await axiosInstance.post(`/quiz/submit`, quizData);

      if (response?.data?.message === "quiz submitted") {
        const userQuizId = response.data.result.userQuizId;

        set({
          fetchQuizState: response.data.result,
          isUpdatingQuiz: false,
          isQuizCompleted: true,
        });

        return userQuizId; 
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      set({ isUpdatingQuiz: false });

      let errorMessage = "Failed to update quiz";
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        errorMessage =
          (error.response as { data: { message?: string } }).data.message ||
          errorMessage;
      }

      set({ error: errorMessage });
      return null; // ❌ failed submission
    }
  },

  fetchQuiz: async (quizId: string) => {
    set({ isCheckingQuiz: true, error: null });
    try {
      const response = await axiosInstance.get(`/quiz/${quizId}`);
  

      set({
        fetchQuizState: response.data.quiz,
        isCheckingQuiz: false,
      });
    } catch (error) {
      let errorMessage = "Failed to fetch quiz";
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        errorMessage =
          (error.response as { data: { message?: string } }).data.message ||
          errorMessage;
      }
      set({
        isCheckingQuiz: false,
        error: errorMessage,
      });
    }
  },

  getAllQuizzes: async () => {
    set({ isCheckingQuiz: true, error: null });
    try {
      const response = await axiosInstance.get(`/quiz/userQuiz`);
      set({
        quizList: response.data.quizzes,
        isCheckingQuiz: false,
      });
    } catch (error) {
      let errorMessage = "Failed to fetch quizzes";
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        errorMessage =
          (error.response as { data: { message?: string } }).data.message ||
          errorMessage;
      }
      set({
        isCheckingQuiz: false,
        error: errorMessage,
      });
    }
  },

  getCategoryAndTopicsData: async () => {
    set({ isCheckingQuiz: true, error: null });
    try {
      const categoryRes = await axiosInstance.get(`/quiz/categories`);
      const topicsRes = await axiosInstance.get(`/quiz/topics`);

      const categoriesRaw = categoryRes.data.categories; // ✅ fix path
      const topicsRaw = topicsRes.data.topics; // ✅ fix path

      const categoryList: string[][] = categoriesRaw.map(
        (cat: { id: string; name: string }) => [cat.id, cat.name]
      );

      const topicsList: string[][] = topicsRaw.map(
        (topic: { id: string; name: string; categoryId: string }) => [
          topic.id,
          topic.name,
          topic.categoryId,
        ]
      );

      set({
        categoryAndTopics: {
          category: categoryList,
          topics: topicsList,
        },
        isCheckingQuiz: false,
      });
    } catch {
      set({
        isCheckingQuiz: false,
        error: "Failed to fetch category and topics data",
      });
    }
  },
  theme: localStorage.getItem("theme") || "light",
  setTheme: (newTheme: string) => {
    localStorage.setItem("theme", newTheme);
    set({ theme: newTheme });
  },
}));

