import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Gauge } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MissionShellProps {
  role: string;
  roleEmoji: string;
  missionTitle: string;
  unitLabel: string;          // "Case" / "Round"
  unitLabelPlural: string;
  step: number;               // 0-indexed
  total: number;
  meterLabel: string;
  meterValue: number;         // 0..100
  backTo?: string;
  backLabel?: string;
  children: React.ReactNode;
}

export function MissionShell({
  role, roleEmoji, missionTitle, unitLabel, unitLabelPlural,
  step, total, meterLabel, meterValue, backTo = "/student/games",
  backLabel = "خروج از مأموریت", children,
}: MissionShellProps) {
  const pct = Math.max(0, Math.min(100, meterValue));
  return (
    <main className="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8">
      <div className="mb-4 flex items-center justify-between text-sm">
        <Link to={backTo} className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 rotate-180" /> {backLabel}
        </Link>
        <div className="text-xs font-medium text-muted-foreground">
          {unitLabel} {Math.min(step + 1, total)} از {total}
        </div>
      </div>

      <Card className="overflow-hidden rounded-3xl border-border/60 shadow-card">
        <div className="bg-gradient-hero p-5 text-primary-foreground md:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
                <span aria-hidden>{roleEmoji}</span> نقش: {role}
              </div>
              <h1 className="mt-2 truncate text-xl font-bold md:text-2xl">{missionTitle}</h1>
            </div>
            <div className="hidden shrink-0 text-right sm:block">
              <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider opacity-90">
                <Gauge className="h-3.5 w-3.5" /> {meterLabel}
              </div>
              <div className="mt-1 text-lg font-bold">{pct}<span className="text-sm opacity-80">/100</span></div>
            </div>
          </div>

          {/* progress dots */}
          <div className="mt-4 flex items-center gap-2" aria-label={`${unitLabelPlural} progress`}>
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-all ${
                  i < step ? "bg-white" : i === step ? "bg-white/80 ring-2 ring-white/40" : "bg-white/25"
                }`}
              />
            ))}
          </div>

          {/* meter bar */}
          <div className="mt-3">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-[width] duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">{children}</div>
      </Card>
    </main>
  );
}