import Link from 'next/link';
import type { ReactNode } from 'react';

import { ThemeToggle } from '../theme/ThemeToggle';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            IssueFlow
          </Link>

          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/issues"
              className="text-subtle hover:text-foreground"
            >
              Issues
            </Link>

            <ThemeToggle />

            <Link
              href="/issues/new"
              className="rounded-md bg-primary px-3 py-2 font-medium text-primary-foreground hover:bg-primary-hover"
            >
              New issue
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}