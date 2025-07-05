import { Skeleton } from "@/components/ui/skeleton";

const QuestionPanelSkeleton = () => (
  <div className="flex-1 bg-white rounded-xl shadow-md p-6 space-y-4">
    <Skeleton className="w-3/4 h-5 bg-gray-300" />
    {[...Array(4)].map((_, idx) => (
      <Skeleton
        key={idx}
        className="w-full h-10 rounded-lg bg-gray-200"
      />
    ))}
    <div className="flex gap-3 mt-4">
      <Skeleton className="w-24 h-10 rounded bg-gray-200" />
      <Skeleton className="w-32 h-10 rounded bg-gray-200" />
      <Skeleton className="w-28 h-10 rounded bg-gray-200" />
      <Skeleton className="w-36 h-10 rounded bg-gray-300 ml-auto" />{" "}
  
    </div>
  </div>
);

export default QuestionPanelSkeleton;
