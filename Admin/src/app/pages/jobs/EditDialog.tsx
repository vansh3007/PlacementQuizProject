"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useRef, useState, useEffect } from "react";
import { useJobStore } from "@/store/useJobStore";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import RichTextEditor from "@/components/shared/RichTextEditor";
interface JobStore {
  updateJob: (id: string, data: Job) => Promise<boolean>;
  uploadLogo: (file: File) => Promise<boolean>;
  logo: string;
}

export interface Job {
  id: string;
  jobTitle: string;
  jobDescription: string;
  companyName: string;
  applyLink: string;
  package?: string;
  logo: string;
}

export interface EditJobDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (job: Job) => void;
  job: Job | null;
}

const jobSchema = z.object({
  jobTitle: z.string().min(1, { message: "Job title is required" }),
  jobDescription: z.string().min(1, { message: "Job description is required" }),
  companyName: z.string().min(1, { message: "Company name is required" }),
  applyLink: z.string().url({ message: "Valid apply link is required" }),
  package: z.string().optional(),
  logo: z.string().min(1, { message: "Logo URL is required" }),
});

type JobFormValues = z.infer<typeof jobSchema>;

const EditDialog = ({ isOpen, onClose, onSave, job }: EditJobDialogProps) => {
  const { updateJob, uploadLogo } = useJobStore(
    (state: unknown) => state as JobStore
  );
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: job
      ? {
          jobTitle: job.jobTitle,
          jobDescription: job.jobDescription,
          companyName: job.companyName,
          applyLink: job.applyLink,
          package: job.package || "",
          logo: job.logo,
        }
      : {
          jobTitle: "",
          jobDescription: "",
          companyName: "",
          applyLink: "",
          package: "",
          logo: "",
        },
  });

  useEffect(() => {
    if (job) {
      form.reset({
        jobTitle: job.jobTitle,
        jobDescription: job.jobDescription,
        companyName: job.companyName,
        applyLink: job.applyLink,
        package: job.package || "",
        logo: job.logo,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job]);

  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const success = await uploadLogo(file);
      if (success) {
        const newLogo = (useJobStore.getState() as { logo: string }).logo;
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
    if (!job) return;
    setUpdating(true);
    try {
      const updatedJob: Job = { ...job, ...values };

      const success = await updateJob(job.id, updatedJob);
      if (success) {
        toast.success("Job updated successfully");
        onSave(updatedJob);
        onClose();
      } else {
        toast.error("Failed to update job");
      }
    } catch {
      toast.error("Failed to update job");
    } finally {
      setUpdating(false);
    }
  }

  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl hide-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Job</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pt-2"
          >
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

            {/* Description */}
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
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

            {/* Logo Upload */}
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleLogoChange}
                        disabled={uploading}
                      />
                      {form.watch("logo") && (
                        <img
                          src={form.watch("logo")}
                          alt="Logo Preview"
                          className="h-12 object-contain border rounded"
                        />
                      )}
                      <input type="hidden" {...field} />
                      {uploading && (
                        <p className="text-xs text-muted-foreground">
                          Uploading...
                        </p>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer */}
            <DialogFooter className="pt-2">
              <Button type="submit" disabled={updating || uploading}>
                {updating ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
