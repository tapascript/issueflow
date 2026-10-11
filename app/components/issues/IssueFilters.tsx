'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

import {
  ISSUE_PRIORITIES,
  ISSUE_STATUSES,
} from '@/lib/issues/filters';
import type { Profile } from '@/lib/issues/types';

type IssueFiltersProps = {
  assignees: Profile[];
};

const statusOptions: Record<string, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  done: 'Done',
};

const priorityOptions: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

export function IssueFilters({ assignees }: IssueFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function updateFilter(
    key: 'status' | 'priority' | 'assignee',
    value: string,
  ) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete('page');

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-wrap items-end gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-muted">Status</span>
        <select
          value={searchParams.get('status') ?? ''}
          onChange={(event) => updateFilter('status', event.target.value)}
          className="rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground"
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          {ISSUE_STATUSES.map((status) => (
            <option key={status} value={status}>
              {statusOptions[status]}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-muted">Priority</span>
        <select
          value={searchParams.get('priority') ?? ''}
          onChange={(event) => updateFilter('priority', event.target.value)}
          className="rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground"
          aria-label="Filter by priority"
        >
          <option value="">All priorities</option>
          {ISSUE_PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {priorityOptions[priority]}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-muted">Assignee</span>
        <select
          value={searchParams.get('assignee') ?? ''}
          onChange={(event) => updateFilter('assignee', event.target.value)}
          className="rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground"
          aria-label="Filter by assignee"
        >
          <option value="">All assignees</option>
          {assignees.map((assignee) => (
            <option key={assignee.id} value={assignee.id}>
              {assignee.name}
            </option>
          ))}
        </select>
      </label>

      {isPending && (
        <span className="pb-2 text-xs text-muted">Filtering...</span>
      )}
    </div>
  );
}
