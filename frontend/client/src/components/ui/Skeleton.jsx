const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse rounded-xl bg-white/10 ${className}`} />
);

export const VideoGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <Skeleton className="aspect-video w-full rounded-none" />
        <div className="space-y-3 p-4">
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-3 w-2/5" />
          <Skeleton className="h-3 w-3/5" />
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
