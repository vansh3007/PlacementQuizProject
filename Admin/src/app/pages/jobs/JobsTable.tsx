"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ViewDialog from "./ViewDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import { useJobStore } from "@/store/useJobStore";
import CreateJob from "./CreateJob";
import type { Job as JobType } from "./ViewDialog";
import CustomPagination from "@/components/shared/CustomPagination";

interface Jobs {
  id: string;
  logo: string;
  title: string;
  companyName: string;
  Vacancies: string;
  package: string;
}

interface JobStore {
  jobs: Jobs[];
  alljobs: () => Promise<void>;
}

const ROWS_PER_PAGE = 10;

const JobTable = () => {
  const { alljobs } = useJobStore<JobStore>(
    (state: unknown) => state as JobStore
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<JobType | null>(
    null
  );
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // 1. Add loading state

  useEffect(() => {
    setLoading(true); // 2. Set loading true before fetching
    alljobs().finally(() => setLoading(false)); // 2. Set loading false after fetching
  }, [alljobs]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const newJobs = (useJobStore.getState() as { jobs: JobType[] }).jobs;
  const filteredJobs = Array.isArray(newJobs)
    ? newJobs.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(filter.toLowerCase()) ||
          job.companyName.toLowerCase().includes(filter.toLowerCase())
      )
    : [];
  const totalPages = Math.ceil(filteredJobs.length / ROWS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Input
          placeholder="Search jobs..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-1/2 rounded-xl"
        />
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="w-full sm:w-auto rounded-xl shadow"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Job
        </Button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh] w-full">
          <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <Table>
              <TableCaption className="text-muted-foreground text-sm p-2">
                Complete list of all job postings
              </TableCaption>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="text-center w-12">#</TableHead>
                  <TableHead>Logo</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Apply Link</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedJobs.length > 0 ? (
                  paginatedJobs.map((job: JobType, index: number) => (
                    <TableRow
                      key={job.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <TableCell className="text-center font-medium">
                        {(currentPage - 1) * ROWS_PER_PAGE + index + 1}
                      </TableCell>
                      <TableCell>
                        {job.logo ? (
                          <img
                            src={
                              job.logo.startsWith("http")
                                ? job.logo
                                : `/api/uploads/${job.logo.split("\\").pop()}`
                            }
                            alt="Logo"
                            className="h-10 w-10 object-contain rounded-md border"
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {job.jobTitle}
                      </TableCell>
                      <TableCell>{job.companyName}</TableCell>
                      <TableCell>{job.package || "-"}</TableCell>
                      <TableCell>
                        {job.applyLink ? (
                          <a
                            href={job.applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            Apply
                          </a>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-36">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedQuestion(job);
                                setViewOpen(true);
                              }}
                            >
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedQuestion(job);
                                setEditOpen(true);
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setSelectedQuestion(job);
                                setDeleteOpen(true);
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-6 text-gray-500"
                    >
                      No jobs found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}

      {/* Modals */}
      <CreateJob
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={() => toast.success("Job created successfully")}
      />
      <ViewDialog
        isOpen={viewOpen}
        onClose={() => setViewOpen(false)}
        job={selectedQuestion}
      />
      <EditDialog
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        job={selectedQuestion}
        onSave={() => {
          // handle update logic
        }}
      />
      <DeleteDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        job={selectedQuestion}
      />
    </div>
  );
};

export default JobTable;
