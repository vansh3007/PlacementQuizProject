import QuizSkeleton from "@/components/skeleton/QuizSkeleton";
import { Input } from "@/components/ui/input";
import { useQuizStore } from "@/store/useQuizStore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// inside your component before render return


const Quiz = () => {
  const [step, setStep] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [questions, setQuestions] = useState(10);
  const [time, setTime] = useState(30);

  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [topicsMap, setTopicsMap] = useState<
    Record<string, { id: string; name: string }[]>
  >({});

  const createQuiz = useQuizStore((state) => state.createQuiz);
  const isCreatingQuiz = useQuizStore((state) => state.isCreatingQuiz);
  const getCategoryAndTopicsData = useQuizStore(
    (state) => state.getCategoryAndTopicsData
  );
  const categoryAndTopics = useQuizStore((state) => state.categoryAndTopics);

  const navigator = useNavigate();

  const toggleTopic = (topicId: string) => {
    setSelectedTopicIds((prev) =>
      prev.includes(topicId)
        ? prev.filter((t) => t !== topicId)
        : [...prev, topicId]
    );
  };

  useEffect(() => {
    getCategoryAndTopicsData();
  }, [getCategoryAndTopicsData]);

  useEffect(() => {
    if (categoryAndTopics) {
      const catMap: Record<string, string> = {};
      categoryAndTopics.category.forEach(([id, name]) => {
        catMap[id] = name;
      });
      setCategoryMap(catMap);

      const tempTopicMap: Record<string, { id: string; name: string }[]> = {};
      categoryAndTopics.topics.forEach(([id, topicName, categoryId]) => {
        if (!tempTopicMap[categoryId]) tempTopicMap[categoryId] = [];
        tempTopicMap[categoryId].push({ id, name: topicName });
      });
      setTopicsMap(tempTopicMap);
    }
  }, [categoryAndTopics]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Select a Category
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(categoryMap).map(([id, name]) => (
                <button
                  key={id}
                  className={`p-4 rounded-2xl text-lg font-semibold transition duration-300 border-2 ${
                    selectedCategoryId === id
                      ? "bg-blue-100 border-blue-500 text-blue-700 shadow-md"
                      : "border-gray-300 hover:bg-blue-50 text-gray-600"
                  }`}
                  onClick={() => {
                    setSelectedCategoryId(id);
                    setSelectedTopicIds([]); // reset topics if category changes
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Choose Topics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[200px] overflow-y-auto pr-2 scroll-smooth hide-scrollbar">
              {topicsMap[selectedCategoryId]?.map(({ id, name }) => (
                <label
                  key={id}
                  className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-gray-200 hover:shadow transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedTopicIds.includes(id)}
                    onChange={() => toggleTopic(id)}
                    className="accent-blue-600 rounded-full"
                  />
                  <span className="text-gray-700 font-medium">{name}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 pb-4 " style={{ paddingLeft: "1rem" }}>
            <h2 className="text-2xl font-semibold text-gray-800">
              Set Quiz Preferences
            </h2>

            {/* Difficulty Selector */}
            <div className="space-y-4">
              <label className="block text-gray-600 font-semibold mb-2">
                Difficulty
              </label>
              <div className="flex flex-wrap gap-3">
                {["Easy", "Medium", "Hard"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition border-2 ${
                      difficulty === level
                        ? "bg-blue-100 border-blue-500 text-blue-700 shadow"
                        : "border-gray-300 text-gray-600 hover:bg-blue-50"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Question & Time Inputs Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-gray-600 font-semibold mb-2">
                  Number of Questions (Max 30)
                </label>
                <Input
                  type="number"
                  value={questions === 0 ? "" : questions}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (!isNaN(val)) {
                      if (val > 30) setQuestions(30);
                      else setQuestions(val);
                    }
                  }}
                  onWheel={(e) => e.currentTarget.blur()}
                  onKeyDown={(e) => {
                    if (["ArrowUp", "ArrowDown"].includes(e.key))
                      e.preventDefault();
                  }}
                  className="rounded-full no-spinner border-gray-200"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>

              {/* Time Limit */}
              <div className="flex-1">
                <label className="block text-gray-600 font-semibold mb-2">
                  Time Limit (Max 120 minutes)
                </label>
                <Input
                  type="number"
                  value={time === 0 ? "" : time}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (!isNaN(val)) {
                      if (val > 120) setTime(120);
                      else setTime(val);
                    }
                  }}
                  onWheel={(e) => e.currentTarget.blur()}
                  onKeyDown={(e) => {
                    if (["ArrowUp", "ArrowDown"].includes(e.key))
                      e.preventDefault();
                  }}
                  className="rounded-full no-spinner border-gray-200"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!categoryAndTopics || Object.keys(categoryMap).length === 0) {
    return <QuizSkeleton />;
  }
  

  return (
    <div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-white p-4 overflow-hidden">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl flex flex-col p-6 sm:p-8 h-[calc(30rem)] space-y-4 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-blue-700">
          Start New Practice
        </h1>

        <div className="flex justify-between items-center relative pb-6">
          <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`relative z-10 w-9 h-9 flex items-center justify-center rounded-full font-bold text-sm transition ${
                step >= s
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto pr-1 scroll-smooth hide-scrollbar">
          {renderStep()}
        </div>

        <div className="flex justify-between pt-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 text-white bg-gray-400 hover:bg-gray-500 rounded-full transition font-medium"
            >
              Previous
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={
                !selectedCategoryId ||
                (step === 2 && selectedTopicIds.length === 0)
              }
              className={`ml-auto px-6 py-2 rounded-full font-medium transition ${
                !selectedCategoryId ||
                (step === 2 && selectedTopicIds.length === 0)
                  ? "bg-gray-300 cursor-not-allowed text-gray-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          ) : (
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition font-medium ml-auto"
                onClick={async () => {
            
                await createQuiz({
                  category: selectedCategoryId,
                  topics: selectedTopicIds,
                  difficulty,
                  totalQuestions: questions,
                  timeLimit: time,
                });
                navigator("/quiz/quizScreen");
              }}
              disabled={isCreatingQuiz}
            >
              {isCreatingQuiz ? "Starting..." : "Start Quiz"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz; 