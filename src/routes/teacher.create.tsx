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
    ? "از قالب AI-#### استفاده کن (مثلاً AI-1020)."
    : duplicate
    ? "این کد کلاس قبلاً استفاده شده است. دوباره بساز."
    : null;
  const nameError = nameTooShort ? "نام کلاس باید حداقل ۳ کاراکتر باشد." : null;
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
        <ArrowLeft className="h-4 w-4 rotate-180" /> بازگشت به داشبورد
      </Link>

      <Card className="overflow-hidden rounded-3xl border-border/60 shadow-card">
        <div className="bg-gradient-card p-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-primary">
            <Sparkles className="h-4 w-4" /> کلاس جدید
          </div>
          <h1 className="mt-2 text-2xl font-bold md:text-3xl">یک کلاس برای دانش‌آموزانتان بسازید</h1>
          <p className="mt-1 text-sm text-muted-foreground">دانش‌آموزان با وارد کردن کد کلاس و نام مستعار وارد می‌شوند.</p>
        </div>

        {status === "success" && (
          <div className="border-t border-border/60 bg-success/10 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-success" />
              <div className="flex-1">
                <div className="text-sm font-semibold">کلاس با موفقیت ساخته شد</div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  کد <span className="font-mono font-semibold text-foreground">{code}</span> را با دانش‌آموزانتان به اشتراک بگذارید تا وارد شوند.
                </p>
              </div>
              <Button asChild size="sm" className="rounded-xl">
                <Link to="/teacher">بازگشت به داشبورد</Link>
              </Button>
            </div>
          </div>
        )}

        <form onSubmit={submit} className="space-y-5 border-t border-border/60 p-8">
          <div className="space-y-2">
            <Label htmlFor="name">نام کلاس</Label>
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
              <Label htmlFor="age">گروه سنی</Label>
              <Input id="age" value={age} onChange={(e) => setAge(e.target.value)} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">کد کلاس</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className={`flex-1 rounded-xl font-mono ${codeError ? "border-danger focus-visible:ring-danger" : ""}`}
                  dir="ltr"
                  aria-invalid={!!codeError}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setCode(randomCode())}
                  className="rounded-xl"
                  aria-label="ساخت دوباره کد"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              {codeError ? (
                <p className="flex items-center gap-1 text-xs text-danger">
                  <AlertCircle className="h-3 w-3" /> {codeError}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">این کد را با دانش‌آموزان به اشتراک بگذارید.</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>بازی‌های فعال</Label>
            <div className="flex flex-wrap gap-2">
              {["آزمایشگاه اعتماد", "میدان پرامپت"].map((g) => (
                <span key={g} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  ✓ {g}
                </span>
              ))}
              {["شکارچی خطای AI", "استاد سؤال‌ها", "کارخانه ایده", "بهترش کن"].map((g) => (
                <span key={g} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  🔒 {g}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button asChild type="button" variant="ghost" className="rounded-xl">
              <Link to="/teacher">انصراف</Link>
            </Button>
            <Button type="submit" size="lg" disabled={!canSubmit} className="rounded-xl shadow-soft">
              {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
              {status === "success" ? "ساخته شد" : "ذخیره کلاس"}
            </Button>
          </div>
        </form>
      </Card>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        برای دیدن حالت کد تکراری، <span className="font-mono">AI-1020</span> را وارد کنید.
      </p>
    </main>
  );
}