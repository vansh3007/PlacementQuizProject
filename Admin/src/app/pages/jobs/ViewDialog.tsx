"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  // DialogDescription,
} from "@/components/ui/dialog";

export interface Job {
  id: string;
  jobTitle: string;
  jobDescription: string;
  companyName: string;
  applyLink: string;
  package?: string;
  logo: string;
}

export interface ViewJobDialogProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

const ViewDialog = ({ isOpen, onClose, job }: ViewJobDialogProps) => {
  if (!job) return null;

  return (
 <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl rounded-2xl hide-scrollbar">
    <DialogHeader>
      <DialogTitle className="text-xl font-bold">Job Details</DialogTitle>
    </DialogHeader>

    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {job.logo && (
          <img
            src={
              job.logo.startsWith("http")
                ? job.logo
                : `/api/uploads/${job.logo.split("\\").pop()}`
            }
            alt="Logo"
            className="h-16 w-16 object-contain rounded border"
          />
        )}
        <div>
          <div className="text-lg font-semibold">{job.jobTitle}</div>
          <div className="text-sm text-muted-foreground">{job.companyName}</div>
        </div>
      </div>

      <div>
        <div className="text-xl font-medium mb-1 text-black">Description</div> <br />
        <div
          className="prose max-w-none text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: job.jobDescription }}
        />
      </div>

      {/* Package */}
      <div>
        <div className="text-sm font-medium text-muted-foreground">Package</div>
        <div className="text-sm">{job.package || "-"}</div>
      </div>

      {/* Apply Link */}
      <div>
        <div className="text-sm font-medium text-muted-foreground">Apply Link</div>
        <div className="text-sm">
          {job.applyLink ? (
            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {job.applyLink}
            </a>
          ) : (
            "-"
          )}
        </div>
      </div>

      {/* Job ID */}
      <div>
        <div className="text-sm font-medium text-muted-foreground">Job ID</div>
        <div className="text-sm">{job.id}</div>
      </div>
    </div>
  </DialogContent>
</Dialog>

  );
};

export default ViewDialog;
