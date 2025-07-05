import React from "react";
import { X } from "lucide-react";

interface InstructionPopupProps {
  onClose: () => void;
}

const InstructionPopup: React.FC<InstructionPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="relative px-8 py-5 border-b border-gray-200 rounded-t-2xl">
          <h1 className="text-2xl md:text-3xl font-extrabold text-center text-blue-700">
            General Instructions
          </h1>
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-gray-500 hover:text-red-600 focus:outline-none"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Instruction Content */}
        <div className="max-h-[60vh] px-8 sm:px-10 py-6 overflow-y-auto scroll-smooth hide-scrollbar">
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
                <strong> No negative marking</strong>
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
      </div>
    </div>
  );
};

export default InstructionPopup;
