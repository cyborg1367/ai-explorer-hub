import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Sparkles, CheckCircle2, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EXISTING_CLASS_CODES } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/create")({
  head: () => ({ meta: [{ title: "Create class — AI Thinking Lab" }] }),
  component: CreateClass,
});

function randomCode() {
  return "AI-" + Math.floor(1000 + Math.random() * 9000);
}

type Status = "idle" | "loading" | "success";

function CreateClass() {
  const [name, setName] = useState("Grade 5C Critical Thinkers");
  const [age, setAge] = useState("10–12");
  const [code, setCode] = useState(randomCode());
  const [status, setStatus] = useState<Status>("idle");

  const trimmedName = name.trim();
  const codeFormatOk = /^AI-\d{4}$/.test(code);
  const duplicate = EXISTING_CLASS_CODES.includes(code);
  const nameTooShort = trimmedName.length < 3;
  const codeError = !codeFormatOk
    ? "Use the format AI-#### (e.g. AI-1020)."
    : duplicate
    ? "This code is already used. Try regenerating it."
    : null;
  const nameError = nameTooShort ? "Class name needs at least 3 characters." : null;
  const canSubmit = !codeError && !nameError && status !== "loading";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("loading");
    // Mock async creation
    setTimeout(() => setStatus("success"), 700);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <Link to="/teacher" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>

      <Card className="overflow-hidden rounded-3xl border-border/60 shadow-card">
        <div className="bg-gradient-card p-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-4 w-4" /> New class
          </div>
          <h1 className="mt-2 text-2xl font-bold md:text-3xl">Create a class for your students</h1>
          <p className="mt-1 text-sm text-muted-foreground">Students join by entering a class code and a nickname.</p>
        </div>

        {status === "success" && (
          <div className="border-t border-border/60 bg-success/10 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-success" />
              <div className="flex-1">
                <div className="text-sm font-semibold">Class created</div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Share <span className="font-mono font-semibold text-foreground">{code}</span> with your students so they can join.
                </p>
              </div>
              <Button asChild size="sm" className="rounded-xl">
                <Link to="/teacher">Back to dashboard</Link>
              </Button>
            </div>
          </div>
        )}

        <form onSubmit={submit} className="space-y-5 border-t border-border/60 p-8">
          <div className="space-y-2">
            <Label htmlFor="name">Class name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`rounded-xl ${nameError ? "border-danger focus-visible:ring-danger" : ""}`}
              aria-invalid={!!nameError}
            />
            {nameError && (
              <p className="flex items-center gap-1 text-xs text-danger">
                <AlertCircle className="h-3 w-3" /> {nameError}
              </p>
            )}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="age">Age group</Label>
              <Input id="age" value={age} onChange={(e) => setAge(e.target.value)} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Class code</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className={`flex-1 rounded-xl font-mono ${codeError ? "border-danger focus-visible:ring-danger" : ""}`}
                  aria-invalid={!!codeError}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setCode(randomCode())}
                  className="rounded-xl"
                  aria-label="Regenerate code"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              {codeError ? (
                <p className="flex items-center gap-1 text-xs text-danger">
                  <AlertCircle className="h-3 w-3" /> {codeError}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">Share this with your students.</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Active games</Label>
            <div className="flex flex-wrap gap-2">
              {["Trust Light", "Prompt Battle"].map((g) => (
                <span key={g} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  ✓ {g}
                </span>
              ))}
              {["AI Mistake Hunter", "Question Master", "Idea Factory", "Improve It"].map((g) => (
                <span key={g} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  🔒 {g}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button asChild type="button" variant="ghost" className="rounded-xl">
              <Link to="/teacher">Cancel</Link>
            </Button>
            <Button type="submit" size="lg" disabled={!canSubmit} className="rounded-xl shadow-soft">
              {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
              {status === "success" ? "Class created" : "Create class"}
            </Button>
          </div>
        </form>
      </Card>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Try entering <span className="font-mono">AI-1020</span> to see the duplicate-code state.
      </p>
    </main>
  );
}