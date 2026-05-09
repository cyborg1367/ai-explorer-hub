import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, PenLine, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { useMockQuery } from "@/hooks/use-mock-query";
import { mockApi } from "@/api/client";
import type { JournalEntry } from "@/lib/mock-data";

export const Route = createFileRoute("/student/journal")({
  head: () => ({ meta: [{ title: "Thinking Journal — AI Thinking Lab" }] }),
  component: Journal,
});

const PROMPTS = [
  "امروز چه چیزی بیشتر از همه تو را شگفت‌زده کرد؟",
  "کی به‌جای AI از معلم یا یک بزرگ‌تر می‌پرسی؟",
  "یک چیزی که قبل از باور کردن دوباره بررسی می‌کنی چیست؟",
  "این موضوع را چطور برای یک دانش‌آموز کوچک‌تر توضیح می‌دهی؟",
];

function Journal() {
  const [entry, setEntry] = useState("");
  const [prompt, setPrompt] = useState(PROMPTS[0]);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [optimistic, setOptimistic] = useState<JournalEntry[]>([]);
  const { data, loading, error, refetch } = useMockQuery(() => mockApi.getJournalEntries(), []);

  async function save() {
    setStatus("saving");
    setErrorMsg(null);
    const res = await mockApi.submitJournalEntry({ prompt, text: entry });
    if (res.ok) {
      setOptimistic((o) => [res.data, ...o]);
      setEntry("");
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1800);
    } else {
      setErrorMsg(res.error.message);
      setStatus("error");
    }
  }

  const entries = [...optimistic, ...(data ?? [])];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium">
          <BookOpen className="h-3.5 w-3.5" /> دفترچه فکر
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">درباره چیزی که یاد گرفتی فکر کن</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          نوشتن به ماندگاری فکر کمک می‌کند. یک سؤال انتخاب کن یا خودت بنویس.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-3xl border-border/60 p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <PenLine className="h-4 w-4 text-primary" /> یادداشت جدید
          </div>
          <div className="mt-4">
            <div className="text-xs font-medium tracking-wider text-muted-foreground">سؤال راهنما</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPrompt(p)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    prompt === p ? "border-primary bg-primary/10 text-primary" : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-border/60 bg-gradient-card p-4">
            <div className="text-sm font-medium">{prompt}</div>
            <Textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="چند جمله بنویس…"
              className="mt-3 min-h-[160px] rounded-xl border-border/60 bg-background"
              aria-invalid={!!errorMsg}
            />
            {errorMsg && (
              <p className="mt-2 flex items-center gap-1 text-xs text-danger" role="alert">
                <AlertCircle className="h-3 w-3" /> {errorMsg}
              </p>
            )}
            {status === "saved" && (
              <p className="mt-2 flex items-center gap-1 text-xs text-success" role="status">
                <CheckCircle2 className="h-3 w-3" /> در دفترچه‌ات ذخیره شد.
              </p>
            )}
            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-muted-foreground">{entry.length} کاراکتر</div>
              <Button onClick={save} disabled={status === "saving"} className="rounded-xl shadow-soft">
                {status === "saving" && <Loader2 className="h-4 w-4 animate-spin" />}
                {status === "saving" ? "در حال ذخیره…" : status === "saved" ? "ذخیره شد!" : "ذخیره یادداشت"}
              </Button>
            </div>
          </div>
        </Card>

        <Card className="rounded-3xl border-border/60 p-6 shadow-soft">
          <h2 className="text-sm font-semibold">یادداشت‌های قبلی</h2>
          {loading && <div className="mt-4"><LoadingState rows={2} variant="list" /></div>}
          {error && <div className="mt-4"><ErrorState error={error} onRetry={refetch} /></div>}
          {!loading && !error && entries.length === 0 && (
            <div className="mt-4">
              <EmptyState
                icon={<BookOpen className="h-5 w-5" />}
                title="هنوز یادداشتی نداری"
                description="یک سؤال انتخاب کن و اولین یادداشتت را بنویس."
              />
            </div>
          )}
          {!loading && !error && entries.length > 0 && (
            <ul className="mt-4 space-y-4">
              {entries.map((j) => (
                <li key={j.id} className="rounded-2xl border border-border/60 bg-background p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded-full bg-secondary px-2 py-0.5 font-medium">{j.game}</span>
                    <span className="text-muted-foreground">{j.date}</span>
                  </div>
                  <div className="mt-2 text-xs font-medium text-muted-foreground">{j.prompt}</div>
                  <p className="mt-1 text-sm leading-relaxed">{j.text}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </main>
  );
}