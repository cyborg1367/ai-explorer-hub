import * as React from "react";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export type FeedbackTone = "success" | "partial" | "review" | "info";

interface FeedbackPanelProps {
  tone: FeedbackTone;
  title: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

const TONE: Record<FeedbackTone, { wrap: string; ring: string; iconColor: string }> = {
  success: { wrap: "bg-success/10 border-success/30", ring: "ring-success/30", iconColor: "text-success" },
  partial: { wrap: "bg-warning/15 border-warning/30", ring: "ring-warning/30", iconColor: "text-warning-foreground" },
  review: { wrap: "bg-danger/10 border-danger/30", ring: "ring-danger/30", iconColor: "text-danger" },
  info: { wrap: "bg-muted border-border/60", ring: "ring-border", iconColor: "text-muted-foreground" },
};

export function FeedbackPanel({ tone, title, children, icon }: FeedbackPanelProps) {
  const t = TONE[tone];
  const defaultIcon =
    tone === "success" ? <CheckCircle2 className="h-5 w-5" /> :
    tone === "partial" ? <AlertCircle className="h-5 w-5" /> :
    tone === "review" ? <AlertCircle className="h-5 w-5" /> :
    <Info className="h-5 w-5" />;
  return (
    <div className={`rounded-2xl border p-4 ${t.wrap}`}>
      <div className="flex items-start gap-3">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background ${t.iconColor} shadow-soft`}>
          {icon ?? defaultIcon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold">{title}</div>
          {children && <div className="mt-1 text-sm text-muted-foreground">{children}</div>}
        </div>
      </div>
    </div>
  );
}