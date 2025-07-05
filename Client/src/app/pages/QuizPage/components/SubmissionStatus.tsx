// src/app/pages/QuizPage/components/SubmissionStatus.tsx
import React from "react";
import { Loader, X } from "lucide-react";


interface SubmissionStatusProps {
  answered: number;
  reviewed: number;
  total: number;
  onConfirmSubmit: () => void;
  onClose: () => void;
  loading: boolean
}

const SubmissionStatus: React.FC<SubmissionStatusProps> = ({
  loading,
  answered,
  reviewed,
  total,
  onConfirmSubmit,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-md p-8 max-w-lg w-full text-center relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Confirm Submission</h2>
        <p className="mb-6 text-gray-600">Here is your attempt summary:</p>
        <ul className="mb-6 text-left list-disc pl-8 text-sm">
          <li>Total Questions: {total}</li>
          <li>Answered: {answered}</li>
          <li>Marked for Review: {reviewed}</li>
          <li>Skipped/Unvisited: {total - answered - reviewed}</li>
        </ul>
        <button
          onClick={onConfirmSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="animate-spin w-4 h-4" />
              Submitting...
            </>
          ) : (
            "Submit & View Analysis"
          )}
        </button>
      </div>
    </div>
  );
};

export default SubmissionStatus;
