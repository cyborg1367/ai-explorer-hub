import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/status-badge";
import type { Game } from "@/lib/mock-data";

interface GameCardProps {
  game: Game;
  variant?: "compact" | "full";
}

function gameHref(id: string): string | null {
  if (id === "trust-light") return "/student/games/trust-light";
  if (id === "prompt-battle") return "/student/games/prompt-battle";
  return null;
}

export function GameCard({ game, variant = "full" }: GameCardProps) {
  const href = gameHref(game.id);
  const interactive = !game.locked && href;

  const inner = (
    <Card
      className={`group relative h-full overflow-hidden rounded-3xl border-border/60 ${
        variant === "compact" ? "bg-gradient-card p-5" : "p-6"
      } shadow-soft transition-all ${
        interactive ? "hover:-translate-y-0.5 hover:shadow-card focus-visible:-translate-y-0.5 focus-visible:shadow-card" : "opacity-75"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className={variant === "compact" ? "text-3xl" : "text-4xl"}>{game.emoji}</div>
        {game.locked ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <Lock className="h-3 w-3" /> قفل
          </span>
        ) : (
          <StatusBadge status={game.status} />
        )}
      </div>
      <h3 className={`mt-3 ${variant === "compact" ? "text-base" : "text-lg"} font-semibold`}>{game.title}</h3>
      <p className="text-sm text-muted-foreground">{game.tagline}</p>
      {variant === "full" && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {game.skills.map((s) => (
            <span
              key={s}
              className="rounded-full bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-secondary-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      )}
      {!game.locked && (
        <div className="mt-4">
          <Progress value={(game.progress / game.totalItems) * 100} className="h-1.5" />
          <div className="mt-1 text-xs text-muted-foreground">
            {game.progress} از {game.totalItems} مأموریت
          </div>
        </div>
      )}
      {game.locked && (
        <p className="mt-4 text-[11px] text-muted-foreground">پس از تمام شدن بازی‌های فعال کلاس، باز می‌شود.</p>
      )}
    </Card>
  );

  if (interactive) {
    return (
      <Link
        to={href as "/student/games/trust-light" | "/student/games/prompt-battle"}
        className="block h-full rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {inner}
      </Link>
    );
  }
  return <div>{inner}</div>;
}