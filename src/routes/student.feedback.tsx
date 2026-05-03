import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FeedbackPanel } from "@/components/feedback-panel";

const search = z.object({
  game: z.enum(["trust-light", "prompt-battle"]).default("trust-light"),
  result: z.enum(["correct", "partial", "review"]).default("correct"),
  score: z.coerce.number().default(20),
  next: z.coerce.number().default(-1),
  explanation: z.string().default(""),
});

export const Route = createFileRoute("/student/feedback")({
  head: () => ({ meta: [{ title: "Feedback — AI Thinking Lab" }] }),
  validateSearch: (s) => search.parse(s),
  component: Feedback,
});

function Feedback() {
  const s = useSearch({ from: "/student/feedback" });
  const navigate = useNavigate();
  const isLast = s.next === -1;
  const tone = s.result === "correct" ? "success" : s.result === "partial" ? "partial" : "review";
  const title =
    s.result === "correct" ? "Nice thinking!" :
    s.result === "partial" ? "Almost there — let's sharpen it" :
    "Good try — let's review";
  const skillPoints =
    s.game === "trust-light"
      ? ["+1 Critical Thinking", "+1 Fact Checking"]
      : ["+1 Question Quality", "+1 Revision"];
  const journalPrompt =
    s.game === "trust-light"
      ? "What clue made you decide?"
      : "Why was your pick clearer?";

  function next() {
    if (isLast) {
      navigate({ to: "/student/summary", search: { game: s.game, score: s.score + 80 } });
    } else {
      navigate({
        to: s.game === "trust-light" ? "/student/games/trust-light" : "/student/games/prompt-battle",
      });
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 md:px-6">
      <Card className="overflow-hidden rounded-3xl border-border/60 shadow-card">
        <div className={`p-8 text-center ${
          tone === "success" ? "bg-success/10" : tone === "partial" ? "bg-warning/15" : "bg-danger/10"
        }`}>
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-background shadow-soft">
            <Sparkles className={`h-8 w-8 ${
              tone === "success" ? "text-success" : tone === "partial" ? "text-warning-foreground" : "text-danger"
            }`} />
          </div>
          <h1 className="mt-4 text-2xl font-bold md:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You earned <span className="font-semibold text-foreground">+{s.score} points</span>
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {skillPoints.map((sp) => (
              <span key={sp} className="rounded-full bg-background px-3 py-1 text-xs font-medium shadow-soft">
                {sp}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-border/60 p-8">
          <FeedbackPanel tone={tone} title="Why this answer">
            {s.explanation}
          </FeedbackPanel>

          <div className="mt-5 rounded-2xl border border-border/60 bg-gradient-card p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Journal prompt</div>
            <div className="mt-1 text-sm font-medium">{journalPrompt}</div>
            <p className="mt-1 text-xs text-muted-foreground">Open the journal to write a reflection — it deepens your thinking.</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button asChild variant="outline" className="rounded-xl">
              <Link to="/student/journal">
                <BookOpen className="mr-1 h-4 w-4" /> Write journal entry
              </Link>
            </Button>
            <Button onClick={next} size="lg" className="rounded-xl shadow-soft">
              {isLast ? "See summary" : "Next mission"} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
}