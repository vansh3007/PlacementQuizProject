interface Question {
  id: number;
}

interface Props {
  questions: Question[];
  currentIndex: number;
  questionResults: { isCorrect: boolean }[];
  setCurrentIndex: (index: number) => void;
}

const SidePanel: React.FC<Props> = ({
  questions,
  currentIndex,
  questionResults,
  setCurrentIndex,
}) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 w-full md:w-72">
      <h3 className="font-semibold text-lg text-center mb-4 text-gray-800">
        Review Questions
      </h3>
      <div className="grid grid-cols-6 sm:grid-cols-5 md:grid-cols-4 gap-2 justify-center">
        {questions.map((_, i) => {
          const correct = questionResults[i].isCorrect;
          let base = correct ? "bg-green-500" : "bg-red-500";
          if (i === currentIndex) base += " ring-2 ring-yellow-400";

          return (
            <button
              key={i}
              className={`w-9 h-9 rounded-full text-sm font-semibold text-white ${base}`}
              onClick={() => setCurrentIndex(i)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="text-xs text-gray-600 mt-4 space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />{" "}
          Correct
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full inline-block" />{" "}
          Incorrect
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 border-2 border-yellow-400 rounded-full inline-block" />{" "}
          Current
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
