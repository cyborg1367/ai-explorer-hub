import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/teacher")({
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="teacher" />
      <Outlet />
    </div>
  ),
});