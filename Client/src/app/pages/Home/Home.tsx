import { NavLink } from "react-router-dom";
import { useQuizStore } from "@/store/useQuizStore";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const { getAllQuizzes, quizList } = useQuizStore((state) => state);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllQuizzes();
      setLoading(false);
    };
    fetchData();
  }, [getAllQuizzes]);

  const totalQuizzes = quizList?.length||0;
  const totalQuestions = quizList?.reduce(
    (sum, q) => sum + (q.totalQuestions || 0),
    0
  );
  const correctAnswers = quizList?.reduce(
    (sum, q) => sum + (q.correctCount || 0),
    0
  );
  const wrongAnswers = quizList?.reduce(
    (sum, q) => sum + (q.wrongCount || 0),
    0
  );
  const totalTime = quizList?.reduce((sum, q) => sum + (q.timeTaken || 0), 0);

  const avgTime = totalQuizzes
    ? ((totalTime ?? 0) / totalQuizzes).toFixed(1)
    : "0";
  const accuracy = totalQuestions
    ? (((correctAnswers ?? 0) / totalQuestions) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 sm:p-10 space-y-10">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Ready for a New Challenge?
        </h2>
        <p className="text-gray-500 text-lg mb-6">
          Sharpen your knowledge by taking a quiz or reviewing your past
          performances.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <NavLink
            to="/quiz"
            className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-full hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Start Quiz
          </NavLink>
          <NavLink
            to="/previousQuizzes"
            className="px-6 py-3 border-2 border-blue-600 text-blue-600 text-lg font-medium rounded-full hover:bg-blue-50 transition duration-300"
          >
            View Previous Quizzes
          </NavLink>
        </div>
      </div>

      {/* Practice Record Overview */}
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Your Practice Record
        </h3>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-200 p-6 bg-gray-100"
                >
                  <Skeleton className="h-5 w-2/3 mb-4 bg-gray-300 rounded" />
                  <Skeleton className="h-8 w-1/2 bg-gray-400 rounded items-center" />
                </div>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Total Quizzes",
                value: totalQuizzes,
                color: "text-indigo-600",
              },
              {
                title: "Accuracy",
                value: `${accuracy}%`,
                color: "text-blue-600",
              },
              {
                title: "Avg Time/Quiz",
                value: `${avgTime} min`,
                color: "text-purple-600",
              },
              {
                title: "Total Questions",
                value: totalQuestions,
                color: "text-blue-600",
              },
              {
                title: "Correct Answers",
                value: correctAnswers,
                color: "text-green-600",
              },
              {
                title: "Wrong Answers",
                value: wrongAnswers,
                color: "text-red-500",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition duration-300 bg-gray-50"
              >
                <h4 className="text-lg font-semibold text-gray-700">
                  {item.title}
                </h4>
                <p className={`text-2xl font-bold mt-2 ${item.color}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
