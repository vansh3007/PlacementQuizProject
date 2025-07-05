"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import  { useState, useEffect } from "react";
import type { Question } from "./QuestionsTable";

export interface EditQuestionsProp {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Question) => void;
  question: Question;
}

const EditDialog = ({
  isOpen,
  onClose,
  question,
  onSave,
}: EditQuestionsProp) => {
  const normalizeOptions = (opts: Question["options"]) => {
    const keys = ["A", "B", "C", "D"];
    const entries = keys.map((k) => [k, opts[k] || opts[k.toLowerCase()] || ""]);
    return Object.fromEntries(entries) as Record<"A" | "B" | "C" | "D", string>;
  };

  const [editedQuestion, setEditedQuestion] = useState<string>(question.question);
  const [options, setOptions] = useState<Record<"A" | "B" | "C" | "D", string>>(
    normalizeOptions(question.options)
  );
  const [correctAnswer, setCorrectAnswer] = useState<string>(
    question.correctAns
  );

  useEffect(() => {
    setEditedQuestion(question.question);
    setOptions(normalizeOptions(question.options));
    setCorrectAnswer(question.correctAns);
  }, [question]);

  const handleSave = () => {
    const updated= {
      ...question,
      question: editedQuestion,
      options,
      correctAns: correctAnswer,
    };
    onSave(updated);
    onClose();
  };

  return (
<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="sm:max-w-lg rounded-2xl">
    <DialogHeader>
      <DialogTitle className="text-lg font-semibold">Edit Question</DialogTitle>
    </DialogHeader>

    <div className="space-y-4 mt-2">
      <div>
        <label className="text-sm font-medium text-muted-foreground block mb-1">
          Question
        </label>
        <Input
          value={editedQuestion}
          onChange={(e) => setEditedQuestion(e.target.value)}
          placeholder="Edit question"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground block mb-2">
          Options (Select the correct one)
        </label>
        <div className="grid gap-3">
          {(["A", "B", "C", "D"] as const).map((key) => (
            <div
              key={key}
              className="flex items-center gap-3 bg-muted p-2 rounded-md border"
            >
              <span className="font-bold text-sm w-4">{key}</span>
              <Input
                value={options[key]}
                onChange={(e) =>
                  setOptions({ ...options, [key]: e.target.value })
                }
                placeholder={`Option ${key}`}
                className="flex-1"
              />
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  name="correctAns"
                  checked={
                    correctAnswer.toLowerCase() === options[key].toLowerCase()
                  }
                  value={key}
                  onChange={() => setCorrectAnswer(options[key])}
                  className="accent-primary"
                />
                <span className="text-xs text-muted-foreground">Correct</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <DialogFooter className="mt-4">
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={handleSave}>Save Changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

  );
};

export default EditDialog;
