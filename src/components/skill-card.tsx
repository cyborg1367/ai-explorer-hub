import { Progress } from "@/components/ui/progress";
import type { SkillCategory } from "@/lib/mock-data";

interface SkillCardProps {
  skill: SkillCategory;
  score: number;
  emoji?: string;
  trend?: string;
}

const SKILL_EMOJI: Record<SkillCategory, string> = {
  "Question Quality": "❓",
  "Reasoning": "🧩",
  "Critical Thinking": "🧠",
  "Fact Checking": "🔎",
  "Creativity": "🎨",
  "Revision": "✏️",
  "Privacy Awareness": "🔒",
  "Fairness": "⚖️",
  "Reflection": "📓",
};

export function SkillCard({ skill, score, emoji, trend }: SkillCardProps) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden>{emoji ?? SKILL_EMOJI[skill]}</span>
          <span className="text-sm font-medium">{skill}</span>
        </div>
        <span className="font-mono text-sm font-semibold text-foreground">{score}</span>
      </div>
      <Progress value={score} className="mt-3 h-1.5" />
      {trend && <div className="mt-2 text-[11px] text-muted-foreground">{trend}</div>}
    </div>
  );
}