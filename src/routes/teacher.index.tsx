import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Users, Activity, BarChart3, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TEACHER_CLASSES, SKILL_SCORES, SKILL_CATEGORIES, EMPTY_CLASS } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/")({
  head: () => ({ meta: [{ title: "Teacher dashboard — AI Thinking Lab" }] }),
  component: TeacherDashboard,
});

function TeacherDashboard() {
  const allClasses = [...TEACHER_CLASSES, EMPTY_CLASS];
  const totalStudents = allClasses.reduce((s, c) => s + c.students, 0);
  const totalAttempts = allClasses.reduce((s, c) => s + c.attempts, 0);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Ms. Parker</h1>
          <p className="mt-1 text-sm text-muted-foreground">Here's how your classes are thinking this week.</p>
        </div>
        <Button asChild className="rounded-xl shadow-soft">
          <Link to="/teacher/create"><Plus className="mr-1 h-4 w-4" /> New class</Link>
        </Button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={<Users className="h-5 w-5" />} label="Classes" value={String(TEACHER_CLASSES.length)} hint="active" />
        <KpiCard icon={<Users className="h-5 w-5" />} label="Students" value={String(totalStudents)} hint="across classes" />
        <KpiCard icon={<Activity className="h-5 w-5" />} label="Attempts" value={String(totalAttempts)} hint="this week" />
        <KpiCard icon={<BarChart3 className="h-5 w-5" />} label="Avg accuracy" value="78%" hint="↑ 6% vs last week" />
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        <Card className="rounded-3xl border-border/60 p-6 shadow-soft lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your classes</h2>
          </div>
          <ul className="divide-y divide-border/60">
            {allClasses.map((c) => (
              <li key={c.id}>
                <Link
                  to="/teacher/class/$classId"
                  params={{ classId: c.id }}
                  className="flex items-center justify-between gap-4 py-4 transition-colors hover:bg-muted/40"
                >
                  <div>
                    <div className="flex items-center gap-2 font-medium">
                      {c.name}
                      {c.students === 0 && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          New
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      Code <span className="font-mono">{c.code}</span> · {c.students} students · last activity {c.latest}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm">
                      <div className="font-semibold">{c.attempts}</div>
                      <div className="text-xs text-muted-foreground">attempts</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="rounded-3xl border-border/60 p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Skill summary</h2>
          <p className="mt-1 text-xs text-muted-foreground">Average skill scores across all students.</p>
          <ul className="mt-5 space-y-3">
            {SKILL_CATEGORIES.map((s) => (
              <li key={s}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium">{s}</span>
                  <span className="text-muted-foreground">{SKILL_SCORES[s]}</span>
                </div>
                <Progress value={SKILL_SCORES[s]} className="h-1.5" />
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </main>
  );
}

function KpiCard({ icon, label, value, hint }: { icon: React.ReactNode; label: string; value: string; hint: string }) {
  return (
    <Card className="rounded-3xl border-border/60 p-5 shadow-soft">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">{icon}</div>
        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="text-xl font-bold leading-tight">{value}</div>
        </div>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">{hint}</div>
    </Card>
  );
}