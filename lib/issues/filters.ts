import type { IssuePriority, IssueStatus } from './types';

export const ISSUE_STATUSES = ['todo', 'in_progress', 'done'] as const;

export const ISSUE_PRIORITIES = ['low', 'medium', 'high', 'critical'] as const;

const ASSIGNEE_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type IssueListFilters = {
  status?: IssueStatus;
  priority?: IssuePriority;
  assignee?: string;
};

export type IssueFilterCondition = {
  column: 'status' | 'priority' | 'assignee_id';
  value: string;
};

export function isValidStatus(
  value: string | null | undefined,
): value is IssueStatus {
  return value != null && (ISSUE_STATUSES as readonly string[]).includes(value);
}

export function isValidPriority(
  value: string | null | undefined,
): value is IssuePriority {
  return (
    value != null && (ISSUE_PRIORITIES as readonly string[]).includes(value)
  );
}

export function isValidAssignee(
  value: string | null | undefined,
): value is string {
  return value != null && ASSIGNEE_ID_PATTERN.test(value);
}

/**
 * Parses raw URL search params into validated issue filters. Invalid or empty
 * values are ignored so the issue list URL can be safely shared and loaded.
 */
export function parseIssueFilters(filters: {
  status?: string | null;
  priority?: string | null;
  assignee?: string | null;
}): IssueListFilters {
  return {
    ...(isValidStatus(filters.status) ? { status: filters.status } : {}),
    ...(isValidPriority(filters.priority)
      ? { priority: filters.priority }
      : {}),
    ...(isValidAssignee(filters.assignee)
      ? { assignee: filters.assignee }
      : {}),
  };
}

/**
 * Translates validated issue filters into the equality conditions that are
 * applied to the Supabase issue list query.
 */
export function getIssueFilterConditions(
  filters: IssueListFilters,
): IssueFilterCondition[] {
  const conditions: IssueFilterCondition[] = [];

  if (filters.status) {
    conditions.push({ column: 'status', value: filters.status });
  }

  if (filters.priority) {
    conditions.push({ column: 'priority', value: filters.priority });
  }

  if (filters.assignee) {
    conditions.push({ column: 'assignee_id', value: filters.assignee });
  }

  return conditions;
}
