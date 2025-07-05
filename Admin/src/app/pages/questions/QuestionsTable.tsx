"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, MoreHorizontal, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import CreateQuestions from "./CreateQuestions";
import { toast } from "sonner";
import ViewDialog from "./ViewDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import CustomPagination from "@/components/shared/CustomPagination";
import { useQuestionStore } from "@/store/useQuestionStore";

export interface Topic {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
  };
}

export interface Question {
  id: string;
  subject?: string;
  topic: Topic;
  question: string;
  options: Record<string, string>;
  correctAns: string;
  difficulty: string;
  topicId: string;
}

const ROWS_PER_PAGE = 10;

const QuestionsTable = () => {
  const fetchQuestions = useQuestionStore((s) => s.fetchQuestions);
  const updateQuestion = useQuestionStore((s) => s.updateQuestion);
  const deleteQuestion = useQuestionStore((s) => s.deleteQuestion);
  const data = useQuestionStore((s) => s.questions);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [delayPassed, setDelayPassed] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDelayPassed(true);
    }, 3000); // Delay for toast

    fetchQuestions()
      .finally(() => {
        setLoading(false);
        clearTimeout(timeoutId);
      });
  }, [fetchQuestions]);

  useEffect(() => {
    if (!loading && data.length === 0 && delayPassed) {
      toast.info("No questions available. Please upload some.");
    } else {
      toast.dismiss();
    }
  }, [loading, data, delayPassed]);

  const getOption = (options: Record<string, string>, key: string) => {
    const lowerKey = key.toLowerCase();
    const upperKey = key.toUpperCase();
    return options[lowerKey] ?? options[upperKey] ?? "-";
  };

  const filteredQuestions = data.filter(
    (q) =>
      q.topic?.category?.name?.toLowerCase().includes(filter.toLowerCase()) ||
      q.topic?.name?.toLowerCase().includes(filter.toLowerCase()) ||
      q.question?.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuestions.length / ROWS_PER_PAGE);
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handleUpdate = (updatedQuestion: Question, id: string) => {
    updateQuestion(id, updatedQuestion)
      .then(() => {
        toast.success("Question updated successfully");
        fetchQuestions();
        setEditOpen(false);
      })
      .catch((error) => {
        console.error("Error updating question:", error);
        toast.error("Failed to update question");
      });
  };

  const handleDelete = (id: string) => {
    deleteQuestion(id)
      .then(() => {
        toast.success("Question deleted successfully");
        fetchQuestions();
        setDeleteOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
        toast.error("Failed to delete question");
      });
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header: Search + New Question */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Input
          placeholder="Search questions..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-1/2 rounded-xl"
        />
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="w-full sm:w-auto rounded-xl shadow"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Question
        </Button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh] w-full">
          <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
        </div>
      ) : (
        <>
          {/* Questions Table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <Table>
              <TableCaption className="text-sm text-muted-foreground p-2">
                Full list of uploaded questions
              </TableCaption>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="text-center w-12">#</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Option A</TableHead>
                  <TableHead>Option B</TableHead>
                  <TableHead>Option C</TableHead>
                  <TableHead>Option D</TableHead>
                  <TableHead>Correct</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedQuestions.length > 0 ? (
                  paginatedQuestions.map((q, index) => (
                    <TableRow
                      key={q.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <TableCell className="text-center font-medium">
                        {(currentPage - 1) * ROWS_PER_PAGE + index + 1}
                      </TableCell>
                      <TableCell>{q.topic?.name || "-"}</TableCell>
                      <TableCell title={q.question}>
                        {q.question.length > 40
                          ? `${q.question.substring(0, 40)}...`
                          : q.question}
                      </TableCell>
                      <TableCell>{getOption(q.options, "a")}</TableCell>
                      <TableCell>{getOption(q.options, "b")}</TableCell>
                      <TableCell>{getOption(q.options, "c")}</TableCell>
                      <TableCell>{getOption(q.options, "d")}</TableCell>
                      <TableCell className="font-semibold text-green-600">
                        {q.correctAns || "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-36">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedQuestion(q);
                                setViewOpen(true);
                              }}
                            >
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedQuestion(q);
                                setEditOpen(true);
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setSelectedQuestion(q);
                                setDeleteOpen(true);
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6 text-gray-500">
                      No questions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}

      {/* Dialogs */}
      <CreateQuestions
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={() => {
          toast.success("Questions uploaded successfully");
          fetchQuestions();
        }}
      />

      {selectedQuestion && (
        <ViewDialog
          isOpen={viewOpen}
          onClose={() => setViewOpen(false)}
          data={{
            question: selectedQuestion,
            correctAns: selectedQuestion.correctAns,
          }}
        />
      )}

      {selectedQuestion && (
        <EditDialog
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          question={selectedQuestion}
          onSave={(updatedQuestion) => {
            handleUpdate(updatedQuestion, selectedQuestion.id);
          }}
        />
      )}

      {selectedQuestion && (
        <DeleteDialog
          isOpen={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          question={selectedQuestion}
          onConfirm={() => handleDelete(selectedQuestion.id)}
        />
      )}
    </div>
  );
};

export default QuestionsTable;
