import Link from 'next/link';
import type { ReactNode } from 'react';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-slate-950"
          >
            IssueFlow
          </Link>

          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/issues"
              className="text-slate-600 hover:text-slate-950"
            >
              Issues
            </Link>

            <Link
              href="/issues/new"
              className="rounded-md bg-slate-950 px-3 py-2 font-medium text-white hover:bg-slate-800"
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