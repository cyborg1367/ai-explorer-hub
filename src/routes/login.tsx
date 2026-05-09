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
      { title: "ورود — آزمایشگاه فکر و هوش مصنوعی" },
      { name: "description", content: "دانش‌آموزان با کد کلاس وارد می‌شوند؛ مربیان برای مدیریت کلاس‌ها وارد می‌شوند." },
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
              <span className="font-semibold">آزمایشگاه AI</span>
            </Link>
            <div>
              <h2 className="text-3xl font-bold leading-tight">خوش برگشتی، متفکر.</h2>
              <p className="mt-3 text-sm opacity-90">
                بازی‌های ساختاریافته انجام بده و سواد واقعی هوش مصنوعی بساز. نه چت‌بات، نه غافلگیری — فقط مأموریت‌های فکری برای کلاس درس.
              </p>
            </div>
            <div className="text-xs opacity-80">بستری امن برای ۱۰ تا ۱۲ سال.</div>
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
                <BookOpen className="h-4 w-4" /> دانش‌آموز هستم
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  role === "teacher" ? "bg-background text-foreground shadow-soft" : "text-muted-foreground"
                }`}
              >
                <GraduationCap className="h-4 w-4" /> مربی هستم
              </button>
            </div>

            <h1 className="text-2xl font-bold tracking-tight">
              {role === "student" ? "ورود به کلاس" : "ورود مربی"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {role === "student"
                ? "از کد کلاسی که معلمت به تو داده استفاده کن."
                : "برای مدیریت کلاس‌ها و مشاهده پیشرفت دانش‌آموزان وارد شوید."}
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              {role === "student" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="code">کد کلاس</Label>
                    <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} className="rounded-xl text-lg tracking-widest font-mono" dir="ltr" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nick">نام مستعار</Label>
                    <Input id="nick" placeholder="مثلاً آریا" value={nickname} onChange={(e) => setNickname(e.target.value)} className="rounded-xl" />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">ایمیل</Label>
                    <Input id="email" type="email" placeholder="teacher@school.org" defaultValue="ms.parker@school.org" className="rounded-xl" dir="ltr" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pw">رمز عبور</Label>
                    <Input id="pw" type="password" defaultValue="demo-password" className="rounded-xl" dir="ltr" />
                  </div>
                </>
              )}
              <Button type="submit" size="lg" className="w-full rounded-xl shadow-soft">
                {role === "student" ? "ورود به آزمایشگاه" : "ورود"}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              این یک نمونه نمایشی است. هیچ اطلاعاتی ذخیره نمی‌شود.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}