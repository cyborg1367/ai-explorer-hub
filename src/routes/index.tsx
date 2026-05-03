import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, Sparkles, Users, BookOpen, ArrowRight, Lock, Brain, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Thinking Lab for Kids — A safe space to learn AI literacy" },
      { name: "description", content: "A game-based AI literacy platform for ages 10–12. Build critical thinking, fact-checking, and prompt skills — designed for the classroom." },
      { property: "og:title", content: "AI Thinking Lab for Kids" },
      { property: "og:description", content: "Game-based AI literacy for the classroom — not a chatbot." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="marketing" />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-15" />
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Built for classrooms · ages 10–12
              </div>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                AI literacy that feels like a <span className="bg-gradient-hero bg-clip-text text-transparent">game</span>.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                Structured thinking missions teach kids to question, fact-check, and create with AI — safely.
                Not a chatbot. Not a companion. A real learning tool.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-xl shadow-soft">
                  <Link to="/login">Try the demo <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl">
                  <Link to="/teacher">For teachers</Link>
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-success" /> Safe by design</span>
                <span className="inline-flex items-center gap-1"><Lock className="h-4 w-4 text-primary" /> No personal data</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-hero opacity-20 blur-3xl" />
              <Card className="rotate-1 rounded-3xl border-border/60 bg-gradient-card p-6 shadow-card">
                <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> Trust Light</span>
                  <span>Mission 2 of 5</span>
                </div>
                <h3 className="mt-3 text-xl font-bold">Who invented the telephone?</h3>
                <div className="mt-4 rounded-2xl border border-border/60 bg-background/80 p-4 text-sm">
                  "The telephone was invented in 1672 by Thomas Edison in Germany."
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    ["bg-success", "Trust"],
                    ["bg-warning", "Check"],
                    ["bg-danger ring-4 ring-danger/30", "Don't trust"],
                  ].map(([c, l]) => (
                    <div key={l} className="rounded-2xl border border-border/60 bg-background p-3 text-center">
                      <span className={`mx-auto block h-6 w-6 rounded-full ${c}`} />
                      <div className="mt-1.5 text-xs font-medium">{l}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">Six skills. One safe playground.</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Each game is a structured mission — no open chat, no surprises.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: <Brain className="h-5 w-5" />, title: "Critical thinking", desc: "Decide what to trust and why." },
            { icon: <BookOpen className="h-5 w-5" />, title: "Prompt clarity", desc: "Learn to ask good questions." },
            { icon: <ShieldCheck className="h-5 w-5" />, title: "Fact-checking", desc: "Spot AI mistakes and exaggerations." },
            { icon: <Sparkles className="h-5 w-5" />, title: "Creativity", desc: "Use AI to brainstorm — then choose." },
            { icon: <Lock className="h-5 w-5" />, title: "Privacy awareness", desc: "Know what not to share." },
            { icon: <Users className="h-5 w-5" />, title: "Reflection", desc: "Write thinking journals after every mission." },
          ].map((f) => (
            <Card key={f.title} className="rounded-3xl border-border/60 p-6 shadow-soft transition-shadow hover:shadow-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">{f.icon}</div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-hero p-10 text-primary-foreground shadow-card md:p-14">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur">
                <Trophy className="h-3.5 w-3.5" /> For teachers
              </div>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">See every student's thinking grow.</h2>
              <p className="mt-3 max-w-lg opacity-90">
                Roster view, skill scores, recent attempts, and parent-friendly summaries — all in one place.
              </p>
              <div className="mt-6 flex gap-3">
                <Button asChild size="lg" variant="secondary" className="rounded-xl">
                  <Link to="/teacher">Open teacher demo</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl border-white/40 bg-transparent text-primary-foreground hover:bg-white/10">
                  <Link to="/student">Try as student</Link>
                </Button>
              </div>
            </div>
            <ul className="space-y-3 text-sm">
              {["Class roster with status per game", "Skill summary across 9 categories", "Journal entries from every student", "Parent-friendly progress summary"].map((t) => (
                <li key={t} className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/30 text-xs">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        © 2026 AI Thinking Lab · A safe sandbox for AI literacy.
      </footer>
    </div>
  );
}
