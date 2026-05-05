import { Lock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface LockedFeatureCardProps {
  emoji?: string;
  title: string;
  description: string;
  unlockHint?: string;
}

/**
 * Card used for "coming soon" games and locked future features.
 * Visually quieter than an active GameCard so the eye is drawn to what's playable.
 */
export function LockedFeatureCard({ emoji = "🔒", title, description, unlockHint }: LockedFeatureCardProps) {
  return (
    <Card className="relative h-full overflow-hidden rounded-3xl border-dashed border-border/70 bg-muted/30 p-6 shadow-none">
      <div className="flex items-start justify-between">
        <div className="text-3xl opacity-60" aria-hidden>{emoji}</div>
        <span className="inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-soft">
          <Lock className="h-3 w-3" /> Coming soon
        </span>
      </div>
      <h3 className="mt-3 text-base font-semibold text-foreground/80">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      {unlockHint && (
        <p className="mt-4 text-[11px] text-muted-foreground">{unlockHint}</p>
      )}
    </Card>
  );
}