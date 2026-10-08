import { connection } from "next/server";
import { Suspense } from "react";

import { getIssueList } from "@/lib/issues/queries";

import { IssueList } from "@/app/components/issues/IssueList";
import { IssuePagination } from "@/app/components/issues/IssuePagination";
import { IssueSearch } from "@/app/components/issues/IssueSearch";
import { IssueSort } from "@/app/components/issues/IssueSort";

type IssuesPageProps = {
  searchParams: Promise<{
    q?: string;
    page?: string;
    sort?: string;
    direction?: string;
  }>;
};

export default function IssuesPage({
  searchParams,
}: IssuesPageProps) {
  return (
    <main className="min-h-screen bg-slate-50">
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

  const result = await getIssueList({
    search,
    page,
    pageSize: 10,
    sort,
    direction,
  });

  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Engineering workspace
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Issues
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {result.total} issues
            </p>
          </div>

          <a
            href="/issues/new"
            className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
          >
            New issue
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <IssueSearch />

          <IssueSort />
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
    <main className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />

          <div className="mt-3 h-9 w-32 animate-pulse rounded bg-slate-200" />

          <div className="mt-2 h-4 w-20 animate-pulse rounded bg-slate-200" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200" />

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="border-b border-slate-100 p-6 last:border-b-0"
            >
              <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />

              <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-200" />

              <div className="mt-4 h-6 w-32 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}