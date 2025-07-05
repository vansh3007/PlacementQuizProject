import React from "react";

interface Question {
  id: string;
  question: string;
  options: string[];
}

interface Props {
  questions: Question[];
  currentIndex: number;
  questionStatus: string[];
  setCurrentIndex: (index: number) => void;
}

const SidePanel: React.FC<Props> = ({
  questions,
  currentIndex,
  questionStatus,
  setCurrentIndex,
}) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-md w-full md:w-72">
      <h3 className="font-semibold text-lg mb-4 text-center">
        Total Questions: {questions.length}
      </h3>
      <div className="grid grid-cols-6 gap-2">
        {questions.map((_, i) => {
          let colorClass = "bg-white border-gray-400 text-black";
          if (questionStatus[i] === "answered")
            colorClass = "bg-green-500 text-white";
          else if (questionStatus[i] === "savedAndMarkedForReview")
            colorClass = "bg-purple-600 text-white";
          else if (i === currentIndex) colorClass = "bg-orange-500 text-white";

          return (
            <button
              key={i}
              className={`w-8 h-8 rounded-full text-sm border ${colorClass}`}
              onClick={() => setCurrentIndex(i)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <div className="text-xs mt-4 space-y-1">
        <p>🟢 Answered</p>
        <p>🟣 Saved & Marked for Review</p>
        <p>🟠 Current Question</p>
        <p>⚪ Unvisited</p>
      </div>
    </div>
  );
};

export default SidePanel;
