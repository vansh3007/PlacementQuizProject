import { create } from "zustand";
import axiosInstance from "../utils/clientApiInstace";

interface Job {
  applyLink: string;
  companyName: string;
  id: string;
  jobDescription: string;
  jobTitle: string;
  location: string;
  logo: string;
  package?: string;
}

interface HiringStore {
  hiringData: Job[];
  hiringDataById: Job | null;
  selectedJob: Job | null;
  appliedJobs: Job[];
  loading: boolean;
  error: string | null;

  fetchHiringData: () => Promise<void>;
  hiringById: (id: string) => Promise<void>;
  addAppliedJob: (job: Job) => void;
  setSelectedJob: (job: Job) => void;
  clearSelectedJob: () => void;
}

export const useHiringStore = create<HiringStore>((set) => ({
  hiringData: [],
  hiringDataById: null,
  selectedJob: null,
  appliedJobs: [],
  loading: false,
  error: null,

  fetchHiringData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/jobs");
      if (!response.data.success)
        throw new Error("Failed to fetch hiring data");
      set({ hiringData: response.data.jobs, loading: false });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      set({ error: errorMessage, loading: false });
    }
  },

  hiringById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/jobs/${id}`);
      if (!response.data.success) throw new Error("Failed to fetch job data");
      set({ hiringDataById: response.data.job, loading: false });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      set({ error: errorMessage, loading: false });
    }
  },

  addAppliedJob: (job: Job) =>
    set((state) => {
      const alreadyApplied = state.appliedJobs.some((j) => j.id === job.id);
      if (!alreadyApplied) {
        return { appliedJobs: [...state.appliedJobs, job] };
      }
      return state;
    }),

  setSelectedJob: (job: Job) => set({ selectedJob: job }),

  clearSelectedJob: () => set({ selectedJob: null }),
}));
