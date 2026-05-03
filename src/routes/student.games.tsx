import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/status-badge";
import { GAMES } from "@/lib/mock-data";

export const Route = createFileRoute("/student/games")({
  head: () => ({ meta: [{ title: "Games — AI Thinking Lab" }] }),
  component: GamesList,
});

function GamesList() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">All thinking games</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick a mission. Each game grows different thinking skills.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((g) => {
          const card = (
            <Card
              className={`group relative h-full overflow-hidden rounded-3xl border-border/60 p-6 shadow-soft transition-all ${
                g.locked ? "opacity-70" : "hover:-translate-y-1 hover:shadow-card"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="text-4xl">{g.emoji}</div>
                {g.locked ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    <Lock className="h-3 w-3" /> Locked
                  </span>
                ) : (
                  <StatusBadge status={g.status} />
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{g.title}</h3>
              <p className="text-sm text-muted-foreground">{g.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {g.skills.map((s) => (
                  <span key={s} className="rounded-full bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
                    {s}
                  </span>
                ))}
              </div>
              {!g.locked && (
                <div className="mt-4">
                  <Progress value={(g.progress / g.totalItems) * 100} className="h-1.5" />
                  <div className="mt-1 text-xs text-muted-foreground">
                    {g.progress} / {g.totalItems} missions
                  </div>
                </div>
              )}
            </Card>
          );
          if (g.locked) return <div key={g.id}>{card}</div>;
          if (g.id === "trust-light")
            return (
              <Link key={g.id} to="/student/games/trust-light">
                {card}
              </Link>
            );
          return (
            <Link key={g.id} to="/student/games/prompt-battle">
              {card}
            </Link>
          );
        })}
      </div>
    </main>
  );
}