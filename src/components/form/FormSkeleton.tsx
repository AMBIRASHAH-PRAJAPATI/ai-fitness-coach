import { Skeleton } from "@/components/ui/skeleton";

export default function FormSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-4 w-20 ml-2 hidden sm:block" />
        </div>
        <Skeleton className="flex-1 h-1 mx-4 mt-5" />
        <div className="flex items-center">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-4 w-20 ml-2 hidden sm:block" />
        </div>
        <Skeleton className="flex-1 h-1 mx-4 mt-5" />
        <div className="flex items-center">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-4 w-20 ml-2 hidden sm:block" />
        </div>
      </div>
      <div className="space-y-6">
        <Skeleton className="h-8 w-1/2" />
        <div className="grid gap-6">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  );
}