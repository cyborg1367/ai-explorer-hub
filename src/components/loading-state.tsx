import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  rows?: number;
  label?: string;
  variant?: "card" | "list" | "table";
}

export function LoadingState({ rows = 3, label = "Loading…", variant = "card" }: LoadingStateProps) {
  if (variant === "list") {
    return (
      <div className="space-y-3" role="status" aria-label={label}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center justify-between rounded-2xl border border-border/60 bg-card p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-2.5 w-24" />
              </div>
            </div>
            <Skeleton className="h-3 w-12" />
          </div>
        ))}
      </div>
    );
  }
  if (variant === "table") {
    return (
      <div className="space-y-2 p-4" role="status" aria-label={label}>
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-xl" />
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2" role="status" aria-label={label}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border/60 bg-card p-5">
          <Skeleton className="h-8 w-8 rounded-xl" />
          <Skeleton className="mt-4 h-4 w-3/5" />
          <Skeleton className="mt-2 h-3 w-4/5" />
          <Skeleton className="mt-5 h-2 w-full" />
        </div>
      ))}
    </div>
  );
}