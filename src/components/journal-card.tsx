interface JournalCardProps {
  entry: { id: string; game: string; date: string; prompt: string; text: string };
  compact?: boolean;
}

export function JournalCard({ entry, compact }: JournalCardProps) {
  return (
    <article className={`rounded-2xl border border-border/60 bg-background ${compact ? "p-3" : "p-4"}`}>
      <header className="flex items-center justify-between text-xs">
        <span className="rounded-full bg-secondary px-2 py-0.5 font-medium">{entry.game}</span>
        <time className="text-muted-foreground">{entry.date}</time>
      </header>
      {!compact && (
        <div className="mt-2 text-xs font-medium text-muted-foreground">{entry.prompt}</div>
      )}
      <p className={`mt-${compact ? 2 : 1} text-sm leading-relaxed`}>{entry.text}</p>
    </article>
  );
}