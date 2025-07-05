import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (<div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 sm:p-10 space-y-10">
    <div className="text-center">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
        Open Hiring Positions
      </h1>
      <p className="text-gray-600 text-lg">
        Explore exciting career opportunities and join amazing teams!
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 space-y-4"
        >
          {/* Header */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4 rounded bg-gray-200" />
            <Skeleton className="h-4 w-1/3 rounded bg-gray-100" />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-md bg-gray-200" />
              <Skeleton className="h-4 w-3/4 rounded bg-gray-100" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-md bg-gray-200" />
              <Skeleton className="h-4 w-2/3 rounded bg-gray-100" />
            </div>
          </div>

          {/* Footer */}
          <Skeleton className="h-10 w-full rounded-full bg-blue-100 mt-4" />
        </div>
      ))}
    </div>
    </div>
  );
};

export default SkeletonCard;