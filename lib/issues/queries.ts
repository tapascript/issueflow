import { createClient } from '@/lib/supabase/server';
import type {
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