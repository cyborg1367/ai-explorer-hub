interface Attempt {
  id: string;
  game: string;
  item: string;
  result: string;
  score: number;
  time: string;
}

export function AttemptHistory({ attempts }: { attempts: Attempt[] }) {
  return (
    <ul className="divide-y divide-border/60">
      {attempts.map((a) => {
        const positive = a.result === "Correct";
        return (
          <li key={a.id} className="flex items-center justify-between gap-3 py-3 text-sm">
            <div className="min-w-0">
              <div className="truncate font-medium">{a.item}</div>
              <div className="text-xs text-muted-foreground">
                {a.game} · {a.time}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  positive ? "bg-success/15 text-success" : "bg-warning/20 text-warning-foreground"
                }`}
              >
                {a.result}
              </span>
              <span className="font-mono text-xs text-muted-foreground">+{a.score}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}