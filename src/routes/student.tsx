import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { DEMO_CLASS } from "@/lib/mock-data";

export const Route = createFileRoute("/student")({
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader
        variant="student"
        rightSlot={
          <Link to="/" className="hidden items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary md:inline-flex">
            <span className="font-mono">{DEMO_CLASS.code}</span>
            <span>·</span>
            <span>آریا</span>
          </Link>
        }
      />
      <Outlet />
    </div>
  ),
});