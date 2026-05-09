import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Trophy, Sparkles, BookOpen, Target, Award, ArrowRight } from "lucide-react";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MISSIONS, SKILL_LABELS_FA } from "@/lib/mock-data";

const search = z.object({
  game: z.enum(["trust-light", "prompt-battle"]).default("trust-light"),
  score: z.coerce.number().default(0),
  solved: z.coerce.number().default(0),
  total: z.coerce.number().default(3),
  evidence: z.coerce.number().default(0),
});

export const Route = createFileRoute("/student/summary")({
  head: () => ({ meta: [{ title: "Mission report — AI Thinking Lab" }] }),
  validateSearch: (s) => search.parse(s),
  component: Summary,
});

function Summary() {
  const s = useSearch({ from: "/student/summary" });
  const meta = MISSIONS[s.game as "trust-light" | "prompt-battle"];
  const reportTitle = s.game === "trust-light" ? "گزارش مأموریت" : "گزارش میدان";
  const accuracy = s.total > 0 ? Math.round((s.solved / s.total) * 100) : 0;
  const evidenceLabel = s.game === "trust-light" ? "نشانه‌های جمع‌شده" : "پرامپت‌های بهبودیافته";

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-12">
      <Card className="overflow-hidden rounded-3xl border-border/60 shadow-card">
        <div className="bg-gradient-hero p-8 text-center text-primary-foreground md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
            <Trophy className="h-3.5 w-3.5" /> {reportTitle}
          </div>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">{meta.missionTitle}</h1>
          <p className="mt-2 text-sm opacity-90">
            همه {meta.unitLabelPlural} را در نقش {meta.role} کامل کردی.
          </p>

          {/* Badge */}
          <div className="mx-auto mt-6 inline-flex flex-col items-center rounded-3xl bg-white/15 p-5 backdrop-blur">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl shadow-soft">
              {meta.badgeEmoji}
            </div>
            <div className="mt-3 text-[11px] tracking-wider opacity-90">نشان به دست آمده</div>
            <div className="text-base font-bold">{meta.badgeName}</div>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-4 md:p-8">
          <Stat icon={<Target className="h-5 w-5 text-success" />} label={`${meta.unitLabelPlural} حل‌شده`} value={`${s.solved}/${s.total}`} />
          <Stat icon={<Sparkles className="h-5 w-5 text-primary" />} label="امتیاز مهارت" value={`+${s.score}`} />
          <Stat icon={<BookOpen className="h-5 w-5 text-accent-foreground" />} label="دقت" value={`${accuracy}٪`} />
          <Stat icon={<Award className="h-5 w-5 text-warning-foreground" />} label={evidenceLabel} value={String(s.evidence)} />
        </div>

        <div className="border-t border-border/60 p-6 md:p-8">
          <h2 className="text-sm font-semibold">مهارت‌هایی که تمرین کردی</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {meta.skills.map((sk) => (
              <span key={sk} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">{SKILL_LABELS_FA[sk]}</span>
            ))}
          </div>

          {/* Suggested next mission */}
          <div className="mt-6 rounded-2xl border border-border/60 bg-gradient-card p-5">
            <div className="text-[11px] font-semibold tracking-wider text-primary">مأموریت پیشنهادی بعدی</div>
            <div className="mt-1 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>{meta.nextMission.emoji}</span>
                <div>
                  <div className="text-sm font-semibold">{meta.nextMission.title}</div>
                  <div className="text-xs text-muted-foreground">{meta.nextMission.tagline}</div>
                </div>
              </div>
              <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium text-muted-foreground">به‌زودی</span>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button asChild variant="outline" className="rounded-xl">
              <Link to="/student/journal">نوشتن یادداشت فکری</Link>
            </Button>
            <Button asChild size="lg" className="rounded-xl shadow-soft">
              <Link to="/student/games">بازگشت به مأموریت‌ها <ArrowRight className="mr-1 h-4 w-4 rotate-180" /></Link>
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-gradient-card p-4 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-soft">{icon}</div>
      <div className="mt-2 text-xs text-muted-foreground">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}