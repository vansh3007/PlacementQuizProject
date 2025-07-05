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
import { useBranchStore } from "@/store/useBranchStore";
import { CreateBranch } from "./CreateBranch";
import EditBranch from "./EditBranch";
import DeleteBranch from "./DeleteBranch";
import CustomPagination from "@/components/shared/CustomPagination";

// ✅ Correct interface
interface Branch {
  id: string;
  key: string;
  branch: string;
}

const ROWS_PER_PAGE = 10;

const BranchTable = () => {
  const { allBranches } = useBranchStore((state) => state);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    allBranches().finally(() => setLoading(false));
  }, [allBranches]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const rawBranches = useBranchStore((state) => state.branches);

  const filteredBranches = Array.isArray(rawBranches)
    ? rawBranches.filter(
        (branch) =>
          branch.branch.toLowerCase().includes(filter.toLowerCase()) ||
          branch.key.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredBranches.length / ROWS_PER_PAGE);
  const paginatedBranches = filteredBranches.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Input
          placeholder="Search branches..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-1/2 rounded-xl"
        />
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="w-full sm:w-auto rounded-xl shadow"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Branch
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh] w-full">
          <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <Table>
              <TableCaption className="text-muted-foreground text-sm p-2">
                Complete list of all branches
              </TableCaption>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="text-center w-12">#</TableHead>
                  <TableHead>Key</TableHead>
                  <TableHead>Branch Name</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedBranches.length > 0 ? (
                  paginatedBranches.map((branch, index) => (
                    <TableRow key={branch.id}>
                      <TableCell className="text-center font-medium">
                        {(currentPage - 1) * ROWS_PER_PAGE + index + 1}
                      </TableCell>
                      <TableCell>{branch.key}</TableCell>
                      <TableCell>{branch.branch}</TableCell>
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
                                setSelectedBranch(branch);
                                setEditOpen(true);
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setSelectedBranch(branch);
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
                      colSpan={4}
                      className="text-center py-6 text-gray-500"
                    >
                      No branches found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-center">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}

      <CreateBranch
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <EditBranch
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        branch={selectedBranch}
      />
      <DeleteBranch
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        branch={selectedBranch}
      />
    </div>
  );
};

export default BranchTable;
