import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const QuizAnalysisSkeleton: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-white px-4 py-8 font-sans text-gray-800 space-y-8">
      {/* Header Skeleton */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48 bg-gray-200 animate-pulse rounded" />
            <Skeleton className="h-4 w-64 bg-gray-200 animate-pulse rounded" />
          </div>
          <Skeleton className="h-10 w-36 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>

      {/* Summary Skeleton */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 space-y-6">
        {/* Summary header */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-44 bg-gray-200 animate-pulse rounded" />
          <Skeleton className="h-6 w-6 rounded-md bg-gray-200 animate-pulse" />
        </div>

        <Skeleton className="h-12 w-32 bg-gray-200 animate-pulse rounded" />

        {/* Progress Bars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <Skeleton className="h-20 w-full bg-gray-200 animate-pulse rounded-md" />
          <Skeleton className="h-20 w-full bg-gray-200 animate-pulse rounded-md" />
          <Skeleton className="h-20 w-full bg-gray-200 animate-pulse rounded-md" />
          <Skeleton className="h-20 w-full bg-gray-200 animate-pulse rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default QuizAnalysisSkeleton;
