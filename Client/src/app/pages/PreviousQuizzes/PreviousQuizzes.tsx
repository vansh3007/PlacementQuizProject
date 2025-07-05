import { NavLink } from "react-router-dom";
import { useQuizStore } from "@/store/useQuizStore";
import { useEffect } from "react";
import { Clock, HelpCircle, Star, CheckCircle2, ListTodo } from "lucide-react";
import { SkeletonPreviousQuizzes } from "@/components/skeleton/SkeletonPreviousQuizzes";


const PreviousQuizzes = () => {
  const getQuizList = useQuizStore((state) => state.getAllQuizzes);
  const quizData = useQuizStore((state) => state.quizList);
  const loading = useQuizStore((state) => state.isCheckingQuiz);

  useEffect(() => {
    if (!quizData) {
      getQuizList();
    }
  }, [quizData, getQuizList]);

  if (loading) {
    return (
      <SkeletonPreviousQuizzes />
    )
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
        <ListTodo className="text-blue-600 w-6 h-6" />
        Recent Quizzes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {quizData?.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col justify-between min-h-[260px]"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {quiz.category}
              </h3>

              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Clock className="text-blue-500 w-4 h-4" />
                  {quiz.timeLimit ?? 0} Minutes
                </p>
                <p className="flex items-center gap-2">
                  <HelpCircle className="text-purple-500 w-4 h-4" />
                  {quiz.totalQuestions} Questions
                </p>
                <p className="flex items-center gap-2">
                  <Star className="text-yellow-500 w-4 h-4" />
                  Difficulty: {quiz.difficulty}
                </p>
                <p>
                  <span className="font-medium">Topics:</span>{" "}
                  {quiz.topics?.length > 0
                    ? `${quiz.topics.slice(0, 2).join(", ")}${
                        quiz.topics.length > 2 ? "......" : ""
                      }`
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full font-medium flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Score: {Math.round(quiz.score ?? 0)}%
              </span>

              <NavLink
                to={`/quiz/${quiz.id}/analysis`}
                className="text-sm px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
              >
                View 
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default PreviousQuizzes;
