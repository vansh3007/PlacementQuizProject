"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import type { Question } from "./QuestionsTable";
import { useQuestionStore } from "@/store/useQuestionStore";

export interface DeleteQuestionsProp {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  question: Question;
}

const DeleteDialog = ({
  isOpen,
  onClose,
  onConfirm,
  question,
}: DeleteQuestionsProp) => {
  const loading = useQuestionStore((s) => s.loading);
  if (!question) return null;

  return (
 <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="sm:max-w-md rounded-2xl shadow-lg">
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold text-destructive">
        Confirm Deletion
      </DialogTitle>
    </DialogHeader>

    <div className="mb-4 text-sm text-muted-foreground">
      Are you sure you want to permanently delete this question?
      <div className="mt-3 p-3 bg-muted rounded-md text-foreground border border-border">
        {question.question.length > 120
          ? question.question.slice(0, 120) + "..."
          : question.question}
      </div>
    </div>

    <DialogFooter>
      <Button variant="outline" onClick={onClose} disabled={loading}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={onConfirm} disabled={loading}>
        {loading ? (
          <div className="flex items-center gap-2">
            <ClipLoader color="white" loading={true} size={20} />
            Deleting...
          </div>
        ) : (
          "Delete"
        )}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

  );
};

export default DeleteDialog;
