interface Props {
  question: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
    selectedAnswer?: string | null;
  };
  onPrev: () => void;
  onNext: () => void;
  isLastQuestion: boolean;
  onFinish?: () => void;
}

const QuestionPanel: React.FC<Props> = ({
  question,
  onPrev,
  onNext,
  isLastQuestion,
  onFinish = () => {},
}) => {
  const {
    id,
    question: qText,
    options,
    correctAnswer,
    selectedAnswer,
  } = question;

  const renderOption = (option: string, index: number) => {
    const baseStyle = "p-3 rounded-2xl border-grey-200 transition-all flex items-center";
    let bg = "bg-gray-100 text-gray-800";

    if (option === correctAnswer) {
      bg = "bg-green-500 text-white border-green-600";
    } else if (selectedAnswer === option) {
      bg = "bg-red-500 text-white border-red-600";
    }

    return (

      <label key={index} className={`${baseStyle} ${bg} cursor-default gap-3`}>
        <span
          className={`w-4 h-4 flex items-center justify-center rounded-full border-2 ${
            selectedAnswer === option ? "border-blue-600" : "border-gray-400"
          }`}
        >
          {selectedAnswer === option && (
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
          )}
        </span>

        <span>{option}</span>
      </label>
    );
  };

  return (
    <div className="flex-1 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        Q{id}. {qText}
      </h2>

      <div className="space-y-3 mb-6">{options.map(renderOption)}</div>

      <div className="flex justify-between">
        <button
          onClick={onPrev}
          disabled={id === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={isLastQuestion ? onFinish : onNext}
          className={`px-4 py-2 rounded text-white ${
            isLastQuestion
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLastQuestion ? "Finish Review" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default QuestionPanel;
