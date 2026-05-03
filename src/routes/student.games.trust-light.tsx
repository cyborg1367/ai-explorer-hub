import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { TRUST_LIGHT_SCENARIOS, TRUST_REASONS } from "@/lib/mock-data";

export const Route = createFileRoute("/student/games/trust-light")({
  head: () => ({ meta: [{ title: "Trust Light — AI Thinking Lab" }] }),
  component: TrustLight,
});

const LIGHTS = [
  { value: "green" as const, label: "Trust it", color: "bg-success", ring: "ring-success", desc: "Looks accurate" },
  { value: "yellow" as const, label: "Check first", color: "bg-warning", ring: "ring-warning", desc: "Could be partly right" },
  { value: "red" as const, label: "Don't trust", color: "bg-danger", ring: "ring-danger", desc: "Probably wrong" },
];

function TrustLight() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [light, setLight] = useState<"green" | "yellow" | "red" | null>(null);
  const [reasons, setReasons] = useState<string[]>([]);
  const [explanation, setExplanation] = useState("");
  const total = TRUST_LIGHT_SCENARIOS.length;
  const scenario = TRUST_LIGHT_SCENARIOS[index];

  function toggleReason(r: string) {
    setReasons((rs) => (rs.includes(r) ? rs.filter((x) => x !== r) : [...rs, r]));
  }

  function submit() {
    if (!light) return;
    const correct = light === scenario.correctTrust;
    navigate({
      to: "/student/feedback",
      search: {
        game: "trust-light",
        correct: correct ? 1 : 0,
        score: correct ? 25 : 10,
        next: index + 1 < total ? index + 1 : -1,
        explanation: scenario.explanation,
      } as any,
    });
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      <div className="mb-6 flex items-center justify-between">
        <Link to="/student/games" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to games
        </Link>
        <div className="text-xs text-muted-foreground">
          Mission {index + 1} of {total}
        </div>
      </div>

      <Progress value={((index + 1) / total) * 100} className="mb-8 h-2" />

      <Card className="overflow-hidden rounded-3xl border-border/60 shadow-card">
        <div className="bg-gradient-card p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <ShieldCheck className="h-4 w-4" /> Trust Light
          </div>
          <h1 className="mt-2 text-2xl font-bold md:text-3xl">{scenario.question}</h1>
        </div>

        <div className="border-t border-border/60 p-6 md:p-8">
          <div className="rounded-2xl border border-border/60 bg-muted/40 p-5">
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">AI answered</div>
            <p className="text-base leading-relaxed">{scenario.aiAnswer}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-semibold">How much do you trust this answer?</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {LIGHTS.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setLight(l.value)}
                  className={`group rounded-2xl border-2 p-5 text-left transition-all ${
                    light === l.value
                      ? `border-transparent ring-4 ${l.ring}/30 shadow-soft bg-card`
                      : "border-border/60 hover:border-border"
                  }`}
                >
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${l.color} shadow-soft`} />
                  <div className="mt-3 font-semibold">{l.label}</div>
                  <div className="text-xs text-muted-foreground">{l.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-semibold">Why? Pick what fits</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {TRUST_REASONS.map((r) => {
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

          <div className="mt-8">
            <h2 className="text-sm font-semibold">Explain in your own words (optional)</h2>
            <Textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="What made you choose this trust level?"
              className="mt-3 min-h-[100px] rounded-2xl"
            />
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-40"
            >
              ← Previous
            </button>
            <Button onClick={submit} disabled={!light} size="lg" className="rounded-xl shadow-soft">
              Submit answer <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
}