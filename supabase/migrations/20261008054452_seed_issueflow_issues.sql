insert into public.issues
  (title, description, status, priority, assignee_id, created_at, updated_at)
values

(
  'Fix mobile navigation menu overflow',
  'The navigation menu overflows horizontally on smaller mobile viewports. Reproduce below 390px and update the responsive layout.',
  'in_progress',
  'high',
  (select id from public.profiles where name = 'Ananya Sharma'),
  now() - interval '2 days',
  now() - interval '4 hours'
),

(
  'Add dark mode support',
  'Introduce application-wide dark mode support and persist the user preference.',
  'todo',
  'medium',
  (select id from public.profiles where name = 'Rahul Sen'),
  now() - interval '1 day',
  now() - interval '1 day'
),

(
  'Optimize issue list query',
  'The issue list is making unnecessary database queries when loading assignee and label information.',
  'done',
  'high',
  (select id from public.profiles where name = 'Priya Nair'),
  now() - interval '8 days',
  now() - interval '5 days'
),

(
  'Add keyboard shortcut for new issue',
  'Allow users to press N to open the create issue form.',
  'todo',
  'low',
  (select id from public.profiles where name = 'Arjun Mehta'),
  now() - interval '3 days',
  now() - interval '3 days'
),

(
  'Investigate slow dashboard rendering',
  'Dashboard rendering becomes noticeably slower when the issue count exceeds several hundred records.',
  'in_progress',
  'critical',
  (select id from public.profiles where name = 'Meera Das'),
  now() - interval '5 days',
  now() - interval '2 hours'
),

(
  'Improve issue description editor',
  'The current description field is difficult to use for multiline content. Improve the editing experience.',
  'todo',
  'medium',
  (select id from public.profiles where name = 'Ananya Sharma'),
  now() - interval '6 days',
  now() - interval '6 days'
),

(
  'Fix incorrect issue timestamps',
  'Issue timestamps are displayed incorrectly for users outside the application server timezone.',
  'done',
  'high',
  (select id from public.profiles where name = 'Rahul Sen'),
  now() - interval '12 days',
  now() - interval '7 days'
),

(
  'Add issue activity history',
  'Users should be able to see a chronological history of important changes made to an issue.',
  'todo',
  'medium',
  (select id from public.profiles where name = 'Priya Nair'),
  now() - interval '10 days',
  now() - interval '10 days'
),

(
  'Fix duplicate issue submissions',
  'Rapidly clicking the submit button can create duplicate issues.',
  'in_progress',
  'critical',
  (select id from public.profiles where name = 'Arjun Mehta'),
  now() - interval '4 days',
  now() - interval '1 day'
),

(
  'Improve empty state messaging',
  'The issue list empty state should provide clearer guidance when a team has no issues.',
  'done',
  'low',
  (select id from public.profiles where name = 'Meera Das'),
  now() - interval '15 days',
  now() - interval '12 days'
),

(
  'Add issue priority indicator',
  'Show a visual priority indicator in the issue list.',
  'done',
  'medium',
  (select id from public.profiles where name = 'Ananya Sharma'),
  now() - interval '14 days',
  now() - interval '10 days'
),

(
  'Handle failed issue creation gracefully',
  'Display a useful error message when issue creation fails because of a network or database error.',
  'in_progress',
  'high',
  (select id from public.profiles where name = 'Rahul Sen'),
  now() - interval '7 days',
  now() - interval '2 days'
),

(
  'Add assignee display to issue cards',
  'Issue cards should display the currently assigned team member.',
  'done',
  'medium',
  (select id from public.profiles where name = 'Priya Nair'),
  now() - interval '20 days',
  now() - interval '16 days'
),

(
  'Improve search performance',
  'Text search becomes slow as the number of issues grows. Investigate query performance and indexing options.',
  'todo',
  'high',
  (select id from public.profiles where name = 'Arjun Mehta'),
  now() - interval '9 days',
  now() - interval '9 days'
),

(
  'Add label management',
  'Allow team members to create and manage issue labels.',
  'todo',
  'medium',
  (select id from public.profiles where name = 'Meera Das'),
  now() - interval '18 days',
  now() - interval '18 days'
),

(
  'Fix issue detail loading state',
  'The issue detail page currently appears blank while the issue data is loading.',
  'done',
  'low',
  (select id from public.profiles where name = 'Ananya Sharma'),
  now() - interval '21 days',
  now() - interval '18 days'
),

(
  'Add confirmation before deleting issues',
  'Prevent accidental issue deletion by asking users to confirm the action.',
  'todo',
  'high',
  (select id from public.profiles where name = 'Rahul Sen'),
  now() - interval '11 days',
  now() - interval '11 days'
),

(
  'Fix long issue titles in list view',
  'Long issue titles can break the layout of the issue list.',
  'done',
  'medium',
  (select id from public.profiles where name = 'Priya Nair'),
  now() - interval '25 days',
  now() - interval '20 days'
),

(
  'Add API error logging',
  'Improve server-side logging for failed database operations.',
  'in_progress',
  'high',
  (select id from public.profiles where name = 'Arjun Mehta'),
  now() - interval '5 days',
  now() - interval '1 day'
),

(
  'Document local development setup',
  'Add clear instructions for setting up IssueFlow locally.',
  'done',
  'low',
  (select id from public.profiles where name = 'Meera Das'),
  now() - interval '30 days',
  now() - interval '25 days'
),

(
  'Add pagination to issue list',
  'The issue list should load issues in pages rather than loading the entire dataset.',
  'done',
  'high',
  (select id from public.profiles where name = 'Ananya Sharma'),
  now() - interval '28 days',
  now() - interval '22 days'
),

(
  'Improve responsive issue detail layout',
  'The issue detail layout needs better behavior on tablets and mobile devices.',
  'todo',
  'medium',
  (select id from public.profiles where name = 'Rahul Sen'),
  now() - interval '13 days',
  now() - interval '13 days'
),

(
  'Add loading indicator to search',
  'Searching should provide feedback while a new result set is being loaded.',
  'done',
  'low',
  (select id from public.profiles where name = 'Priya Nair'),
  now() - interval '17 days',
  now() - interval '14 days'
),

(
  'Prevent unauthorized issue deletion',
  'Review issue deletion permissions and ensure the server validates the operation.',
  'in_progress',
  'critical',
  (select id from public.profiles where name = 'Arjun Mehta'),
  now() - interval '3 days',
  now() - interval '6 hours'
),

(
  'Add issue sorting',
  'Allow users to sort issues by creation date and priority.',
  'done',
  'medium',
  (select id from public.profiles where name = 'Meera Das'),
  now() - interval '24 days',
  now() - interval '19 days'
),

(
  'Improve database indexes',
  'Review the most frequently executed issue queries and add indexes where appropriate.',
  'todo',
  'high',
  (select id from public.profiles where name = 'Ananya Sharma'),
  now() - interval '16 days',
  now() - interval '16 days'
),

(
  'Fix stale issue data after editing',
  'The issue list sometimes displays old data after an issue has been edited.',
  'in_progress',
  'high',
  (select id from public.profiles where name = 'Rahul Sen'),
  now() - interval '8 days',
  now() - interval '3 days'
),

(
  'Add accessible form labels',
  'Review issue forms and ensure every field has an accessible label.',
  'done',
  'medium',
  (select id from public.profiles where name = 'Priya Nair'),
  now() - interval '32 days',
  now() - interval '28 days'
),

(
  'Add issue URL sharing',
  'Allow users to copy a direct URL to an issue so it can be shared with another team member.',
  'todo',
  'low',
  (select id from public.profiles where name = 'Arjun Mehta'),
  now() - interval '6 days',
  now() - interval '6 days'
),

(
  'Improve database error handling',
  'Standardize how database errors are translated into user-facing messages.',
  'todo',
  'high',
  (select id from public.profiles where name = 'Meera Das'),
  now() - interval '4 days',
  now() - interval '4 days'
);