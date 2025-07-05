import { Skeleton } from "@/components/ui/skeleton";

const SidePanelSkeleton = () => (
  <div className="bg-white shadow-md p-4 rounded-md w-full md:w-72 space-y-4">
    <Skeleton className="w-40 h-5 bg-gray-300" /> {/* Title */}
    
    <div className="grid grid-cols-6 gap-2">
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className="w-8 h-8 rounded-full bg-gray-200" /> 
      ))}
    </div>

    <div className="space-y-1">
      <Skeleton className="w-24 h-3 bg-gray-100" />
      <Skeleton className="w-32 h-3 bg-gray-100" />
      <Skeleton className="w-28 h-3 bg-gray-100" />
    </div>
  </div>
);

export default SidePanelSkeleton;
