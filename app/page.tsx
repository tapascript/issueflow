import Link from 'next/link';
import { Suspense } from 'react';
import { AppShell } from './components/layout/AppShell';
import { getIssues } from '@/lib/issues/queries';

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Engineering workspace
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            IssueFlow
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600">
            Track engineering work, collaborate with your team, and keep
            issues moving toward completion.
          </p>
        </div>

        <Suspense fallback={<StatCardsSkeleton />}>
          <IssueStats />
        </Suspense>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Issues</h2>
              <p className="mt-1 text-sm text-slate-500">
                Browse and manage engineering issues.
              </p>
            </div>

            <Link
              href="/issues"
              className="text-sm font-medium text-slate-900 hover:underline"
            >
              View all
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

async function IssueStats() {
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
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard label="To do" value={todoCount} />
      <StatCard label="In progress" value={inProgressCount} />
      <StatCard label="Done" value={doneCount} />
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
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}

function StatCardsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCardSkeleton label="To do" />
      <StatCardSkeleton label="In progress" />
      <StatCardSkeleton label="Done" />
    </div>
  );
}

function StatCardSkeleton({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <div className="mt-2 h-9 w-16 animate-pulse rounded bg-slate-200" />
    </div>
  );
}