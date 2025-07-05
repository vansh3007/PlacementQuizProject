import { Skeleton } from "@/components/ui/skeleton";
import { ListTodo } from "lucide-react";
export const SkeletonPreviousQuizzes = () => {

    return (  <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
          <ListTodo className="text-blue-600 w-6 h-6" />
          Recent Quizzes
        </h2>
    
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col justify-between min-h-[260px] animate-pulse space-y-4`}
            >
              {/* Quiz Title */}
              <Skeleton className="h-6 w-1/2 rounded-md bg-gray-300" />
    
              {/* Meta Info */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4 rounded-md bg-gray-200" />
                <Skeleton className="h-4 w-2/3 rounded-md bg-gray-200" />
                <Skeleton className="h-4 w-1/2 rounded-md bg-gray-200" />
                <Skeleton className="h-4 w-4/5 rounded-md bg-gray-200" />
              </div>
    
              {/* Footer */}
              <div className="flex justify-between items-center mt-6">
                <Skeleton className="h-8 w-24 rounded-full bg-gray-200" />
                <Skeleton className="h-8 w-24 rounded-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>)
};
