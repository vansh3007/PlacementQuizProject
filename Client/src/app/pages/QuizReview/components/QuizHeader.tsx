import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Props {
  category: string;
  topics: string;
  difficulty: string;
}

const QuizHeader: React.FC<Props> = ({ category, topics, difficulty }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md p-5 ">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Quiz Info */}
      <div className="pl-4 text-gray-800 text-sm ml-16 sm:text-base space-y-1 sm:ml-auto">
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
    </div>
  );
};

export default QuizHeader;
