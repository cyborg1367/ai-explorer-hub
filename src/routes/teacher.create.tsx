import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/teacher/create")({
  head: () => ({ meta: [{ title: "Create class — AI Thinking Lab" }] }),
  component: CreateClass,
});

function CreateClass() {
  const navigate = useNavigate();
  const [name, setName] = useState("Grade 5C Critical Thinkers");
  const [age, setAge] = useState("10–12");
  const [code] = useState("AI-" + Math.floor(1000 + Math.random() * 9000));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/teacher" });
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

        <form onSubmit={submit} className="space-y-5 border-t border-border/60 p-8">
          <div className="space-y-2">
            <Label htmlFor="name">Class name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="age">Age group</Label>
              <Input id="age" value={age} onChange={(e) => setAge(e.target.value)} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Class code (auto)</Label>
              <div className="flex h-10 items-center justify-between rounded-xl border border-border/60 bg-muted px-3 font-mono text-sm">
                <span>{code}</span>
                <span className="text-xs font-sans text-muted-foreground">share with students</span>
              </div>
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
            <Button type="submit" size="lg" className="rounded-xl shadow-soft">Create class</Button>
          </div>
        </form>
      </Card>
    </main>
  );
}