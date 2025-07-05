import api from "@/utils/api";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Data {
  email: string;
  password: string;
}

interface file {
  file: File;
}

export const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: async (data: Data) => {
        try {
          const response = await api.post("/admin/login", data);
          if (response.data.success) {
            set({ isLoggedIn: true });
          }
          toast.success("Logged in successfully");
          return true;
        } catch (error) {
          if (error) {
            toast.error("failed to login");
          }
        }
      },
      logout: async () => {
        const response = await api.post("/admin/logout");
        if (response.data.success) {
          set({ isLoggedIn: false });
          toast.success("Logged out successfully");
          return true;
        }

        return false;
      },

      uploadFile: async (file: file) => {
        const resonse = await api.post("/admin/upload", file);
        if (resonse.data.success) {
          toast.success("File uploaded successfully");
        }
        return true;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => {
        const typed = state as { isLoggedIn: boolean };
        return { isLoggedIn: typed.isLoggedIn };
      },
    }
  )
);
