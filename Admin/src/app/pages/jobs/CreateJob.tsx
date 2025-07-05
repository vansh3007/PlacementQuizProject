"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RichTextEditor from "@/components/shared/RichTextEditor";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { useJobStore } from "@/store/useJobStore";
import { toast } from "sonner";

interface JobStore {
  logo: string;
  createJob: (data: JobFormValues) => Promise<boolean>;
  uploadLogo: (file: File) => Promise<boolean>;
}

const jobSchema = z.object({
  jobTitle: z.string().min(1, { message: "Job title is required" }),
  jobDescription: z
    .string()
    .transform((val) => val.replace(/<[^>]*>/g, "").trim()) // ⬅ strip tags
    .refine((val) => val.length > 0, {
      message: "Job description is required",
    }),
  companyName: z.string().min(1, { message: "Company name is required" }),
  applyLink: z.string().url({ message: "Valid apply link is required" }),
  package: z.string().optional(),
  logo: z.string().min(1, { message: "Logo URL is required" }),
  location: z.string().min(1, { message: "Location is required" }),
});


type JobFormValues = z.infer<typeof jobSchema>;

export interface CreateQuestionsProp {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateJob = ({ isOpen, onClose, onSuccess }: CreateQuestionsProp) => {
  const { createJob, uploadLogo } = useJobStore(
    (state: unknown) => state as JobStore
  );
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobTitle: "",
      jobDescription: "",
      companyName: "",
      applyLink: "",
      package: "",
      logo: "",
      location: "",
    },
  });

  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const success = await uploadLogo(file);
      if (success) {
        const newLogo = (useJobStore.getState() as JobStore).logo;
        form.setValue("logo", newLogo);
        toast.success("Logo uploaded");
      } else {
        toast.error("Failed to upload logo");
      }
    } catch {
      toast.error("Failed to upload logo");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(values: JobFormValues) {
    setSubmitting(true);
    try {
      const success = await createJob(values);
      if (success) {
        onSuccess();
        onClose();
        form.reset(); // Reset form fields
        window.location.reload(); // Reload job list
      } else {
        toast.error("Failed to create job");
      }
    } catch {
      toast.error("Failed to create job");
    } finally {
      setSubmitting(false);
    }
  }

  return (
 <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto hide-scrollbar rounded-2xl">
    <DialogHeader>
      <DialogTitle className="text-lg font-semibold">Create Job</DialogTitle>
      <DialogDescription>Fill in the details to post a new job opening.</DialogDescription>
    </DialogHeader>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Job Title */}
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter job title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Description */}
        <FormField
          control={form.control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <RichTextEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company Name */}
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Apply Link */}
        <FormField
          control={form.control}
          name="applyLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apply Link</FormLabel>
              <FormControl>
                <Input placeholder="Enter apply link (URL)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Package */}
        <FormField
          control={form.control}
          name="package"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package</FormLabel>
              <FormControl>
                <Input placeholder="Enter package (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter job location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Logo Upload */}
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Logo</FormLabel>
              <FormControl>
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleLogoChange}
                    disabled={uploading}
                  />
                  {form.watch("logo") && (
                    <div className="mt-2">
                      <img
                        src={form.watch("logo")}
                        alt="Logo Preview"
                        className="h-12 object-contain rounded-md"
                      />
                    </div>
                  )}
                  <input type="hidden" {...field} />
                  {uploading && (
                    <p className="text-xs text-muted-foreground mt-1">Uploading...</p>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Footer Buttons */}
        <DialogFooter className="pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={submitting || uploading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={submitting || uploading}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  </DialogContent>
</Dialog>

  );
};

export default CreateJob;
