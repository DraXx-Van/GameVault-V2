import { Skeleton } from "@/components/ui/skeleton";

const GameCardSkeleton = () => {
  return (
    <div className="bg-gv-surface rounded-xl border border-white/5 p-3 overflow-hidden">
      
      
      <Skeleton className="h-40 w-full rounded-xl bg-gv-card" />

      <div className="space-y-3 pt-3">

        <Skeleton className="h-5 w-3/4 bg-gv-card" />

        <Skeleton className="h-4 w-1/3 bg-gv-card" />

        <div className="flex justify-between">
          <Skeleton className="h-5 w-20 bg-gv-card" />
          <Skeleton className="h-5 w-12 bg-gv-card" />
        </div>

      </div>
    </div>
  );
};

export default GameCardSkeleton;