import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, Sparkles, Users, BookOpen, ArrowRight, Lock, Brain, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "آزمایشگاه فکر و هوش مصنوعی — فضای امن یادگیری AI برای کودکان" },
      { name: "description", content: "بستر بازی‌محور سواد هوش مصنوعی برای ۱۰ تا ۱۲ سال — تقویت تفکر نقادانه، بررسی واقعیت و مهارت پرامپت‌نویسی برای کلاس درس." },
      { property: "og:title", content: "آزمایشگاه فکر و هوش مصنوعی" },
      { property: "og:description", content: "سواد AI به‌صورت بازی برای کلاس درس — نه یک چت‌بات." },
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
                <Sparkles className="h-3.5 w-3.5 text-primary" /> ساخته‌شده برای کلاس درس · ۱۰ تا ۱۲ سال
              </div>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                سواد هوش مصنوعی، به سبک یک <span className="bg-gradient-hero bg-clip-text text-transparent">بازی</span>.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                مأموریت‌های فکری ساختاریافته به کودکان یاد می‌دهند با AI سؤال بپرسند، واقعیت را بسنجند و خلق کنند — به‌صورت کاملاً امن.
                نه چت‌بات، نه همدم — یک ابزار آموزشی واقعی.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-xl shadow-soft">
                  <Link to="/login">امتحان نسخه نمایشی <ArrowRight className="mr-1 h-4 w-4 rotate-180" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl">
                  <Link to="/teacher">ویژه مربیان</Link>
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-success" /> امن از طراحی</span>
                <span className="inline-flex items-center gap-1"><Lock className="h-4 w-4 text-primary" /> بدون اطلاعات شخصی</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-hero opacity-20 blur-3xl" />
              <Card className="rotate-1 rounded-3xl border-border/60 bg-gradient-card p-6 shadow-card">
                <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> چراغ اعتماد</span>
                  <span>مأموریت ۲ از ۵</span>
                </div>
                <h3 className="mt-3 text-xl font-bold">مخترع تلفن کیست؟</h3>
                <div className="mt-4 rounded-2xl border border-border/60 bg-background/80 p-4 text-sm">
                  «تلفن در سال ۱۶۷۲ توسط توماس ادیسون در آلمان اختراع شد.»
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    ["bg-success", "اعتماد کن"],
                    ["bg-warning", "بررسی کن"],
                    ["bg-danger ring-4 ring-danger/30", "اعتماد نکن"],
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
        <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">شش مهارت، یک زمین بازی امن.</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          هر بازی یک مأموریت ساختاریافته است — بدون چت آزاد، بدون غافلگیری.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: <Brain className="h-5 w-5" />, title: "تفکر نقادانه", desc: "تصمیم بگیر به چه چیزی و چرا اعتماد کنی." },
            { icon: <BookOpen className="h-5 w-5" />, title: "وضوح پرامپت", desc: "یاد بگیر سؤال‌های روشن بپرسی." },
            { icon: <ShieldCheck className="h-5 w-5" />, title: "بررسی واقعیت", desc: "خطاها و اغراق‌های AI را پیدا کن." },
            { icon: <Sparkles className="h-5 w-5" />, title: "خلاقیت", desc: "با AI ایده‌پردازی کن — بعد انتخاب کن." },
            { icon: <Lock className="h-5 w-5" />, title: "حریم خصوصی", desc: "بدان چه چیزهایی را نباید به‌اشتراک بگذاری." },
            { icon: <Users className="h-5 w-5" />, title: "تأمل", desc: "بعد از هر مأموریت یادداشت فکری بنویس." },
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
                <Trophy className="h-3.5 w-3.5" /> ویژه مربیان
              </div>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">رشد فکری هر دانش‌آموز را ببین.</h2>
              <p className="mt-3 max-w-lg opacity-90">
                فهرست کلاس، امتیاز مهارت‌ها، تلاش‌های اخیر و خلاصه‌های قابل ارائه به والدین — همه در یک جا.
              </p>
              <div className="mt-6 flex gap-3">
                <Button asChild size="lg" variant="secondary" className="rounded-xl">
                  <Link to="/teacher">ورود به نسخه نمایشی مربی</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl border-white/40 bg-transparent text-primary-foreground hover:bg-white/10">
                  <Link to="/student">امتحان به‌عنوان دانش‌آموز</Link>
                </Button>
              </div>
            </div>
            <ul className="space-y-3 text-sm">
              {["فهرست کلاس با وضعیت هر بازی", "خلاصه ۹ گروه مهارتی", "یادداشت‌های فکری همه دانش‌آموزان", "خلاصه پیشرفت قابل ارائه به والدین"].map((t) => (
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
        © ۲۰۲۶ آزمایشگاه فکر و هوش مصنوعی · بستر امن سواد AI.
      </footer>
    </div>
  );
}
