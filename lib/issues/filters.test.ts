import { describe, expect, it } from 'vitest';

import {
  FILTER_PARAM_KEYS,
  PRIORITY_LABELS,
  PRIORITY_OPTIONS,
  STATUS_LABELS,
  STATUS_OPTIONS,
  clearFilterParams,
  hasActiveFilters,
  parseIssueFilters,
  setFilterParam,
} from './filters';

describe('parseIssueFilters', () => {
  it('returns no filters for empty params', () => {
    expect(parseIssueFilters({})).toEqual({});
  });

  it('parses a valid status', () => {
    expect(parseIssueFilters({ status: 'in_progress' })).toEqual({
      status: 'in_progress',
    });
  });

  it('ignores an invalid status', () => {
    expect(parseIssueFilters({ status: 'not-a-status' })).toEqual({});
  });

  it('parses a valid priority', () => {
    expect(parseIssueFilters({ priority: 'high' })).toEqual({
      priority: 'high',
    });
  });

  it('ignores an invalid priority', () => {
    expect(parseIssueFilters({ priority: 'urgent' })).toEqual({});
  });

  it('parses an assignee id', () => {
    expect(parseIssueFilters({ assignee: 'abc-123' })).toEqual({
      assigneeId: 'abc-123',
    });
  });

  it('combines multiple filters', () => {
    expect(
      parseIssueFilters({
        status: 'in_progress',
        priority: 'high',
        assignee: 'abc-123',
      }),
    ).toEqual({
      status: 'in_progress',
      priority: 'high',
      assigneeId: 'abc-123',
    });
  });

  it('ignores empty-string values', () => {
    expect(
      parseIssueFilters({ status: '', priority: '', assignee: '' }),
    ).toEqual({});
  });
});

describe('hasActiveFilters', () => {
  it('is false when no filters are set', () => {
    expect(hasActiveFilters({})).toBe(false);
  });

  it('is true when a status filter is set', () => {
    expect(hasActiveFilters({ status: 'todo' })).toBe(true);
  });

  it('is true when a priority filter is set', () => {
    expect(hasActiveFilters({ priority: 'critical' })).toBe(true);
  });

  it('is true when an assignee filter is set', () => {
    expect(hasActiveFilters({ assigneeId: 'abc' })).toBe(true);
  });
});

describe('setFilterParam', () => {
  it('adds a filter to an empty query string', () => {
    expect(setFilterParam('', 'status', 'done')).toBe('status=done');
  });

  it('adds a filter while preserving other params', () => {
    expect(setFilterParam('q=nav&sort=created_at', 'status', 'done')).toBe(
      'q=nav&sort=created_at&status=done',
    );
  });

  it('updates an existing filter value', () => {
    expect(setFilterParam('status=todo', 'status', 'done')).toBe(
      'status=done',
    );
  });

  it('removes a filter when the value is empty', () => {
    expect(setFilterParam('status=todo&priority=high', 'status', '')).toBe(
      'priority=high',
    );
  });

  it('resets pagination when a filter changes', () => {
    expect(setFilterParam('status=todo&page=3', 'priority', 'high')).toBe(
      'status=todo&priority=high',
    );
  });
});

describe('clearFilterParams', () => {
  it('removes all filter params', () => {
    expect(
      clearFilterParams('status=todo&priority=high&assignee=abc&page=2'),
    ).toBe('');
  });

  it('preserves non-filter params', () => {
    expect(
      clearFilterParams('q=nav&status=todo&sort=created_at&assignee=abc'),
    ).toBe('q=nav&sort=created_at');
  });

  it('resets pagination', () => {
    expect(clearFilterParams('status=todo&page=4')).toBe('');
  });
});

describe('filter option constants', () => {
  it('exposes all statuses with labels', () => {
    expect(STATUS_OPTIONS).toEqual(['todo', 'in_progress', 'done']);

    expect(STATUS_LABELS).toEqual({
      todo: 'To do',
      in_progress: 'In progress',
      done: 'Done',
    });
  });

  it('exposes all priorities with labels', () => {
    expect(PRIORITY_OPTIONS).toEqual(['low', 'medium', 'high', 'critical']);

    expect(PRIORITY_LABELS).toEqual({
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      critical: 'Critical',
    });
  });

  it('lists the three supported filter param keys', () => {
    expect(FILTER_PARAM_KEYS).toEqual(['status', 'priority', 'assignee']);
  });
});
