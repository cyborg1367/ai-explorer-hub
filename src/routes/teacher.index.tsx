import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Users, Activity, BarChart3, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { useMockQuery } from "@/hooks/use-mock-query";
import { mockApi } from "@/api/client";
import { SKILL_LABELS_FA } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/")({
  head: () => ({ meta: [{ title: "Teacher dashboard — AI Thinking Lab" }] }),
  component: TeacherDashboard,
});

function TeacherDashboard() {
  const { data, loading, error, refetch } = useMockQuery(() => mockApi.getTeacherDashboard(), []);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <LoadingState rows={4} />
      </main>
    );
  }
  if (error || !data) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <ErrorState error={error} onRetry={refetch} title="نتوانستیم داشبورد را بارگذاری کنیم" />
      </main>
    );
  }
  const allClasses = data.classes;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">خوش برگشتید، {data.teacherName}</h1>
          <p className="mt-1 text-sm text-muted-foreground">این هفته کلاس‌هایتان چطور فکر کرده‌اند.</p>
        </div>
        <Button asChild className="rounded-xl shadow-soft">
          <Link to="/teacher/create"><Plus className="ml-1 h-4 w-4" /> کلاس جدید</Link>
        </Button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={<Users className="h-5 w-5" />} label="کلاس‌ها" value={String(allClasses.length)} hint="فعال" />
        <KpiCard icon={<Users className="h-5 w-5" />} label="دانش‌آموزان" value={String(data.totalStudents)} hint="در همه کلاس‌ها" />
        <KpiCard icon={<Activity className="h-5 w-5" />} label="تلاش‌ها" value={String(data.totalAttempts)} hint="این هفته" />
        <KpiCard icon={<BarChart3 className="h-5 w-5" />} label="میانگین دقت" value={`${Math.round(data.averageAccuracy * 100)}٪`} hint="۶٪ نسبت به هفته قبل ↑" />
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        <Card className="rounded-3xl border-border/60 p-6 shadow-soft lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">کلاس‌های شما</h2>
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
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium tracking-wider text-muted-foreground">
                          جدید
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      کد <span className="font-mono">{c.code}</span> · {c.students} دانش‌آموز · آخرین فعالیت {c.latest}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm">
                      <div className="font-semibold">{c.attempts}</div>
                      <div className="text-xs text-muted-foreground">تلاش</div>
                    </div>
                    <ArrowRight className="h-4 w-4 rotate-180 text-muted-foreground" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="rounded-3xl border-border/60 p-6 shadow-soft">
          <h2 className="text-lg font-semibold">خلاصه مهارت‌ها</h2>
          <p className="mt-1 text-xs text-muted-foreground">میانگین امتیاز مهارت‌ها بین همه دانش‌آموزان.</p>
          <ul className="mt-5 space-y-3">
            {data.skillScores.map(({ skill, score }) => (
              <li key={skill}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium">{SKILL_LABELS_FA[skill]}</span>
                  <span className="text-muted-foreground">{score}</span>
                </div>
                <Progress value={score} className="h-1.5" />
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