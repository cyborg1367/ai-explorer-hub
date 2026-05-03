import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { CheckCircle2, AlertCircle, ArrowRight, BookOpen } from "lucide-react";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const search = z.object({
  game: z.enum(["trust-light", "prompt-battle"]).default("trust-light"),
  correct: z.coerce.number().default(1),
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
  const correct = s.correct === 1;
  const isLast = s.next === -1;

  function next() {
    if (isLast) {
      navigate({ to: "/student/summary", search: { game: s.game, score: s.score + 80 } as any });
    } else {
      navigate({
        to: s.game === "trust-light" ? "/student/games/trust-light" : "/student/games/prompt-battle",
      });
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 md:px-6">
      <Card className="overflow-hidden rounded-3xl border-border/60 shadow-card">
        <div className={`p-8 text-center ${correct ? "bg-success/10" : "bg-warning/15"}`}>
          {correct ? (
            <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
          ) : (
            <AlertCircle className="mx-auto h-16 w-16 text-warning-foreground" />
          )}
          <h1 className="mt-4 text-2xl font-bold md:text-3xl">
            {correct ? "Nice thinking!" : "Good try — let's review"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {correct ? "You earned" : "You earned"} <span className="font-semibold text-foreground">+{s.score} points</span>
          </p>
        </div>

        <div className="border-t border-border/60 p-8">
          <div className="rounded-2xl border border-border/60 bg-muted/40 p-5">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Why</div>
            <p className="text-sm leading-relaxed">{s.explanation}</p>
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