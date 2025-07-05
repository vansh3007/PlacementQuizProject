import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // how many pages to show on each side of current
}

function getPageNumbers(current: number, total: number, siblingCount: number) {
  const pages: (number | "ellipsis")[] = [];
  const start = Math.max(2, current - siblingCount);
  const end = Math.min(total - 1, current + siblingCount);

  pages.push(1);
  if (start > 2) pages.push("ellipsis");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("ellipsis");
  if (total > 1) pages.push(total);
  return pages;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  if (totalPages <= 1) return null;
  const pageNumbers = getPageNumbers(currentPage, totalPages, siblingCount);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          >
            <PaginationPrevious size="default" />
          </button>
        </PaginationItem>
        {pageNumbers.map((page, idx) =>
          page === "ellipsis" ? (
            <PaginationEllipsis key={"ellipsis-" + idx} />
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                size="default"
                isActive={currentPage === page}
                onClick={() => onPageChange(Number(page))}
                href="#"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <button
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-disabled={currentPage === totalPages}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          >
            <PaginationNext size="default" />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
