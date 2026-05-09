import { createFileRoute } from "@tanstack/react-router";
import { GameCard } from "@/components/game-card";
import { LockedFeatureCard } from "@/components/locked-feature-card";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { useMockQuery } from "@/hooks/use-mock-query";
import { mockApi } from "@/api/client";

export const Route = createFileRoute("/student/games")({
  head: () => ({ meta: [{ title: "Games — AI Thinking Lab" }] }),
  component: GamesList,
});

function GamesList() {
  const { data, loading, error, refetch } = useMockQuery(() => mockApi.getStudentGames(), []);
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">همه بازی‌های فکری</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          یک مأموریت انتخاب کن. هر بازی مهارت‌های فکری متفاوتی را تقویت می‌کند.
        </p>
      </header>

      {loading && <LoadingState rows={4} />}
      {error && <ErrorState error={error} onRetry={refetch} />}
      {data && (
        <>
          <section>
            <h2 className="mb-3 text-sm font-semibold tracking-wider text-muted-foreground">فعال</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.filter((g) => !g.locked).map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          </section>
          <section className="mt-10">
            <h2 className="mb-3 text-sm font-semibold tracking-wider text-muted-foreground">به‌زودی</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.filter((g) => g.locked).map((g) => (
                <LockedFeatureCard
                  key={g.id}
                  emoji={g.emoji}
                  title={g.title}
                  description={g.tagline}
                  unlockHint="پس از تمام شدن بازی‌های فعال کلاس، باز می‌شود."
                />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}