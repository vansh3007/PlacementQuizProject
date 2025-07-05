"use client";

import {
  Dialog,
//   DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useQuestionStore } from "@/store/useQuestionStore";
import { ClipLoader } from "react-spinners";
// import { Upload } from "lucide-react";

export interface CreateQuestionsProp {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateQuestions = ({ isOpen, onClose }: CreateQuestionsProp) => {
  const [file, setFile] = useState<File | null>(null);

  const createQuestionsFromExcel = useQuestionStore(
    (s) => s.createQuestionsFromExcel
  );
  const loading = useQuestionStore((s) => s.loading);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile); 
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an Excel file first.");
      return;
    }
    
  
    await createQuestionsFromExcel(file);
    onClose();
    setFile(null);
    

    
  };

  return (
  <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="sm:max-w-md rounded-2xl shadow-lg">
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold">
        Upload Excel File
      </DialogTitle>
      <DialogDescription className="text-muted-foreground text-sm">
        Upload a `.xlsx` or `.xls` file to add multiple questions at once.
      </DialogDescription>
    </DialogHeader>

    <div className="space-y-3">
      <Input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="cursor-pointer"
      />

      {file && (
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Selected File:</span>{" "}
          {file.name}
        </div>
      )}
    </div>

    <DialogFooter className="pt-4">
      <Button
        onClick={handleUpload}
        disabled={loading}
        className="w-full sm:w-auto"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <ClipLoader color="white" loading={true} size={20} />
            Uploading...
          </div>
        ) : (
          "Upload"
        )}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

  );
};

export default CreateQuestions;
