import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Bell, HelpCircle } from "lucide-react";
import { TeacherSidebar } from "@/components/teacher-sidebar";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/teacher")({
  component: TeacherShell,
});

function TeacherShell() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <TeacherSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile / tablet header */}
        <div className="lg:hidden">
          <SiteHeader variant="teacher" />
        </div>
        {/* Desktop top bar */}
        <header className="hidden h-14 items-center justify-between border-b border-border/60 bg-background/85 px-6 backdrop-blur lg:flex">
          <div className="text-sm text-muted-foreground">
            <Link to="/teacher" className="hover:text-foreground">Teacher</Link>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Help">
              <HelpCircle className="h-4 w-4" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}