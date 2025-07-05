// components/skeletons/QuizSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

const QuizSkeleton = () => {
  return (
    <div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-white p-4 overflow-hidden">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-8 h-[30rem] border border-gray-200 space-y-5 flex flex-col">
        {/* Header Title */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-56 rounded-full bg-gray-200" />
        </div>

        {/* Progress bar steps */}
        <div className="flex justify-between items-center relative pb-6 hide-scrollbar">
          <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="w-9 h-9 rounded-full z-10 relative bg-gray-300"
            />
          ))}
        </div>

        {/* Main form area */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-5 hide-scrollbar">
          {/* Step title */}
          <Skeleton className="h-6 w-48 rounded-md bg-gray-200" />

          {/* Step options grid */}
          <div className="grid grid-cols-2 gap-3 hide-scrollbar">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-12 rounded-2xl bg-gray-100" />
            ))}
          </div>

          {/* Form fields (optional based on step) */}
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-10 w-full rounded-full bg-gray-100" />
            <Skeleton className="h-10 w-full rounded-full bg-gray-100" />
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-between pt-4">
          <Skeleton className="h-10 w-24 rounded-full bg-gray-200" />
          <Skeleton className="h-10 w-28 rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default QuizSkeleton;
