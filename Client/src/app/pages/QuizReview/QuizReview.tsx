import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import QuizHeader from "./components/QuizHeader";
import SidePanel from "./components/SidePanel";
import QuestionPanel from "./components/QuestionPanel";
import { useQuizStore } from "@/store/useQuizStore";
import QuizHeaderSkeleton from "@/components/skeleton/QuizHeaderSkeleton";
import QuestionPanelSkeleton from "@/components/skeleton/QuestionPanelSkeleton";
import SidePanelSkeleton from "@/components/skeleton/SidePanelSkeleton";

const ReviewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchQuiz = useQuizStore((state) => state.fetchQuiz);
  const fetchQuizData = useQuizStore((state) => state.fetchQuizState);

  useEffect(() => {
    if (id) fetchQuiz(id);
  }, [id]);

  if (!fetchQuizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-6">
        <QuizHeaderSkeleton />
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <QuestionPanelSkeleton />
          <SidePanelSkeleton />
        </div>
      </div>
    );
  }

  const { category, topics, difficulty, quizQuestions, userAnswers } =
    fetchQuizData;

  const userAnswerMap = userAnswers.reduce((acc, answer) => {
    acc[answer.questionId] = answer;
    return acc;
  }, {} as Record<string, { selected: string; correct: string }>);

  const questions = quizQuestions.map((q, index) => {
    const answer = userAnswerMap[q.questionId];
    return {
      id: index + 1,
      question: q.questions.question,
      options: Object.values(q.questions.options),
      correctAnswer: answer?.correct || "",
      selectedAnswer: answer?.selected || null,
    };
  });

  const currentQuestion = questions[currentIndex];

  const questionResults = questions.map((q) => ({
    isCorrect: q.selectedAnswer === q.correctAnswer,
  }));

  const handleFinish = () => {
    toast.success("Review completed!");
    navigate(-1);
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-6">
      <QuizHeader
        category={category}
        topics={topics.join(", ")}
        difficulty={difficulty}
      />
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <QuestionPanel
          question={currentQuestion}
          onPrev={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
          onNext={() =>
            setCurrentIndex((i) => Math.min(i + 1, questions.length - 1))
          }
          isLastQuestion={currentIndex === questions.length - 1}
          onFinish={handleFinish}
        />
        <SidePanel
          questions={questions}
          currentIndex={currentIndex}
          questionResults={questionResults}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </div>
  );
};

export default ReviewPage;
