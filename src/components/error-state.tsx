import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ApiError } from "@/api/types";

interface ErrorStateProps {
  error?: ApiError | null;
  onRetry?: () => void;
  title?: string;
}

export function ErrorState({ error, onRetry, title }: ErrorStateProps) {
  return (
    <Card className="rounded-3xl border-danger/30 bg-danger/5 p-8 text-center shadow-none">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-danger shadow-soft">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold">{title ?? "Something went wrong"}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {error?.message ?? "We couldn't load this just now."}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm" className="mt-4 rounded-xl">
          <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Try again
        </Button>
      )}
    </Card>
  );
}