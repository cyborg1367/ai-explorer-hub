import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import type { Student } from "@/lib/mock-data";

export function RosterTable({ students }: { students: Student[] }) {
  return (
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
          {students.map((s) => (
            <tr key={s.id} className="transition-colors hover:bg-muted/30">
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
  );
}