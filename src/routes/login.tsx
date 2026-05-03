import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, GraduationCap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — AI Thinking Lab for Kids" },
      { name: "description", content: "Students join with a class code; teachers sign in to manage classes." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [code, setCode] = useState("AI-1020");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (role === "student") navigate({ to: "/student" });
    else navigate({ to: "/teacher" });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-20" />
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-12">
        <Card className="grid w-full overflow-hidden rounded-3xl border-border/60 shadow-card md:grid-cols-2">
          <div className="hidden flex-col justify-between bg-gradient-hero p-10 text-primary-foreground md:flex">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="font-semibold">AI Thinking Lab</span>
            </Link>
            <div>
              <h2 className="text-3xl font-bold leading-tight">Welcome back, thinker.</h2>
              <p className="mt-3 text-sm opacity-90">
                Play structured games. Build real AI literacy. No chatbots, no surprises — just thinking missions designed for the classroom.
              </p>
            </div>
            <div className="text-xs opacity-80">A safe sandbox for ages 10–12.</div>
          </div>

          <div className="p-8 md:p-10">
            <div className="mb-6 inline-flex rounded-full bg-muted p-1">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  role === "student" ? "bg-background text-foreground shadow-soft" : "text-muted-foreground"
                }`}
              >
                <BookOpen className="h-4 w-4" /> I'm a student
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  role === "teacher" ? "bg-background text-foreground shadow-soft" : "text-muted-foreground"
                }`}
              >
                <GraduationCap className="h-4 w-4" /> I'm a teacher
              </button>
            </div>

            <h1 className="text-2xl font-bold tracking-tight">
              {role === "student" ? "Join your class" : "Teacher sign in"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {role === "student"
                ? "Use the class code your teacher shared."
                : "Sign in to manage classes and view student progress."}
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              {role === "student" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="code">Class code</Label>
                    <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} className="rounded-xl text-lg tracking-widest" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nick">Nickname</Label>
                    <Input id="nick" placeholder="e.g. Aria" value={nickname} onChange={(e) => setNickname(e.target.value)} className="rounded-xl" />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="teacher@school.org" defaultValue="ms.parker@school.org" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pw">Password</Label>
                    <Input id="pw" type="password" defaultValue="demo-password" className="rounded-xl" />
                  </div>
                </>
              )}
              <Button type="submit" size="lg" className="w-full rounded-xl shadow-soft">
                {role === "student" ? "Enter the lab" : "Sign in"}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              This is a prototype. No data is stored.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}