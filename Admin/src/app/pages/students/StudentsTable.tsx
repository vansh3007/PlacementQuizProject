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
import { useEffect, useState } from "react";
import CustomPagination from "@/components/shared/CustomPagination";
import api from "@/utils/api";
import { Input } from "@/components/ui/input"; // Add this import
import { Loader2 } from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  branch: string;
  enrollment: string;
}

const ROWS_PER_PAGE = 10;

const StudentsTable = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(""); // Add filter state

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const res = await api.get("/admin/users");
        setStudents(res.data.users || []);
      } catch {
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Filter students by name, email, or branch
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(filter.toLowerCase()) ||
      student.email.toLowerCase().includes(filter.toLowerCase()) ||
      student.branch.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / ROWS_PER_PAGE);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Student List</h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <Input
          placeholder="Search students..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-1/2"
        />
      </div>
      <div className="rounded-xl border shadow-sm overflow-x-auto">
        <Table>
          <TableCaption className="text-muted-foreground text-sm">
            The total list of students
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">S.No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Enrollment</TableHead>
              <TableHead>Branch</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex items-center justify-center min-h-[40vh] w-full">
                    <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
                  </div>
                </TableCell>
              </TableRow>
            ) : paginatedStudents.length > 0 ? (
              paginatedStudents.map((student, index) => (
                <TableRow key={student.id}>
                  <TableCell className="text-center">
                    {(currentPage - 1) * ROWS_PER_PAGE + index + 1}
                  </TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.enrollment}</TableCell>
                  <TableCell>{student.branch}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default StudentsTable;
