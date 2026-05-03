import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Sparkles, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  DEMO_STUDENTS,
  SKILL_CATEGORIES,
  SKILL_SCORES,
  RECENT_ATTEMPTS,
  JOURNAL_ENTRIES,
  GAMES,
} from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/student/$studentId")({
  head: () => ({ meta: [{ title: "Student report — AI Thinking Lab" }] }),
  component: StudentReport,
});

function StudentReport() {
  const { studentId } = Route.useParams();
  const s = DEMO_STUDENTS.find((x) => x.id === studentId) ?? DEMO_STUDENTS[0];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <Link to="/teacher/class/$classId" params={{ classId: "demo" }} className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to class
      </Link>

      <header className="overflow-hidden rounded-3xl bg-gradient-hero p-8 text-primary-foreground shadow-card">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold backdrop-blur">
            {s.nickname[0]}
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider opacity-90">Student report</div>
            <h1 className="mt-1 text-3xl font-bold">{s.nickname}</h1>
            <div className="mt-1 text-sm opacity-90">
              {s.attempts} attempts · {s.totalScore} points · last seen {s.latestActivity}
            </div>
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="rounded-3xl border-border/60 p-6 shadow-soft lg:col-span-2">
          <h2 className="text-lg font-semibold">Skill scores</h2>
          <p className="mt-1 text-xs text-muted-foreground">Where {s.nickname}'s thinking is growing.</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {SKILL_CATEGORIES.map((sk) => (
              <li key={sk}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">{sk}</span>
                  <span className="text-muted-foreground">{SKILL_SCORES[sk]}</span>
                </div>
                <Progress value={SKILL_SCORES[sk]} className="h-1.5" />
              </li>
            ))}
          </ul>
        </Card>

        <Card className="rounded-3xl border-border/60 p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Game progress</h2>
          <ul className="mt-4 space-y-3">
            {GAMES.filter((g) => !g.locked).map((g) => (
              <li key={g.id} className="rounded-2xl border border-border/60 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{g.emoji}</span>
                    <div className="text-sm font-medium">{g.title}</div>
                  </div>
                  <span className="text-xs text-muted-foreground">{g.progress}/{g.totalItems}</span>
                </div>
                <Progress value={(g.progress / g.totalItems) * 100} className="mt-2 h-1.5" />
              </li>
            ))}
          </ul>
        </Card>

        <Card className="rounded-3xl border-border/60 p-6 shadow-soft">
          <h2 className="flex items-center gap-2 text-lg font-semibold"><Sparkles className="h-4 w-4 text-primary" /> Recent attempts</h2>
          <ul className="mt-4 divide-y divide-border/60">
            {RECENT_ATTEMPTS.map((a) => (
              <li key={a.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <div className="font-medium">{a.item}</div>
                  <div className="text-xs text-muted-foreground">{a.game} · {a.time}</div>
                </div>
                <span className="font-mono text-xs text-muted-foreground">+{a.score}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="rounded-3xl border-border/60 p-6 shadow-soft">
          <h2 className="flex items-center gap-2 text-lg font-semibold"><BookOpen className="h-4 w-4 text-primary" /> Journal entries</h2>
          <ul className="mt-4 space-y-3">
            {JOURNAL_ENTRIES.map((j) => (
              <li key={j.id} className="rounded-2xl border border-border/60 bg-background p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-secondary px-2 py-0.5 font-medium">{j.game}</span>
                  <span className="text-muted-foreground">{j.date}</span>
                </div>
                <p className="mt-2 text-sm">{j.text}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="rounded-3xl border-border/60 p-6 shadow-soft lg:col-span-3">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/40 text-accent-foreground">
              <Award className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Parent-friendly summary</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.nickname} is building strong <strong className="text-foreground">critical thinking</strong> and
                <strong className="text-foreground"> fact-checking</strong> habits. They notice when AI sounds confident but is
                wrong, and they're starting to ask clearer questions. Next focus: <strong className="text-foreground">privacy
                awareness</strong> and <strong className="text-foreground">fairness</strong> — we'll cover these in upcoming missions.
              </p>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="rounded-full">Share with parents</Button>
                <Button variant="ghost" size="sm" className="rounded-full">Print PDF</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}