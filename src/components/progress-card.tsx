import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressCardProps {
  emoji?: string;
  title: string;
  subtitle?: string;
  value: number;
  max: number;
  rightSlot?: React.ReactNode;
}

export function ProgressCard({ emoji, title, subtitle, value, max, rightSlot }: ProgressCardProps) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <Card className="rounded-2xl border-border/60 p-4 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {emoji && <span className="text-xl" aria-hidden>{emoji}</span>}
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">{title}</div>
            {subtitle && <div className="truncate text-xs text-muted-foreground">{subtitle}</div>}
          </div>
        </div>
        <div className="shrink-0 text-xs text-muted-foreground">{rightSlot ?? `${value} / ${max}`}</div>
      </div>
      <Progress value={pct} className="mt-3 h-1.5" />
    </Card>
  );
}