import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Swords } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PROMPT_BATTLE_ROUNDS, PROMPT_REASONS } from "@/lib/mock-data";

export const Route = createFileRoute("/student/games/prompt-battle")({
  head: () => ({ meta: [{ title: "Prompt Battle — AI Thinking Lab" }] }),
  component: PromptBattle,
});

function PromptBattle() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [reasons, setReasons] = useState<string[]>([]);
  const total = PROMPT_BATTLE_ROUNDS.length;
  const round = PROMPT_BATTLE_ROUNDS[index];

  function toggleReason(r: string) {
    setReasons((rs) => (rs.includes(r) ? rs.filter((x) => x !== r) : [...rs, r]));
  }

  function submit() {
    if (!pick) return;
    const chosen = round.prompts.find((p) => p.id === pick)!;
    const correct = chosen.better;
    navigate({
      to: "/student/feedback",
      search: {
        game: "prompt-battle",
        correct: correct ? 1 : 0,
        score: correct ? 20 : 8,
        next: index + 1 < total ? index + 1 : -1,
        explanation: round.why,
      } as any,
    });
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 md:px-6">
      <div className="mb-6 flex items-center justify-between">
        <Link to="/student/games" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to games
        </Link>
        <div className="text-xs text-muted-foreground">Round {index + 1} of {total}</div>
      </div>
      <Progress value={((index + 1) / total) * 100} className="mb-8 h-2" />

      <Card className="overflow-hidden rounded-3xl border-border/60 shadow-card">
        <div className="bg-gradient-card p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Swords className="h-4 w-4" /> Prompt Battle
          </div>
          <h1 className="mt-2 text-xl font-bold md:text-2xl">Goal: {round.goal}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Which prompt would get the better answer?</p>
        </div>

        <div className="border-t border-border/60 p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            {round.prompts.map((p, i) => {
              const active = pick === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setPick(p.id)}
                  className={`group rounded-2xl border-2 p-5 text-left transition-all ${
                    active ? "border-primary bg-primary/5 shadow-soft" : "border-border/60 hover:border-border"
                  }`}
                >
                  <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-bold">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <p className="text-base leading-relaxed">{p.text}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-semibold">Why is your pick better?</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {PROMPT_REASONS.map((r) => {
                const active = reasons.includes(r);
                return (
                  <button
                    key={r}
                    onClick={() => toggleReason(r)}
                    className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      active ? "border-primary bg-primary/10 text-primary" : "border-border bg-background hover:bg-muted"
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-40"
            >
              ← Previous
            </button>
            <Button onClick={submit} disabled={!pick} size="lg" className="rounded-xl shadow-soft">
              Submit pick <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
}