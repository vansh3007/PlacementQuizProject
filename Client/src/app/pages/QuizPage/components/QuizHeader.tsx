// src/app/pages/QuizPage/components/QuizHeader.tsx
import React from "react";

interface Props {
  category: string;
  topics: string;
  difficulty: string;
  remainingTime: number;
  onViewInstructions: () => void;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

const QuizHeader: React.FC<Props> = ({
  category,
  topics,
  difficulty,
  remainingTime,
  onViewInstructions,
}) => {

 
  return (
    <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded shadow-md">
      <div className="text-sm">
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Topics:</strong> {topics}
        </p>
        <p>
          <strong>Difficulty:</strong> {difficulty}
        </p>
      </div>
      <div className="text-center">
        <p className="text-sm">
          <strong>Time Remaining:</strong> {formatTime(remainingTime)}
        </p>

        <button
          className="text-blue-500 underline text-sm mt-2"
          onClick={onViewInstructions}
        >
          View Instructions
        </button>
      </div>
    </div>
  );
};

export default QuizHeader;
