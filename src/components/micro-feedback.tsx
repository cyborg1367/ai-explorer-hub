import * as React from "react";
import { CheckCircle2, AlertCircle, XCircle, Sparkles } from "lucide-react";

export type MicroResult = "correct" | "partial" | "review";

interface MicroFeedbackProps {
  result: MicroResult;
  headline: string;
  detail?: React.ReactNode;
  cluesFound?: string[];
  pointsEarned: number;
  meterLabel: string;
}

const TONE: Record<MicroResult, { wrap: string; chip: string; icon: React.ReactNode }> = {
  correct: {
    wrap: "border-success/40 bg-success/10",
    chip: "bg-success/20 text-success",
    icon: <CheckCircle2 className="h-5 w-5 text-success" />,
  },
  partial: {
    wrap: "border-warning/40 bg-warning/15",
    chip: "bg-warning/30 text-warning-foreground",
    icon: <AlertCircle className="h-5 w-5 text-warning-foreground" />,
  },
  review: {
    wrap: "border-danger/40 bg-danger/10",
    chip: "bg-danger/20 text-danger",
    icon: <XCircle className="h-5 w-5 text-danger" />,
  },
};

export function MicroFeedback({ result, headline, detail, cluesFound, pointsEarned, meterLabel }: MicroFeedbackProps) {
  const t = TONE[result];
  return (
    <div className={`rounded-2xl border-2 p-5 ${t.wrap}`} role="status" aria-live="polite">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background shadow-soft">
          {t.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold">{headline}</h3>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${t.chip}`}>
              <Sparkles className="h-3 w-3" /> +{pointsEarned} {meterLabel}
            </span>
          </div>
          {detail && <p className="mt-1 text-sm text-muted-foreground">{detail}</p>}
          {cluesFound && cluesFound.length > 0 && (
            <div className="mt-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">نشانه‌هایی که پیدا کردی</div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {cluesFound.map((c) => (
                  <span key={c} className="rounded-full bg-background px-2.5 py-0.5 text-xs font-medium shadow-soft">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}