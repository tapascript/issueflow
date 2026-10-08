import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  getIssueFilterConditions,
  isValidAssignee,
  isValidPriority,
  isValidStatus,
  parseIssueFilters,
} from './filters.ts';

const ASSIGNEE_ID = '123e4567-e89b-12d3-a456-426614174000';

test('parseIssueFilters returns no filters when nothing is provided', () => {
  assert.deepEqual(parseIssueFilters({}), {});
  assert.deepEqual(
    parseIssueFilters({ status: null, priority: null, assignee: null }),
    {},
  );
});

test('parseIssueFilters keeps valid status and priority values', () => {
  assert.deepEqual(parseIssueFilters({ status: 'in_progress' }), {
    status: 'in_progress',
  });
  assert.deepEqual(parseIssueFilters({ priority: 'high' }), {
    priority: 'high',
  });
});

test('parseIssueFilters ignores invalid status and priority values', () => {
  assert.deepEqual(parseIssueFilters({ status: 'bogus' }), {});
  assert.deepEqual(parseIssueFilters({ priority: 'urgent' }), {});
  assert.deepEqual(
    parseIssueFilters({ status: 'done', priority: 'not-a-priority' }),
    { status: 'done' },
  );
});

test('parseIssueFilters ignores malformed assignee ids', () => {
  assert.deepEqual(parseIssueFilters({ assignee: 'user-1' }), {});
  assert.deepEqual(parseIssueFilters({ assignee: '' }), {});
});

test('parseIssueFilters combines multiple filters', () => {
  assert.deepEqual(
    parseIssueFilters({
      status: 'in_progress',
      priority: 'high',
      assignee: ASSIGNEE_ID,
    }),
    {
      status: 'in_progress',
      priority: 'high',
      assignee: ASSIGNEE_ID,
    },
  );
});

test('isValidStatus and isValidPriority only accept known values', () => {
  assert.equal(isValidStatus('todo'), true);
  assert.equal(isValidStatus('in_progress'), true);
  assert.equal(isValidStatus('done'), true);
  assert.equal(isValidStatus('unknown'), false);
  assert.equal(isValidStatus(null), false);

  assert.equal(isValidPriority('low'), true);
  assert.equal(isValidPriority('medium'), true);
  assert.equal(isValidPriority('high'), true);
  assert.equal(isValidPriority('critical'), true);
  assert.equal(isValidPriority('urgent'), false);
  assert.equal(isValidPriority(undefined), false);
});

test('isValidAssignee only accepts UUIDs', () => {
  assert.equal(isValidAssignee(ASSIGNEE_ID), true);
  assert.equal(isValidAssignee('user-1'), false);
  assert.equal(isValidAssignee(''), false);
  assert.equal(isValidAssignee(null), false);
  assert.equal(isValidAssignee(undefined), false);
});

test('getIssueFilterConditions maps filters to database columns in order', () => {
  assert.deepEqual(
    getIssueFilterConditions({
      status: 'in_progress',
      priority: 'high',
      assignee: ASSIGNEE_ID,
    }),
    [
      { column: 'status', value: 'in_progress' },
      { column: 'priority', value: 'high' },
      { column: 'assignee_id', value: ASSIGNEE_ID },
    ],
  );
});

test('getIssueFilterConditions ignores unset filters', () => {
  assert.deepEqual(getIssueFilterConditions({}), []);
  assert.deepEqual(getIssueFilterConditions({ status: 'done' }), [
    { column: 'status', value: 'done' },
  ]);
});
