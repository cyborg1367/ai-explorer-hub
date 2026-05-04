import { Link } from "@tanstack/react-router";
import { ArrowRight, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ClassCardProps {
  classRoom: { id: string; name: string; code: string; students: number; attempts: number; latest: string };
  variant?: "row" | "tile";
}

export function ClassCard({ classRoom, variant = "tile" }: ClassCardProps) {
  const empty = classRoom.students === 0;
  if (variant === "row") {
    return (
      <Link
        to="/teacher/class/$classId"
        params={{ classId: classRoom.id }}
        className="flex items-center justify-between gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2 truncate font-medium">
            {classRoom.name}
            {empty && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                New
              </span>
            )}
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            Code <span className="font-mono">{classRoom.code}</span> · {classRoom.students} students · last activity {classRoom.latest}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <div className="text-right text-sm">
            <div className="font-semibold">{classRoom.attempts}</div>
            <div className="text-xs text-muted-foreground">attempts</div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </Link>
    );
  }
  return (
    <Link to="/teacher/class/$classId" params={{ classId: classRoom.id }}>
      <Card className="rounded-3xl border-border/60 p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </div>
          {empty && (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              New
            </span>
          )}
        </div>
        <div className="mt-4 font-semibold">{classRoom.name}</div>
        <div className="text-xs text-muted-foreground">Code <span className="font-mono">{classRoom.code}</span></div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>{classRoom.students} students</span>
          <span>{classRoom.attempts} attempts</span>
        </div>
      </Card>
    </Link>
  );
}