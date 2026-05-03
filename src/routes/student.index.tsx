import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Trophy, Target, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/status-badge";
import { DEMO_CLASS, GAMES, RECENT_ATTEMPTS } from "@/lib/mock-data";

export const Route = createFileRoute("/student/")({
  head: () => ({ meta: [{ title: "Student dashboard — AI Thinking Lab" }] }),
  component: StudentDashboard,
});

function StudentDashboard() {
  const active = GAMES.filter((g) => !g.locked);
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <section className="overflow-hidden rounded-3xl bg-gradient-hero p-8 text-primary-foreground shadow-card md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> {DEMO_CLASS.name}
            </div>
            <h1 className="mt-4 text-3xl font-bold md:text-4xl">Hi Aria 👋 ready to think?</h1>
            <p className="mt-2 max-w-xl text-sm opacity-90">
              You have 2 active games today. Keep your streak going and earn skill points.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <Stat icon={<Flame className="h-4 w-4" />} label="Streak" value="4 days" />
            <Stat icon={<Trophy className="h-4 w-4" />} label="Score" value="320" />
            <Stat icon={<Target className="h-4 w-4" />} label="Accuracy" value="86%" />
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 rounded-3xl border-border/60 p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Active games</h2>
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link to="/student/games">See all <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {active.map((g) => (
              <Link
                key={g.id}
                to={g.id === "trust-light" ? "/student/games/trust-light" : "/student/games/prompt-battle"}
                className="group block rounded-2xl border border-border/60 bg-gradient-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <div className="flex items-start justify-between">
                  <div className="text-3xl">{g.emoji}</div>
                  <StatusBadge status={g.status} />
                </div>
                <div className="mt-3 font-semibold">{g.title}</div>
                <div className="text-xs text-muted-foreground">{g.tagline}</div>
                <div className="mt-4">
                  <Progress value={(g.progress / g.totalItems) * 100} className="h-1.5" />
                  <div className="mt-1 text-xs text-muted-foreground">
                    {g.progress} / {g.totalItems} missions
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="rounded-3xl border-border/60 p-6 shadow-soft">
          <h2 className="mb-4 text-lg font-semibold">Class info</h2>
          <dl className="space-y-3 text-sm">
            <Row label="Class" value={DEMO_CLASS.name} />
            <Row label="Code" value={<span className="font-mono">{DEMO_CLASS.code}</span>} />
            <Row label="Age" value={DEMO_CLASS.ageGroup} />
            <Row label="Teacher" value={DEMO_CLASS.teacher} />
          </dl>
          <Button asChild variant="secondary" className="mt-5 w-full rounded-xl">
            <Link to="/student/journal">Open thinking journal</Link>
          </Button>
        </Card>
      </section>

      <section className="mt-8">
        <Card className="rounded-3xl border-border/60 p-6 shadow-soft">
          <h2 className="mb-4 text-lg font-semibold">Recent attempts</h2>
          <div className="divide-y divide-border/60">
            {RECENT_ATTEMPTS.map((a) => (
              <div key={a.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <div className="font-medium">{a.item}</div>
                  <div className="text-xs text-muted-foreground">{a.game} · {a.time}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${a.result === "Correct" ? "bg-success/15 text-success" : "bg-warning/20 text-warning-foreground"}`}>
                    {a.result}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">+{a.score}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
      <div className="flex items-center justify-center gap-1 text-xs opacity-90">{icon}{label}</div>
      <div className="mt-1 text-lg font-bold">{value}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}