insert into public.issue_labels (issue_id, label_id)
select i.id, l.id
from public.issues i
cross join public.labels l
where
  (i.title = 'Fix mobile navigation menu overflow' and l.name in ('frontend', 'bug'))
  or
  (i.title = 'Add dark mode support' and l.name in ('frontend', 'feature'))
  or
  (i.title = 'Optimize issue list query' and l.name in ('backend', 'performance'))
  or
  (i.title = 'Add keyboard shortcut for new issue' and l.name in ('frontend', 'feature'))
  or
  (i.title = 'Investigate slow dashboard rendering' and l.name in ('performance', 'frontend'))
  or
  (i.title = 'Improve issue description editor' and l.name in ('frontend', 'feature'))
  or
  (i.title = 'Fix incorrect issue timestamps' and l.name in ('bug', 'backend'))
  or
  (i.title = 'Add issue activity history' and l.name in ('feature', 'backend'))
  or
  (i.title = 'Fix duplicate issue submissions' and l.name in ('bug', 'frontend', 'urgent'))
  or
  (i.title = 'Improve empty state messaging' and l.name in ('frontend', 'documentation'))
  or
  (i.title = 'Add issue priority indicator' and l.name in ('frontend', 'feature'))
  or
  (i.title = 'Handle failed issue creation gracefully' and l.name in ('backend', 'bug'))
  or
  (i.title = 'Add assignee display to issue cards' and l.name in ('frontend', 'feature'))
  or
  (i.title = 'Improve search performance' and l.name in ('performance', 'backend'))
  or
  (i.title = 'Add label management' and l.name in ('feature', 'backend'))
  or
  (i.title = 'Fix issue detail loading state' and l.name in ('frontend', 'bug'))
  or
  (i.title = 'Add confirmation before deleting issues' and l.name in ('frontend', 'security'))
  or
  (i.title = 'Fix long issue titles in list view' and l.name in ('frontend', 'bug'))
  or
  (i.title = 'Add API error logging' and l.name in ('backend', 'feature'))
  or
  (i.title = 'Document local development setup' and l.name in ('documentation'))
  or
  (i.title = 'Add pagination to issue list' and l.name in ('frontend', 'feature', 'performance'))
  or
  (i.title = 'Improve responsive issue detail layout' and l.name in ('frontend'))
  or
  (i.title = 'Add loading indicator to search' and l.name in ('frontend', 'feature'))
  or
  (i.title = 'Prevent unauthorized issue deletion' and l.name in ('security', 'backend', 'urgent'))
  or
  (i.title = 'Add issue sorting' and l.name in ('frontend', 'feature'))
  or
  (i.title = 'Improve database indexes' and l.name in ('backend', 'performance'))
  or
  (i.title = 'Fix stale issue data after editing' and l.name in ('bug', 'frontend', 'backend'))
  or
  (i.title = 'Add accessible form labels' and l.name in ('frontend', 'security'))
  or
  (i.title = 'Add issue URL sharing' and l.name in ('frontend', 'feature'))
  or
  (i.title = 'Improve database error handling' and l.name in ('backend', 'bug'));