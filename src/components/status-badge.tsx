import type { GameStatus } from "@/lib/mock-data";
import { STATUS_LABELS_FA } from "@/lib/mock-data";

export function StatusBadge({ status }: { status: GameStatus }) {
  const map: Record<GameStatus, string> = {
    "Not Started": "bg-muted text-muted-foreground",
    "In Progress": "bg-warning/20 text-warning-foreground",
    "Completed": "bg-success/20 text-success",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${map[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === "Completed" ? "bg-success" : status === "In Progress" ? "bg-warning" : "bg-muted-foreground"}`} />
      {STATUS_LABELS_FA[status]}
    </span>
  );
}