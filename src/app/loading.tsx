import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Ad slot placeholder */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Skeleton className="h-[90px] w-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Title */}
          <div className="text-center space-y-3">
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-5 w-80 mx-auto" />
          </div>

          {/* Converter card skeleton */}
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-[42px] w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-[42px] w-full" />
              </div>
            </div>
            <div className="flex justify-center">
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-[42px] w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-[42px] w-full" />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
