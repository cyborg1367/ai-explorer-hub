import * as React from "react";
import { Card } from "@/components/ui/card";

interface KpiCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  hint?: string;
  tone?: "default" | "primary" | "success";
}

const TONE = {
  default: "bg-primary/10 text-primary",
  primary: "bg-gradient-hero text-primary-foreground",
  success: "bg-success/15 text-success",
} as const;

export function KpiCard({ icon, label, value, hint, tone = "default" }: KpiCardProps) {
  return (
    <Card className="rounded-3xl border-border/60 p-5 shadow-soft">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${TONE[tone]}`}>{icon}</div>
        <div className="min-w-0">
          <div className="truncate text-xs text-muted-foreground">{label}</div>
          <div className="text-xl font-bold leading-tight">{value}</div>
        </div>
      </div>
      {hint && <div className="mt-3 text-xs text-muted-foreground">{hint}</div>}
    </Card>
  );
}