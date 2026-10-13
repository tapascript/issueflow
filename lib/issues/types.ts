export type IssueStatus = 'todo' | 'in_progress' | 'done';

export type IssuePriority =
  | 'low'
  | 'medium'
  | 'high'
  | 'critical';

export type IssueFilters = {
  status?: IssueStatus;
  priority?: IssuePriority;
  assigneeId?: string;
};

export type Issue = {
  id: number;
  title: string;
  description: string | null;
  status: IssueStatus;
  priority: IssuePriority;
  assignee_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  name: string;
  avatar_url: string | null;
};

export type Label = {
  id: number;
  name: string;
  color: string;
};

export type IssueWithRelations = Issue & {
  assignee: Profile | null;
  labels: Label[];
};