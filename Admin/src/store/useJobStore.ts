import api from "@/utils/api";
import { toast } from "sonner";
import { create } from "zustand";

interface Job {
  logo: string;
  title: string;
  companyName: string;
  Vacancies: string;
  package: string;
}

export const useJobStore = create((set) => ({
  jobs: [],
  logo: "",
  
  alljobs: async () => {
    try {
      const response = await api.get("/jobs");
    
      if (response.data.success) {
        set({ jobs: response.data.jobs });
      } else {
        toast.error("Failed to fetch jobs");
      }
    } catch {
      toast.error("Internal server error");
    }
    return true;
  },
  deleteJob: async (id: string) => {
    try {
      const response = await api.delete(`/jobs/${id}`);
      if (response.data.success) {
        window.location.reload();
        toast.success("Job deleted successfully");
        return true;
      } else {
        toast.error("Failed to delete job");
        return false;
      }
    } catch {
      toast.error("Internal server error");
      return false;
    }
  },
  updateJob: async (id: string, data: Job) => {
    const response = await api.patch(`/jobs/${id}`, data);
    if (response.data.success) {
      window.location.reload();
      toast.success("Job updated successfully");
    }
  },

  createJob: async (data: Job) => {
    try {
      const response = await api.post("/jobs/newjob", data);

      if (response.data.success) {
        window.location.reload();
        toast.success("Job created successfully");
        return true;
      } else {
        toast.error("Failed to create job");
        return false;
      }
    } catch {
      toast.error("Internal server error");
      return false;
    }
  },
  uploadLogo: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("logo", file); // 👈 Important

      const response = await api.post("/jobs/uploadlogo", formData);
      if (response.data.success) {
          set({ logo: response.data.logo });
        
        toast.success("Logo uploaded successfully");
        return true;
      } else {
        toast.error("Failed to upload logo");
        return false;
      }
    } catch {
      toast.error("Internal server error");
      return false;
    }
  },
}));
