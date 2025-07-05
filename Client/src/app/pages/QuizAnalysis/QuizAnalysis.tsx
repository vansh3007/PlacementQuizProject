import React, { useEffect, useMemo } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaBullseye,
  FaClock,
} from "react-icons/fa";
import ProgressBar from "./components/ProgressBar";
import { useNavigate, useParams } from "react-router-dom";
import { useQuizStore } from "@/store/useQuizStore";
import { Button } from "@/components/ui/button";
import { BarChart4 } from "lucide-react";
import QuizAnalysisSkeleton from "@/components/skeleton/QuizAnalysisSkeleton";

const QuizAnalysis: React.FC = () => {
  const { id } = useParams();
  const quizId = id;
  const fetchQuiz = useQuizStore((state) => state.fetchQuiz);
  const quizData = useQuizStore((state) => state.fetchQuizState);
  const isLoading = useQuizStore((state) => state.isCheckingQuiz);

  const navigate = useNavigate();

  useEffect(() => {
    if (quizId) {
      fetchQuiz(quizId);
    }
  }, [quizId]);

  const handleReview = () => {
    navigate(`/quiz/${quizId}/review`);
  };

  const correctCount = useMemo(
    () => Object.keys(quizData?.correct || {}).length,
    [quizData?.correct]
  );

  const wrongCount = useMemo(
    () => Object.keys(quizData?.wrong || {}).length,
    [quizData?.wrong]
  );

  const accuracy = useMemo(() => {
    const total = quizData?.totalQuestions || 1;
    return (correctCount / total) * 100;
  }, [correctCount, quizData?.totalQuestions]);

  if (isLoading || !quizData || Object.keys(quizData).length === 0) {
    return <QuizAnalysisSkeleton />;
  }
  

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-white px-4 py-8 font-sans text-gray-800">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-800 mb-1">
              {quizData?.category}
            </h1>
            <p className="text-sm text-blue-600">
              {quizData?.totalQuestions} Questions • {quizData?.totalQuestions}{" "}
              Marks • {quizData?.timeLimit} Mins
            </p>
          </div>
          <Button
            onClick={handleReview}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-sm transition"
          >
            View Solutions
          </Button>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex gap-4 items-center" >
            <BarChart4 className="w-5 h-5 text-blue-700" /> Result Summary
          </h2>
          <img
            src="https://img.icons8.com/color/48/combo-chart--v1.png"
            alt="chart"
            className="w-6 h-6"
          />
        </div>

        <p className="text-5xl font-extrabold text-blue-700 mb-6">
          {correctCount}/{quizData?.totalQuestions}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <ProgressBar
            icon={<FaCheckCircle className="text-green-600" />}
            label="Correct"
            value={correctCount}
            max={quizData?.totalQuestions ?? 0}
          />
          <ProgressBar
            icon={<FaTimesCircle className="text-red-500" />}
            label="Incorrect"
            value={wrongCount}
            max={quizData?.totalQuestions ?? 0}
          />
          <ProgressBar
            icon={<FaBullseye className="text-yellow-500" />}
            label="Accuracy"
            value={accuracy}
            max={100}
            percent
          />
          <ProgressBar
            icon={<FaClock className="text-blue-600" />}
            label="Time Taken"
            value={quizData?.timeTaken ?? 0}
            max={quizData?.timeLimit ?? 0}
            valueText={`${quizData?.timeTaken ?? 0} mins`}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizAnalysis;
