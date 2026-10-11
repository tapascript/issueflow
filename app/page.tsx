import Link from 'next/link';
import { Suspense } from 'react';

import { AppShell } from './components/layout/AppShell';
import { getIssues } from '@/lib/issues/queries';

export default function HomePage() {
  return (
    <AppShell>
      <Suspense fallback={<HomeSkeleton />}>
        <HomeContent />
      </Suspense>
    </AppShell>
  );
}

async function HomeContent() {
  const issues = await getIssues();

  const todoCount = issues.filter(
    (issue) => issue.status === 'todo',
  ).length;

  const inProgressCount = issues.filter(
    (issue) => issue.status === 'in_progress',
  ).length;

  const doneCount = issues.filter(
    (issue) => issue.status === 'done',
  ).length;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-muted">
          Engineering workspace
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          IssueFlow
        </h1>

        <p className="mt-2 max-w-2xl text-subtle">
          Track engineering work, collaborate with your team, and keep
          issues moving toward completion.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="To do" value={todoCount} />
        <StatCard label="In progress" value={inProgressCount} />
        <StatCard label="Done" value={doneCount} />
      </div>

      <section className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Issues</h2>
            <p className="mt-1 text-sm text-muted">
              Browse and manage engineering issues.
            </p>
          </div>

          <Link
            href="/issues"
            className="text-sm font-medium text-foreground hover:underline"
          >
            View all
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}

function HomeSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-4 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

        <div className="mt-3 h-9 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

        <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

            <div className="mt-3 h-8 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="h-5 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

        <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}

