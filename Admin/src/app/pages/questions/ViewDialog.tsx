"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Question } from "./QuestionsTable";

export interface ViewQuestionsProp {
  isOpen: boolean;
  onClose: () => void;
  data: {
    question: Question; 
    correctAns: string;
  };
}

const ViewDialog = ({ isOpen, onClose, data }: ViewQuestionsProp) => {

  const correctAnswer = data.correctAns;

  const question = data.question;

  return (
  <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="sm:max-w-lg rounded-2xl">
    <DialogHeader>
      <DialogTitle className="text-lg font-semibold">Detailed Question</DialogTitle>
    </DialogHeader>

    <div className="space-y-4 mt-2">
      <div className="bg-muted p-4 rounded-lg text-base font-medium">
        {question.question}
      </div>

      <div className="space-y-2">
        {Object.entries(question.options).map(([key, value]) => {
          const isCorrect =
            key.toLowerCase() === correctAnswer.toLowerCase();
          return (
            <div
              key={key}
              className={`flex items-start gap-2 text-sm p-2 rounded-md ${
                isCorrect
                  ? "bg-green-50 text-green-700 font-semibold border border-green-300"
                  : "bg-muted/40"
              }`}
            >
              <span className="font-mono text-muted-foreground">
                {key.toUpperCase()}.
              </span>
              <span>{value}</span>
            </div>
          );
        })}
      </div>

      <div className="pt-2 text-sm">
        <span className="font-medium">Correct Answer: </span>
        <span className="text-green-600 uppercase">
          {correctAnswer.toLowerCase()}
        </span>
      </div>
    </div>
  </DialogContent>
</Dialog>

  );
};

export default ViewDialog;
