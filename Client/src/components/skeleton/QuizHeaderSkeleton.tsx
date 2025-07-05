import { Skeleton } from "@/components/ui/skeleton";

const QuizHeaderSkeleton = () => (
  <div className="bg-white p-4 rounded shadow-md space-y-2">
    <Skeleton className="w-4 h-4 bg-gray-200" />
    <Skeleton className="w-32 h-4 bg-gray-300" />
    <Skeleton className="w-40 h-4 bg-gray-200" />
    <Skeleton className="w-28 h-4 bg-gray-200" />
  </div>
);

export default QuizHeaderSkeleton;
