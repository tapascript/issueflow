'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

import {
  PRIORITY_LABELS,
  PRIORITY_OPTIONS,
  STATUS_LABELS,
  STATUS_OPTIONS,
  clearFilterParams,
  hasActiveFilters,
  parseIssueFilters,
  setFilterParam,
  type FilterKey,
} from '@/lib/issues/filters';
import type { Profile } from '@/lib/issues/types';

type IssueFiltersProps = {
  profiles: Profile[];
};

export function IssueFilters({ profiles }: IssueFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const status = searchParams.get('status') ?? '';
  const priority = searchParams.get('priority') ?? '';
  const assignee = searchParams.get('assignee') ?? '';

  function updateFilter(key: FilterKey, value: string) {
    const next = setFilterParam(searchParams.toString(), key, value);

    startTransition(() => {
      router.replace(`${pathname}?${next}`);
    });
  }

  function handleClear() {
    const next = clearFilterParams(searchParams.toString());

    startTransition(() => {
      router.replace(`${pathname}?${next}`);
    });
  }

  const hasFilters = hasActiveFilters(
    parseIssueFilters({ status, priority, assignee }),
  );

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
      <span className="text-sm font-medium text-slate-500">Filter:</span>

      <select
        value={status}
        onChange={(event) => updateFilter('status', event.target.value)}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
        aria-label="Filter by status"
      >
        <option value="">All statuses</option>

        {STATUS_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {STATUS_LABELS[option]}
          </option>
        ))}
      </select>

      <select
        value={priority}
        onChange={(event) => updateFilter('priority', event.target.value)}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
        aria-label="Filter by priority"
      >
        <option value="">All priorities</option>

        {PRIORITY_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {PRIORITY_LABELS[option]}
          </option>
        ))}
      </select>

      <select
        value={assignee}
        onChange={(event) => updateFilter('assignee', event.target.value)}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
        aria-label="Filter by assignee"
      >
        <option value="">All assignees</option>

        {profiles.map((profile) => (
          <option key={profile.id} value={profile.id}>
            {profile.name}
          </option>
        ))}
      </select>

      {hasFilters && (
        <button
          type="button"
          onClick={handleClear}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          Clear filters
        </button>
      )}

      {isPending && (
        <span className="text-xs text-slate-400">Filtering...</span>
      )}
    </div>
  );
}
