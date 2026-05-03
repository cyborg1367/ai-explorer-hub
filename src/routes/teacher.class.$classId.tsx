import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Copy, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { DEMO_STUDENTS, DEMO_CLASS, TEACHER_CLASSES } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/class/$classId")({
  head: () => ({ meta: [{ title: "Class roster — AI Thinking Lab" }] }),
  component: ClassDetail,
});

function ClassDetail() {
  const { classId } = Route.useParams();
  const cls = TEACHER_CLASSES.find((c) => c.id === classId) ?? TEACHER_CLASSES[0];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <Link to="/teacher" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All classes
      </Link>

      <header className="overflow-hidden rounded-3xl bg-gradient-card p-8 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Class</div>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">{cls.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {DEMO_STUDENTS.length} students</span>
              <span>·</span>
              <span>Age {DEMO_CLASS.ageGroup}</span>
            </div>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background p-4 shadow-soft">
            <div className="text-xs text-muted-foreground">Class code</div>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-mono text-2xl font-bold tracking-widest">{cls.code}</span>
              <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Card className="mt-8 overflow-hidden rounded-3xl border-border/60 shadow-soft">
        <div className="border-b border-border/60 p-5">
          <h2 className="text-lg font-semibold">Roster</h2>
          <p className="text-xs text-muted-foreground">Click a student to open their progress report.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 text-left font-medium">Nickname</th>
                <th className="px-5 py-3 text-left font-medium">Attempts</th>
                <th className="px-5 py-3 text-left font-medium">Latest activity</th>
                <th className="px-5 py-3 text-left font-medium">Trust Light</th>
                <th className="px-5 py-3 text-left font-medium">Prompt Battle</th>
                <th className="px-5 py-3 text-right font-medium">Score</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {DEMO_STUDENTS.map((s) => (
                <tr key={s.id} className="hover:bg-muted/30">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-hero text-sm font-semibold text-primary-foreground">
                        {s.nickname[0]}
                      </div>
                      <span className="font-medium">{s.nickname}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{s.attempts}</td>
                  <td className="px-5 py-4 text-muted-foreground">{s.latestActivity}</td>
                  <td className="px-5 py-4"><StatusBadge status={s.trustLight} /></td>
                  <td className="px-5 py-4"><StatusBadge status={s.promptBattle} /></td>
                  <td className="px-5 py-4 text-right font-semibold">{s.totalScore}</td>
                  <td className="px-5 py-4 text-right">
                    <Button asChild variant="ghost" size="sm" className="rounded-full">
                      <Link to="/teacher/student/$studentId" params={{ studentId: s.id }}>
                        Report <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  );
}