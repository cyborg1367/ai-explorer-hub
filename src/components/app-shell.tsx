import * as React from "react";

interface AppShellProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
}

/**
 * Generic app shell. If `sidebar` is provided, renders a 2-column layout
 * (sidebar + main). Otherwise renders just header + main.
 */
export function AppShell({ children, sidebar, header }: AppShellProps) {
  if (sidebar) {
    return (
      <div className="flex min-h-screen w-full bg-background">
        {sidebar}
        <div className="flex min-w-0 flex-1 flex-col">
          {header}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      {header}
      <main>{children}</main>
    </div>
  );
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}