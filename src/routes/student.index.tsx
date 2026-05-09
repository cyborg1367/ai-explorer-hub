import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Trophy, Target, Sparkles, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/status-badge";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";
import { useMockQuery } from "@/hooks/use-mock-query";
import { mockApi } from "@/api/client";

export const Route = createFileRoute("/student/")({
  head: () => ({ meta: [{ title: "Student dashboard — AI Thinking Lab" }] }),
  component: StudentDashboard,
});

function StudentDashboard() {
  const { data, loading, error, refetch } = useMockQuery(() => mockApi.getStudentDashboard(), []);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="h-44 animate-pulse rounded-3xl bg-gradient-card" />
        <div className="mt-8"><LoadingState rows={2} /></div>
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
  const active = data.activeGames;
  const accuracyPct = Math.round(data.accuracy * 100);
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <section className="overflow-hidden rounded-3xl bg-gradient-hero p-8 text-primary-foreground shadow-card md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> {data.className}
            </div>
            <h1 className="mt-4 text-3xl font-bold md:text-4xl">سلام {data.nickname} 👋 آماده‌ای فکر کنی؟</h1>
            <p className="mt-2 max-w-xl text-sm opacity-90">
              امروز {active.length} بازی فعال داری. روند خودت را ادامه بده و امتیاز مهارت بگیر.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <Stat icon={<Flame className="h-4 w-4" />} label="روز پیاپی" value={`${data.streakDays} روز`} />
            <Stat icon={<Trophy className="h-4 w-4" />} label="امتیاز" value={String(data.totalScore)} />
            <Stat icon={<Target className="h-4 w-4" />} label="دقت" value={`${accuracyPct}٪`} />
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 rounded-3xl border-border/60 p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">مأموریت‌های فعال</h2>
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link to="/student/games">مشاهده همه <ArrowRight className="mr-1 h-4 w-4 rotate-180" /></Link>
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
                    {g.progress} از {g.totalItems} مأموریت
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="rounded-3xl border-border/60 p-6 shadow-soft">
          <h2 className="mb-4 text-lg font-semibold">اطلاعات کلاس</h2>
          <dl className="space-y-3 text-sm">
            <Row label="کلاس" value={data.className} />
            <Row label="کد کلاس" value={<span className="font-mono">{data.classCode}</span>} />
            <Row label="گروه سنی" value={data.ageGroup} />
            <Row label="مربی" value={data.teacher} />
          </dl>
          <Button asChild variant="secondary" className="mt-5 w-full rounded-xl">
            <Link to="/student/journal">باز کردن دفترچه فکر</Link>
          </Button>
        </Card>
      </section>

      <section className="mt-8">
        <Card className="rounded-3xl border-border/60 p-6 shadow-soft">
          <h2 className="mb-4 text-lg font-semibold">تلاش‌های اخیر</h2>
          {data.recentAttempts.length === 0 ? (
            <EmptyState
              icon={<Sparkles className="h-5 w-5" />}
              title="هنوز تلاشی ثبت نشده"
              description="یک مأموریت شروع کن تا پاسخ‌های اخیرت اینجا نمایش داده شود."
            />
          ) : (
          <div className="divide-y divide-border/60">
            {data.recentAttempts.map((a) => (
              <div key={a.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <div className="font-medium">{a.item}</div>
                  <div className="text-xs text-muted-foreground">{a.game} · {a.time}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${a.result === "Correct" ? "bg-success/15 text-success" : "bg-warning/20 text-warning-foreground"}`}>
                    {a.result === "Correct" ? "درست" : "دوباره تلاش کن"}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">+{a.score}</span>
                </div>
              </div>
            ))}
          </div>
          )}
        </Card>
      </section>

      <section className="mt-8">
        <Card className="rounded-3xl border-border/60 p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Award className="h-5 w-5 text-primary" /> کارت‌های مهارت
            </h2>
            <span className="text-xs text-muted-foreground">{data.earnedCards.length} از ۹</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {data.earnedCards.map((s) => {
              const skillFa = SKILL_LABELS_FA[s.name];
              const lvlFa = SKILL_LEVEL_LABELS_FA[s.level];
              return (
              <div key={s.id} className="rounded-2xl border border-border/60 bg-gradient-card p-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl" aria-hidden>{s.emoji}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider ${
                    s.level === "Gold" ? "bg-warning/20 text-warning-foreground" :
                    s.level === "Silver" ? "bg-muted text-foreground" :
                    "bg-accent/40 text-accent-foreground"
                  }`}>
                    {lvlFa}
                  </span>
                </div>
                <div className="mt-2 text-sm font-semibold">{skillFa}</div>
                <div className="text-xs text-muted-foreground">به دست آمده {s.earnedOn}</div>
              </div>
              );
            })}
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