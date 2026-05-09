import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, FileText, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MissionShell } from "@/components/mission-shell";
import { MicroFeedback, type MicroResult } from "@/components/micro-feedback";
import { MISSIONS, TRUST_LIGHT_SCENARIOS, TRUST_REASONS } from "@/lib/mock-data";

export const Route = createFileRoute("/student/games/trust-light")({
  head: () => ({ meta: [{ title: "AI Detective: Trust Lab — AI Thinking Lab" }] }),
  component: TrustLight,
});

const LIGHTS = [
  { value: "green" as const, label: "اعتماد کن", color: "bg-success", ring: "ring-success", desc: "نشانه‌ها درست است" },
  { value: "yellow" as const, label: "اول بررسی کن", color: "bg-warning", ring: "ring-warning", desc: "مشکوک — بررسی کن" },
  { value: "red" as const, label: "اعتماد نکن", color: "bg-danger", ring: "ring-danger", desc: "احتمالاً نادرست" },
];

function TrustLight() {
  const navigate = useNavigate();
  const meta = MISSIONS["trust-light"];
  const cases = TRUST_LIGHT_SCENARIOS.slice(0, 3);
  const total = cases.length;

  const [index, setIndex] = useState(0);
  const [light, setLight] = useState<"green" | "yellow" | "red" | null>(null);
  const [reasons, setReasons] = useState<string[]>([]);
  const [explanation, setExplanation] = useState("");
  const [submitted, setSubmitted] = useState<null | { result: MicroResult; points: number; clues: string[] }>(null);

  // running tallies
  const [solved, setSolved] = useState(0);
  const [score, setScore] = useState(0);
  const [evidenceCount, setEvidenceCount] = useState(0);

  const scenario = cases[index];
  const meter = Math.min(100, Math.round((score / (total * 30)) * 100));

  function toggleReason(r: string) {
    if (submitted) return;
    setReasons((rs) => (rs.includes(r) ? rs.filter((x) => x !== r) : [...rs, r]));
  }

  function submit() {
    if (!light || reasons.length === 0) return;
    const correct = light === scenario.correctTrust;
    const partial =
      !correct && (light === "yellow" || scenario.correctTrust === "yellow");
    const result: MicroResult = correct ? "correct" : partial ? "partial" : "review";
    const points = correct ? 25 : partial ? 15 : 8;
    setScore((s) => s + points);
    setEvidenceCount((c) => c + reasons.length);
    if (correct) setSolved((n) => n + 1);
    setSubmitted({ result, points, clues: reasons });
  }

  function next() {
    if (!submitted) return;
    if (index + 1 >= total) {
      navigate({
        to: "/student/summary",
        search: {
          game: "trust-light",
          score: score,
          solved,
          total,
          evidence: evidenceCount,
        },
      });
      return;
    }
    setIndex((i) => i + 1);
    setLight(null);
    setReasons([]);
    setExplanation("");
    setSubmitted(null);
  }

  const headline =
    submitted?.result === "correct" ? "پرونده حل شد — نشانه‌های قوی!" :
    submitted?.result === "partial" ? "نزدیک بود — چند نشانه را جا انداختی" :
    "یک نشانه مهم از دست رفت — پرونده را دوباره بررسی کن";

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
      {/* Case file */}
      <section className="rounded-2xl border-2 border-dashed border-border/70 bg-gradient-card p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <FileText className="h-4 w-4" /> پرونده شماره {index + 1}
        </div>
        <h2 className="mt-2 text-lg font-bold md:text-xl">سؤال در حال بررسی</h2>
        <p className="mt-1 text-sm">{scenario.question}</p>
        <div className="mt-4 rounded-2xl border border-border/60 bg-background/80 p-4">
          <div className="text-[11px] font-semibold tracking-wider text-muted-foreground">پاسخ AI</div>
          <p className="mt-1 text-sm leading-relaxed">{scenario.aiAnswer}</p>
        </div>
        <p className="mt-3 inline-flex items-start gap-2 rounded-xl bg-background/70 p-2.5 text-[11px] text-muted-foreground">
          <Lightbulb className="mt-0.5 h-3.5 w-3.5 text-primary" />
          نکته کارآگاهی: به دنبال تاریخ‌ها، نام‌ها و ادعاهایی باش که بتوانی تأیید کنی.
        </p>
      </section>

      {/* Decision */}
      <section className="mt-6">
        <h3 className="text-sm font-semibold">گام ۱ — یک چراغ اعتماد انتخاب کن</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {LIGHTS.map((l) => {
            const active = light === l.value;
            return (
              <button
                key={l.value}
                onClick={() => !submitted && setLight(l.value)}
                disabled={!!submitted}
                aria-pressed={active}
                className={`rounded-2xl border-2 p-4 text-left transition-all disabled:opacity-70 ${
                  active
                    ? `border-transparent ring-4 ${l.ring}/30 bg-card shadow-soft`
                    : "border-border/60 hover:border-border hover:bg-muted/40"
                }`}
              >
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${l.color} shadow-soft`} />
                <div className="mt-2 text-sm font-semibold">{l.label}</div>
                <div className="text-xs text-muted-foreground">{l.desc}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Evidence */}
      <section className="mt-6">
        <h3 className="text-sm font-semibold">
          گام ۲ — نشانه‌ها را جمع کن <span className="text-muted-foreground">(حداقل یکی انتخاب کن)</span>
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {TRUST_REASONS.map((r) => {
            const active = reasons.includes(r);
            return (
              <button
                key={r}
                onClick={() => toggleReason(r)}
                disabled={!!submitted}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors disabled:opacity-70 ${
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                {r}
              </button>
            );
          })}
        </div>
      </section>

      {/* Optional explanation */}
      <section className="mt-6">
        <h3 className="text-sm font-semibold">
          گام ۳ — یادداشت کارآگاهی <span className="font-normal text-muted-foreground">(اختیاری)</span>
        </h3>
        <Textarea
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          disabled={!!submitted}
          placeholder="یک یادداشت کوتاه درباره دلیل شک یا اطمینانت بنویس…"
          className="mt-3 min-h-[90px] rounded-2xl"
        />
      </section>

      {/* Submit / micro-feedback */}
      {!submitted ? (
        <div className="mt-7 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {!light ? "برای ادامه یک چراغ اعتماد انتخاب کن." : reasons.length === 0 ? "حداقل یک نشانه اضافه کن." : "هر وقت آماده‌ای ادامه بده."}
          </p>
          <Button onClick={submit} disabled={!light || reasons.length === 0} size="lg" className="rounded-xl shadow-soft">
            ثبت پرونده <ArrowRight className="mr-1 h-4 w-4 rotate-180" />
          </Button>
        </div>
      ) : (
        <div className="mt-7 space-y-4">
          <MicroFeedback
            result={submitted.result}
            headline={headline}
            detail={scenario.explanation}
            cluesFound={submitted.clues}
            pointsEarned={submitted.points}
            meterLabel={meta.meterLabel}
          />
          <div className="flex items-center justify-end">
            <Button onClick={next} size="lg" className="rounded-xl shadow-soft">
              {index + 1 >= total ? "مشاهده گزارش مأموریت" : "پرونده بعدی"} <ArrowRight className="mr-1 h-4 w-4 rotate-180" />
            </Button>
          </div>
        </div>
      )}
    </MissionShell>
  );
}