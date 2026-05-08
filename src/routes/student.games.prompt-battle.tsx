import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Lightbulb, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MissionShell } from "@/components/mission-shell";
import { MicroFeedback, type MicroResult } from "@/components/micro-feedback";
import { MISSIONS, PROMPT_BATTLE_ROUNDS, PROMPT_REASONS } from "@/lib/mock-data";

export const Route = createFileRoute("/student/games/prompt-battle")({
  head: () => ({ meta: [{ title: "Prompt Arena — AI Thinking Lab" }] }),
  component: PromptBattle,
});

const CRITERIA = ["Clarity", "Audience", "Detail", "Style", "Goal"];

function PromptBattle() {
  const navigate = useNavigate();
  const meta = MISSIONS["prompt-battle"];
  const rounds = PROMPT_BATTLE_ROUNDS.slice(0, 3);
  const total = rounds.length;

  const [index, setIndex] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [criteria, setCriteria] = useState<string[]>([]);
  const [improved, setImproved] = useState("");
  const [submitted, setSubmitted] = useState<null | { result: MicroResult; points: number; clues: string[] }>(null);

  // tallies
  const [strongPicks, setStrongPicks] = useState(0);
  const [improvements, setImprovements] = useState(0);
  const [score, setScore] = useState(0);

  const round = rounds[index];
  const meter = Math.min(100, Math.round((score / (total * 25)) * 100));

  function toggleCriterion(c: string) {
    if (submitted) return;
    setCriteria((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));
  }

  function submit() {
    if (!pick || criteria.length === 0) return;
    const chosen = round.prompts.find((p) => p.id === pick)!;
    const correct = chosen.better;
    const upgraded = improved.trim().length > 12;
    const partial = !correct && upgraded;
    const result: MicroResult = correct ? "correct" : partial ? "partial" : "review";
    const points = correct ? 20 : partial ? 12 : 6;
    setScore((s) => s + points + (upgraded ? 5 : 0));
    if (correct) setStrongPicks((n) => n + 1);
    if (upgraded) setImprovements((n) => n + 1);
    const clues = [...criteria, ...(upgraded ? ["Prompt upgraded"] : [])];
    setSubmitted({ result, points: points + (upgraded ? 5 : 0), clues });
  }

  function next() {
    if (!submitted) return;
    if (index + 1 >= total) {
      navigate({
        to: "/student/summary",
        search: {
          game: "prompt-battle",
          score,
          solved: strongPicks,
          total,
          evidence: improvements,
        },
      });
      return;
    }
    setIndex((i) => i + 1);
    setPick(null);
    setCriteria([]);
    setImproved("");
    setSubmitted(null);
  }

  const headline =
    submitted?.result === "correct" ? "Strong choice — clearer prompt wins!" :
    submitted?.result === "partial" ? "Not the strongest pick — but your upgrade helps" :
    "The other prompt had better context";

  return (
    <MissionShell
      role={meta.role}
      roleEmoji={meta.roleEmoji}
      missionTitle={meta.missionTitle}
      unitLabel={meta.unitLabel}
      unitLabelPlural={meta.unitLabelPlural}
      step={index}
      total={total}
      meterLabel={meta.meterLabel}
      meterValue={meter}
    >
      {/* Arena goal */}
      <section className="rounded-2xl border-2 border-dashed border-border/70 bg-gradient-card p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Target className="h-4 w-4" /> Arena goal
        </div>
        <h2 className="mt-2 text-lg font-bold md:text-xl">{round.goal}</h2>
        <p className="mt-3 inline-flex items-start gap-2 rounded-xl bg-background/70 p-2.5 text-[11px] text-muted-foreground">
          <Lightbulb className="mt-0.5 h-3.5 w-3.5 text-primary" />
          A strong prompt usually names <strong className="text-foreground">who, what, how long,</strong> and <strong className="text-foreground">tone</strong>.
        </p>
      </section>

      {/* Versus */}
      <section className="mt-6">
        <h3 className="text-sm font-semibold">Step 1 — Pick the stronger prompt</h3>
        <div className="mt-3 grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
          {round.prompts.map((p, i) => {
            const active = pick === p.id;
            return (
              <button
                key={p.id}
                onClick={() => !submitted && setPick(p.id)}
                disabled={!!submitted}
                aria-pressed={active}
                className={`group rounded-2xl border-2 p-5 text-left transition-all disabled:opacity-70 ${
                  active
                    ? "border-primary bg-primary/5 shadow-soft ring-2 ring-primary/30"
                    : "border-border/60 hover:border-border hover:bg-muted/30"
                } ${i === 1 ? "md:order-3" : ""}`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {active && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      <Sparkles className="h-3 w-3" /> Selected
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed">{p.text}</p>
              </button>
            );
          })}
          <div className="hidden items-center justify-center md:order-2 md:flex">
            <span className="rounded-full border border-border/60 bg-background px-3 py-1 text-xs font-bold text-muted-foreground">
              VS
            </span>
          </div>
        </div>
      </section>

      {/* Criteria */}
      <section className="mt-6">
        <h3 className="text-sm font-semibold">
          Step 2 — What makes it stronger? <span className="text-muted-foreground">(pick at least one)</span>
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {[...CRITERIA, ...PROMPT_REASONS].map((c) => {
            const active = criteria.includes(c);
            return (
              <button
                key={c}
                onClick={() => toggleCriterion(c)}
                disabled={!!submitted}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors disabled:opacity-70 ${
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>

      {/* Improve */}
      <section className="mt-6">
        <h3 className="text-sm font-semibold">
          Step 3 — Upgrade the weaker prompt <span className="font-normal text-muted-foreground">(optional, +5)</span>
        </h3>
        <Textarea
          value={improved}
          onChange={(e) => setImproved(e.target.value)}
          disabled={!!submitted}
          placeholder="Rewrite the weaker prompt with more clarity, audience, or detail…"
          className="mt-3 min-h-[90px] rounded-2xl"
        />
      </section>

      {!submitted ? (
        <div className="mt-7 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {!pick ? "Pick a prompt to continue." : criteria.length === 0 ? "Add at least one reason." : "Ready when you are."}
          </p>
          <Button onClick={submit} disabled={!pick || criteria.length === 0} size="lg" className="rounded-xl shadow-soft">
            Lock in pick <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="mt-7 space-y-4">
          <MicroFeedback
            result={submitted.result}
            headline={headline}
            detail={round.why}
            cluesFound={submitted.clues}
            pointsEarned={submitted.points}
            meterLabel={meta.meterLabel}
          />
          <div className="flex items-center justify-end">
            <Button onClick={next} size="lg" className="rounded-xl shadow-soft">
              {index + 1 >= total ? "View arena summary" : "Next round"} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </MissionShell>
  );
}