import type { IssueFilters, IssuePriority, IssueStatus } from './types';

export const STATUS_OPTIONS: IssueStatus[] = ['todo', 'in_progress', 'done'];

export const PRIORITY_OPTIONS: IssuePriority[] = [
  'low',
  'medium',
  'high',
  'critical',
];

export const STATUS_LABELS: Record<IssueStatus, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  done: 'Done',
};

export const PRIORITY_LABELS: Record<IssuePriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

export type FilterKey = 'status' | 'priority' | 'assignee';

export const FILTER_PARAM_KEYS: FilterKey[] = [
  'status',
  'priority',
  'assignee',
];

export type FilterSearchParams = {
  status?: string;
  priority?: string;
  assignee?: string;
};

const VALID_STATUSES = new Set<string>(STATUS_OPTIONS);
const VALID_PRIORITIES = new Set<string>(PRIORITY_OPTIONS);

export function parseIssueFilters(
  params: FilterSearchParams,
): IssueFilters {
  const filters: IssueFilters = {};

  if (params.status && VALID_STATUSES.has(params.status)) {
    filters.status = params.status as IssueStatus;
  }

  if (params.priority && VALID_PRIORITIES.has(params.priority)) {
    filters.priority = params.priority as IssuePriority;
  }

  if (params.assignee) {
    filters.assigneeId = params.assignee;
  }

  return filters;
}

export function hasActiveFilters(filters: IssueFilters): boolean {
  return Boolean(filters.status || filters.priority || filters.assigneeId);
}

export function setFilterParam(
  current: string,
  key: FilterKey,
  value: string,
): string {
  const params = new URLSearchParams(current);

  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  // Changing a filter resets pagination so results start from page one.
  params.delete('page');

  return params.toString();
}

export function clearFilterParams(current: string): string {
  const params = new URLSearchParams(current);

  for (const key of FILTER_PARAM_KEYS) {
    params.delete(key);
  }

  params.delete('page');

  return params.toString();
}
