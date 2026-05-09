import { Link, useRouterState } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SiteHeaderProps {
  variant?: "marketing" | "student" | "teacher";
  rightSlot?: React.ReactNode;
}

export function SiteHeader({ variant = "marketing", rightSlot }: SiteHeaderProps) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  const studentNav = [
    { to: "/student", label: "داشبورد" },
    { to: "/student/games", label: "بازی‌ها" },
    { to: "/student/journal", label: "دفترچه فکر" },
  ];
  const teacherNav = [
    { to: "/teacher", label: "داشبورد" },
    { to: "/teacher/class/demo", label: "کلاس نمونه" },
    { to: "/teacher/create", label: "کلاس جدید" },
  ];

  const nav = variant === "student" ? studentNav : variant === "teacher" ? teacherNav : [];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-soft">
            <Sparkles className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight">آزمایشگاه AI</div>
            <div className="text-[10px] tracking-wider text-muted-foreground">ویژه کودکان</div>
          </div>
        </Link>

        {nav.length > 0 && (
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active = path === item.to || (item.to !== "/student" && item.to !== "/teacher" && path.startsWith(item.to));
              const isHome = item.to === path;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active || isHome
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {rightSlot}
          {variant === "marketing" && (
            <>
              <Button asChild variant="ghost" size="sm" className="rounded-full">
                <Link to="/login">ورود</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full shadow-soft">
                <Link to="/login">شروع کن</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}