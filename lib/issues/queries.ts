import { createClient } from '@/lib/supabase/server';
import type {
  IssuePriority,
  IssueStatus,
  IssueWithRelations,
  Label,
  Profile,
} from './types';

type IssueRow = {
  id: number;
  title: string;
  description: string | null;
  status: IssueWithRelations['status'];
  priority: IssueWithRelations['priority'];
  assignee_id: string | null;
  created_at: string;
  updated_at: string;
  assignee:
    | {
        id: string;
        name: string;
        avatar_url: string | null;
      }[]
    | null;
  issue_labels: {
    labels:
      | {
          id: number;
          name: string;
          color: string;
        }[]
      | null;
  }[];
};

type ProfileRow = {
  id: string;
  name: string;
  avatar_url: string | null;
};

export type IssueListOptions = {
  search?: string;
  status?: IssueStatus;
  priority?: IssuePriority;
  assigneeId?: string;
  page?: number;
  pageSize?: number;
  sort?: 'created_at' | 'priority' | 'title';
  direction?: 'asc' | 'desc';
};

export async function getIssues(): Promise<IssueWithRelations[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('issues')
    .select(`
      id,
      title,
      description,
      status,
      priority,
      assignee_id,
      created_at,
      updated_at,
      assignee:profiles (
        id,
        name,
        avatar_url
      ),
      issue_labels (
        labels (
          id,
          name,
          color
        )
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch issues: ${error.message}`);
  }

  const issues = (data ?? []) as IssueRow[];

  return issues.map((issue) => {
    const assigneeData = issue.assignee?.[0] ?? null;

    const assignee: Profile | null = assigneeData
      ? {
          id: assigneeData.id,
          name: assigneeData.name,
          avatar_url: assigneeData.avatar_url,
        }
      : null;

    const labels: Label[] = issue.issue_labels
      .flatMap((relation) => relation.labels ?? [])
      .map((label) => ({
        id: label.id,
        name: label.name,
        color: label.color,
      }));

    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      status: issue.status,
      priority: issue.priority,
      assignee_id: issue.assignee_id,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
      assignee,
      labels,
    };
  });
}

export async function getProfiles(): Promise<Profile[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, avatar_url')
    .order('name');

  if (error) {
    throw new Error(`Failed to fetch profiles: ${error.message}`);
  }

  const profiles = (data ?? []) as ProfileRow[];

  return profiles.map((profile) => ({
    id: profile.id,
    name: profile.name,
    avatar_url: profile.avatar_url,
  }));
}

export async function getIssueList({
  search,
  status,
  priority,
  assigneeId,
  page = 1,
  pageSize = 10,
  sort = 'created_at',
  direction = 'desc',
}: IssueListOptions = {}) {
  const supabase = await createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('issues')
    .select(
      `
        id,
        title,
        description,
        status,
        priority,
        assignee_id,
        created_at,
        updated_at,
        assignee:profiles (
          id,
          name,
          avatar_url
        ),
        issue_labels (
          labels (
            id,
            name,
            color
          )
        )
      `,
      { count: 'exact' },
    );

  if (search?.trim()) {
    const value = search.trim();

    query = query.or(
      `title.ilike.%${value}%,description.ilike.%${value}%`,
    );
  }

  if (status) {
    query = query.eq('status', status);
  }

  if (priority) {
    query = query.eq('priority', priority);
  }

  if (assigneeId) {
    query = query.eq('assignee_id', assigneeId);
  }

  query = query.order(sort, {
    ascending: direction === 'asc',
  });

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw new Error(`Failed to fetch issues: ${error.message}`);
  }

  const issues = (data ?? []) as IssueRow[];

  const normalizedIssues: IssueWithRelations[] = issues.map(
    (issue) => {
      const assigneeData = issue.assignee?.[0] ?? null;

      return {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        status: issue.status,
        priority: issue.priority,
        assignee_id: issue.assignee_id,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
        assignee: assigneeData
          ? {
              id: assigneeData.id,
              name: assigneeData.name,
              avatar_url: assigneeData.avatar_url,
            }
          : null,
        labels: issue.issue_labels
          .flatMap((relation) => relation.labels ?? [])
          .map((label) => ({
            id: label.id,
            name: label.name,
            color: label.color,
          })),
      };
    },
  );

  return {
    issues: normalizedIssues,
    total: count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  };
}