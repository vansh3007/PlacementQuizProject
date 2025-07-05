import React from "react";

interface Props {
  question: {
    id: string;
    question: string;
    options: string[];
  };
  selectedOption: string | null;
  onOptionChange: (value: string) => void;
  onClear: () => void;
  onNext: () => void;
  onSaveMarkForReview: () => void;
  setShowSummary: (value: boolean) => void;
}

const QuestionPanel: React.FC<Props> = ({
  question,
  selectedOption,
  onOptionChange,
  onClear,
  onNext,
  onSaveMarkForReview,
  setShowSummary,
}) => {

  

  const renderOption = (value: string) => (
    <label
      key={value}
      className="block p-3 rounded cursor-pointer bg-gray-100 hover:bg-gray-200"
    >
      <input
        type="radio"
        name={`question-${question.id}`}
        value={value}
        checked={selectedOption === value}
        onChange={() => onOptionChange(value)}
        className="mr-2"
      />
      {value}
    </label>
  );

  return (
    <div className="flex-1 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Q. {question.question}</h2>

      <div className="space-y-3 mb-4">{question.options.map(renderOption)}</div>

      <div className="flex flex-wrap gap-3 mt-4 items-center">
        <button
          onClick={onClear}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Clear
        </button>
        <button
          onClick={onSaveMarkForReview}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Save & Mark for Review
        </button>
        <button
          onClick={onNext}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save & Next
        </button>
        <button
          onClick={() => setShowSummary(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-auto"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default QuestionPanel;
