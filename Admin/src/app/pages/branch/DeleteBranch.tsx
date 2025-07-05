"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBranchStore } from "@/store/useBranchStore";
import { useState } from "react";

interface Branch {
  id: string;
  key: string;
  branch: string; // ✅ Corrected from `branchName`
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  branch: Branch | null;
}

const DeleteBranch = ({ isOpen, onClose, branch }: Props) => {
    const { deleteBranch } = useBranchStore((state) => state);
    const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
      if (!branch) return;
    setLoading(true);
      const success = await deleteBranch(branch.id);
    setLoading(false);
    if (success) {
      onClose();
      
    } 
  };

  if (!branch) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Confirm Deletion
          </DialogTitle>
        </DialogHeader>

        <div className="text-sm text-muted-foreground">
          Are you sure you want to delete the branch{" "}
          <span className="text-foreground font-medium">{branch.branch}</span>{" "}
          (key: <span className="font-medium">{branch.key}</span>)? This action
          cannot be undone.
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBranch;
