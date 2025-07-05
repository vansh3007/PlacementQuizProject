import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonDetailCard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-6">
          <div className="flex gap-4 items-center">
            <Skeleton className="w-16 h-16 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48 rounded-md" />
              <Skeleton className="h-4 w-32 rounded-md" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-sm">
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-5 w-2/3" />
              </div>
            ))}
          </div>

          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl space-y-2 shadow">
              <Skeleton className="h-5 w-40" />
              {[...Array(idx === 1 ? 1 : 3)].map((__, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          ))}

          <Skeleton className="h-12 w-full mt-6 rounded-xl bg-blue-100" />
        </div>
        </div>
    )
}