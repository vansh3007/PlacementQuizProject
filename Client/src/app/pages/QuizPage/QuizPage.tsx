import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import QuizHeader from "./components/QuizHeader";
import QuestionPanel from "./components/QuestionPanel";
import SidePanel from "./components/SidePanel";
import InstructionModal from "./components/InstructionModal";
import InstructionPopup from "./components/InstructionPopup";
import SubmissionStatus from "./components/SubmissionStatus";
import SecurityAlert from "@/components/reusable/SecurityAlert";
import { useQuizStore } from "@/store/useQuizStore";
import {
  activateAllSecurityHooks,
  deactivateSecurityHooks,
} from "../../../utils/useQuizSecurity";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const QuizPage = () => {
  const navigate = useNavigate();
  const QuizData = useQuizStore((state) => state.createQuizState);
  const updateQuiz = useQuizStore((state) => state.updateQuiz);
  const [showInstruction, setShowInstruction] = useState(true);
  const questions = QuizData?.questions || [];
  const { category, topics, difficulty, timeLimit } =
    QuizData?.quizConfig || {};
  const [loading, setLoading] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [normalizedQuestions, setNormalizedQuestions] = useState(questions);

  useEffect(() => {
    const transformed = questions.map((q) => ({
      ...q,
      options: Object.values(q.options),
    }));
    setNormalizedQuestions(transformed);
  }, [questions]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(questions.length).fill(null)
  );
  const [questionStatus, setQuestionStatus] = useState<string[]>(
    Array(questions.length).fill("unvisited")
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [reEnterFullscreen, setReEnterFullscreen] = useState(false);
  const [security, setSecurity] = useState(false);

  const quizTimeInSeconds = (Number(timeLimit) || 30) * 60;
  const [remainingTime, setRemainingTime] = useState(quizTimeInSeconds);
  const [instructionPopUpOpen, setInstructionPopUpOpen] = useState(false);

  const handleFinalSubmit = async () => {
    deactivateSecurityHooks();
    localStorage.removeItem("switchAttempts");
    setLoading(true);

    const userQuizId = await updateQuiz({
      category: QuizData?.quizConfig.category ?? "",
      topics: QuizData?.quizConfig.topics ?? [],
      difficulty: QuizData?.quizConfig.difficulty ?? "EASY",
      totalQuestions: QuizData?.quizConfig.totalQuestions ?? 0,
      timeLimit: QuizData?.quizConfig.timeLimit ?? 30,
      mode: QuizData?.quizConfig.mode ?? "examMode",
      questions: QuizData?.questions ?? [],
      timeTaken: (quizTimeInSeconds - remainingTime) / 60,
      answers: answers.map((answer, index) => ({
        questionId: String(questions[index].id),
        selectedAnswer: answer || "",
      })),
    });

    setLoading(false);

    if (typeof userQuizId === "string") {
      toast.success("Quiz submitted successfully.");
      navigate(`/quiz/${userQuizId}/analysis`);
    } else {
      toast.error("Failed to submit quiz.");
    }
  };

  const handleLeaveConfirmed = () => {
    deactivateSecurityHooks();
    toast.warning("Quiz was exited before submission.");
    navigate("/");
  };

  useEffect(() => {
    if (security) {
      activateAllSecurityHooks();
      const el = document.documentElement;
      el.requestFullscreen?.();
      toast.success("Quiz started in secure fullscreen mode.");
    }
  }, [security]);

  useEffect(() => {
    if (!showInstruction && security) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            toast.error("Time's up! Submitting the quiz.");
            handleFinalSubmit();
            setShowSummary(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showInstruction, security]);

  useEffect(() => {
    setSelectedOption(answers[currentIndex]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex]);

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{
        message: string;
        fullscreen?: boolean;
      }>;
      const { message, fullscreen } = customEvent.detail;
      setAlertMessage(message);
      setReEnterFullscreen(!!fullscreen);
    };

    window.addEventListener("security-alert", handler);
    return () => window.removeEventListener("security-alert", handler);
  }, []);

  const handleNoOptionSelect = (message: string) => {
    if (!selectedOption) {
      setAlertMessage("Please select an option before proceeding.");
      return;
    }
    const updatedStatus = [...questionStatus];
    updatedStatus[currentIndex] = message;
    setQuestionStatus(updatedStatus);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const onClosePopUp = () => {
    setInstructionPopUpOpen(false);
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-white p-4 overflow-hidden md:overflow-auto md:p-6 hide-scrollbar">
      {showInstruction ? (
        <InstructionModal
          setShowInstruction={setShowInstruction}
          setSecurity={setSecurity}
        />
      ) : (
        <div>
          {instructionPopUpOpen && <InstructionPopup onClose={onClosePopUp} />}
          {alertMessage && (
            <SecurityAlert
              message={alertMessage}
              setSecurity={() => {
                setAlertMessage(null);

                if (reEnterFullscreen) {
                  const el = document.documentElement;
                  el.requestFullscreen?.();
                  setReEnterFullscreen(false);
                }

                const switchAttempts = Number(
                  localStorage.getItem("switchAttempts") || "0"
                );
                if (switchAttempts >= 3) {
                  toast.error(
                    "You switched tabs too many times. Quiz will now submit."
                  );
                  handleFinalSubmit();
                } else {
                  activateAllSecurityHooks();
                }
              }}
            />
          )}

          {/* Leave Quiz Button with Confirmation Dialog */}
          <div className="flex justify-end">
            <Dialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
              <DialogTrigger asChild>
                <Button
                 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => setShowLeaveDialog(true)}
                >
                  Leave Quiz
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md border border-gray-200 bg-white shadow-2xl rounded-2xl">
                <DialogHeader>
                  <DialogTitle>
                    Are you sure you want to leave the quiz?
                  </DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    className="bg-gray-600 hover:bg-gray-700 text-white rounded-2xl"
                    onClick={() => setShowLeaveDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white rounded-2xl"
                    onClick={handleLeaveConfirmed}
                  >
                    Confirm Leave
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <QuizHeader
            category={category ?? ""}
            topics={topics ? topics.join(", ") : ""}
            difficulty={difficulty ?? ""}
            remainingTime={remainingTime}
            onViewInstructions={() => setInstructionPopUpOpen(true)}
          />

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            {questions[currentIndex] && (
              <QuestionPanel
                question={normalizedQuestions[currentIndex]}
                selectedOption={selectedOption}
                onOptionChange={(value) => {
                  const updated = [...answers];
                  updated[currentIndex] = value;
                  setAnswers(updated);
                  setSelectedOption(value);
                }}
                onClear={() => {
                  const updated = [...answers];
                  updated[currentIndex] = null;
                  setAnswers(updated);
                  setSelectedOption(null);
                  const updatedStatus = [...questionStatus];
                  updatedStatus[currentIndex] = "unvisited";
                  setQuestionStatus(updatedStatus);
                }}
                onNext={() => handleNoOptionSelect("answered")}
                onSaveMarkForReview={() =>
                  handleNoOptionSelect("savedAndMarkedForReview")
                }
                setShowSummary={setShowSummary}
              />
            )}

            <SidePanel
              questions={normalizedQuestions}
              questionStatus={questionStatus}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </div>

          {showSummary && (
            <SubmissionStatus
              loading={loading}
              answered={questionStatus.filter((s) => s === "answered").length}
              reviewed={
                questionStatus.filter((s) => s === "savedAndMarkedForReview")
                  .length
              }
              total={questions.length}
              onConfirmSubmit={handleFinalSubmit}
              onClose={() => setShowSummary(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
