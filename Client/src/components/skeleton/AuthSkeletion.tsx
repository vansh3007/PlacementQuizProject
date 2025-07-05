import { Skeleton } from "@/components/ui/skeleton";

export default function AuthSkeleton() {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center"
    
    >
      <div className="bg-white/50 backdrop-blur-lg rounded-xl p-8 w-full max-w-md space-y-4 shadow-xl">
        {/* Logo */}
        <div className="flex justify-center">
          <Skeleton className="h-16 w-16 rounded-full bg-gray-300" />
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-3/4 mx-auto bg-gray-300" />
          <Skeleton className="h-4 w-2/3 mx-auto bg-gray-300" />
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <Skeleton className="h-4 w-1/4 bg-gray-300" />
          <Skeleton className="h-10 w-full rounded-md bg-gray-300" />
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <Skeleton className="h-4 w-1/4 bg-gray-300" />
          <Skeleton className="h-10 w-full rounded-md bg-gray-300" />
        </div>

        {/* Login Button */}
        <Skeleton className="h-10 w-full rounded-md bg-gray-300" />

        {/* Divider */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-px w-full bg-gray-300" />
          <Skeleton className="h-4 w-8 bg-gray-300" />
          <Skeleton className="h-px w-full bg-gray-300" />
        </div>

        {/* Google Button */}
        <Skeleton className="h-10 w-full rounded-md bg-gray-300" />
      </div>
    </div>
  );
}
