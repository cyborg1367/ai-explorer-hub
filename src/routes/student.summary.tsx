import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Trophy, Sparkles, BookOpen, Target } from "lucide-react";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const search = z.object({
  game: z.enum(["trust-light", "prompt-battle"]).default("trust-light"),
  score: z.coerce.number().default(100),
});

export const Route = createFileRoute("/student/summary")({
  head: () => ({ meta: [{ title: "Game complete — AI Thinking Lab" }] }),
  validateSearch: (s) => search.parse(s),
  component: Summary,
});

function Summary() {
  const s = useSearch({ from: "/student/summary" });
  const title = s.game === "trust-light" ? "Trust Light" : "Prompt Battle";
  const accuracy = s.game === "trust-light" ? "80%" : "75%";

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <Card className="overflow-hidden rounded-3xl border-border/60 shadow-card">
        <div className="bg-gradient-hero p-10 text-center text-primary-foreground">
          <Trophy className="mx-auto h-16 w-16" />
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">{title} complete!</h1>
          <p className="mt-2 opacity-90">You finished every mission in this game.</p>
        </div>
        <div className="grid gap-4 p-8 sm:grid-cols-3">
          <Stat icon={<Sparkles className="h-5 w-5 text-primary" />} label="Total points" value={`+${s.score}`} />
          <Stat icon={<Target className="h-5 w-5 text-success" />} label="Accuracy" value={accuracy} />
          <Stat icon={<BookOpen className="h-5 w-5 text-accent-foreground" />} label="Skills grown" value="3" />
        </div>
        <div className="border-t border-border/60 p-8">
          <h2 className="text-sm font-semibold">Skills you practiced</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {(s.game === "trust-light"
              ? ["Critical Thinking", "Fact Checking", "Reasoning"]
              : ["Question Quality", "Revision"]
            ).map((sk) => (
              <span key={sk} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                {sk}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button asChild variant="outline" className="rounded-xl">
              <Link to="/student/journal">Write a journal entry</Link>
            </Button>
            <Button asChild size="lg" className="rounded-xl shadow-soft">
              <Link to="/student/games">Back to games</Link>
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-gradient-card p-4 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-soft">{icon}</div>
      <div className="mt-2 text-xs text-muted-foreground">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}