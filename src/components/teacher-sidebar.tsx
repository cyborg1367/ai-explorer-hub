import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, Plus, BookOpen, GraduationCap, Sparkles, LogOut } from "lucide-react";

const NAV = [
  { to: "/teacher", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/teacher/class/demo", label: "Demo Class", icon: Users, exact: false, match: "/teacher/class" },
  { to: "/teacher/create", label: "New Class", icon: Plus, exact: false },
] as const;

const SECONDARY = [
  { to: "/student", label: "View as student", icon: GraduationCap },
  { to: "/", label: "About the lab", icon: BookOpen },
] as const;

export function TeacherSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border/60 bg-card/40 px-3 py-5 lg:flex">
      <Link to="/" className="mb-6 flex items-center gap-2 px-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-soft">
          <Sparkles className="h-5 w-5" />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-semibold">AI Thinking Lab</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Teacher</div>
        </div>
      </Link>

      <div className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Workspace
      </div>
      <nav className="mt-2 flex flex-col gap-1">
        {NAV.map((n) => {
          const Icon = n.icon;
          const active = n.exact
            ? path === n.to
            : path.startsWith(("match" in n && n.match) || n.to);
          return (
            <Link
              key={n.to}
              to={n.to}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {n.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-7 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Other
      </div>
      <nav className="mt-2 flex flex-col gap-1">
        {SECONDARY.map((n) => {
          const Icon = n.icon;
          return (
            <Link
              key={n.to}
              to={n.to}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              {n.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-border/60 bg-gradient-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-hero text-sm font-semibold text-primary-foreground">
            P
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">Ms. Parker</div>
            <div className="truncate text-[11px] text-muted-foreground">ms.parker@school.org</div>
          </div>
        </div>
        <Link
          to="/login"
          className="mt-3 flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-background hover:text-foreground"
        >
          <LogOut className="h-3.5 w-3.5" /> Sign out
        </Link>
      </div>
    </aside>
  );
}