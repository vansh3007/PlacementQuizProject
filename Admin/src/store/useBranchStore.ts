import { create } from "zustand";
import api from "@/utils/api";
import { toast } from "sonner";

// ✅ Updated interface to include both fields
interface Branch {
  id: string;
  key: string;
  branch: string;
}

// Form values structure
interface FormValues {
  key: string;
  branchName: string;
}

export const useBranchStore = create<{
  branches: Branch[];
  allBranches: () => Promise<void>;
  createBranch: (data: FormValues) => Promise<boolean>;
  updateBranch: (id: string, data: FormValues) => Promise<boolean>;
  deleteBranch: (id: string) => Promise<boolean>;
}>((set) => ({
  branches: [],
 
  allBranches: async () => {
    try {
        const response = await api.get<{ branches: Branch[] }>("/branch");

      if (response.data) {
        set({ branches: response.data.branches });
      } else {
        toast.error("Failed to fetch branches");
      }
    } catch {
      toast.error("Internal server error");
    }
  },

  createBranch: async (data) => {
    try {
      const response = await api.post<{ success: boolean }>(
        "/branch/newbranch",
        {
          key: data.key,
          branch: data.branchName,
        }
      );

      if (response.data?.success) {
        toast.success("Branch created successfully");
        await useBranchStore.getState().allBranches(); // refresh
        return true;
      } else {
        toast.error("Failed to create branch");
        return false;
      }
    } catch (err) {
      console.error(err);
      toast.error("Internal server error");
      return false;
    }
  },

  updateBranch: async (id, data) => {
    try {
      const response = await api.patch<{ success: boolean }>(`/branch/${id}`, {
        key: data.key,
        branch: data.branchName,
      });

      if (response.data?.success) {
        toast.success("Branch updated successfully");
        await useBranchStore.getState().allBranches();
        return true;
      } else {
        toast.error("Failed to update branch");
        return false;
      }
    } catch (err) {
      console.error(err);
      toast.error("Internal server error");
      return false;
    }
  },

  deleteBranch: async (id) => {
    try {
      const response = await api.delete<{ success: boolean }>(`/branch/${id}`);
      if (response.data?.success) {
        toast.success("Branch deleted successfully");
        await useBranchStore.getState().allBranches();
        return true;
      } else {
        toast.error("Failed to delete branch");
        return false;
      }
    } catch (err) {
      console.error(err);
      toast.error("Internal server error");
      return false;
    }
  },
}));
