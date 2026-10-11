import { connection } from "next/server";
import { Suspense } from "react";

import { getIssueList, getProfiles } from "@/lib/issues/queries";
import { parseIssueFilters } from "@/lib/issues/filters";

import { IssueFilters } from "@/app/components/issues/IssueFilters";
import { IssueList } from "@/app/components/issues/IssueList";
import { IssuePagination } from "@/app/components/issues/IssuePagination";
import { IssueSearch } from "@/app/components/issues/IssueSearch";
import { IssueSort } from "@/app/components/issues/IssueSort";
import { ThemeToggle } from "@/app/components/theme/ThemeToggle";

type IssuesPageProps = {
  searchParams: Promise<{
    q?: string;
    page?: string;
    sort?: string;
    direction?: string;
    status?: string;
    priority?: string;
    assignee?: string;
  }>;
};

export default function IssuesPage({
  searchParams,
}: IssuesPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<IssueListSkeleton />}>
        <IssuesContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function IssuesContent({
  searchParams,
}: IssuesPageProps) {
  await connection();

  const params = await searchParams;

  const search = params.q ?? "";
  const page = Number(params.page ?? "1");

  const sort =
    params.sort === "title" || params.sort === "priority"
      ? params.sort
      : "created_at";

  const direction =
    params.direction === "asc" || params.direction === "desc"
      ? params.direction
      : "desc";

  const filters = parseIssueFilters({
    status: params.status,
    priority: params.priority,
    assignee: params.assignee,
  });

  const [result, assignees] = await Promise.all([
    getIssueList({
      search,
      page,
      pageSize: 10,
      sort,
      direction,
      ...filters,
    }),
    getProfiles(),
  ]);

  return (
    <>
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-medium text-muted">
              Engineering workspace
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              Issues
            </h1>

            <p className="mt-1 text-sm text-muted">
              {result.total} issues
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <a
              href="/issues/new"
              className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
            >
              New issue
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <IssueSearch />

            <IssueSort />
          </div>

          <IssueFilters assignees={assignees} />
        </div>

        <IssueList issues={result.issues} />

        <IssuePagination
          page={result.page}
          totalPages={result.totalPages}
          searchParams={params}
        />
      </div>
    </>
  );
}

function IssueListSkeleton() {
  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="h-4 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

          <div className="mt-3 h-9 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

          <div className="mt-2 h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />

        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="border-b border-border p-6 last:border-b-0"
            >
              <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

              <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

              <div className="mt-4 h-6 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}