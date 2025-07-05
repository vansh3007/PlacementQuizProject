import React from "react";
import { useNavigate } from "react-router-dom";

interface InstructionPageProps {
  setShowInstruction: (show: boolean) => void;
  setSecurity: (show: boolean) => void;
}

const InstructionPage: React.FC<InstructionPageProps> = ({
  setShowInstruction,
  setSecurity,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-4xl mx-auto h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-8 py-5  border-b border-gray-200 rounded-t-2xl">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center text-blue-700">
          General Instructions
        </h1>
      </div>

      {/* Instruction Content */}
      <div className="flex-1 px-8 sm:px-10 py-6 overflow-y-auto scroll-smooth hide-scrollbar">
        <div className="text-gray-800 space-y-5 text-[15px] leading-relaxed">
          <p className="font-semibold text-lg">
            Please read the instructions carefully:
          </p>
          <ol className="list-decimal list-inside space-y-4">
            <li>
              There is only <strong>one correct response</strong> for each
              question.
            </li>
            <li>
              <strong>1 mark</strong> will be awarded for each correct answer.
              <strong>No negative marking</strong> 
            </li>
            <li>
              Once the quiz starts, you will enter{" "}
              <strong>fullscreen mode</strong>. Exiting fullscreen is not
              allowed.
            </li>
            <li>
              <strong>Back navigation</strong> is disabled during the quiz.
            </li>
            <li>
              <strong>Right-click</strong> is disabled. You won’t be able to
              open the context menu.
            </li>
            <li>
              <strong>Tab switching is strictly prohibited.</strong> Switching
              tabs more than once will auto-submit your quiz.
            </li>
          </ol>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center px-6 py-5  border-t border-gray-200 rounded-b-3xl">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 text-sm md:text-base bg-gray-300 text-gray-800 font-medium rounded-full hover:bg-gray-400 transition"
        >
          ← Back
        </button>
        <button
          onClick={() => {
            setShowInstruction(false);
            setSecurity(true);
          }}
          className="px-6 py-2 text-sm md:text-base bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
        >
          Start Quiz →
        </button>
      </div>
    </div>
  );
};

export default InstructionPage;
