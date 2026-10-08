import { createClient } from '@/lib/supabase/server';

type CreateIssueInput = {
  title: string;
  description?: string;
  status?: 'todo' | 'in_progress' | 'done';
  priority?: 'low' | 'medium' | 'high' | 'critical';
  assigneeId?: string | null;
};

export async function createIssue(input: CreateIssueInput) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('issues')
    .insert({
      title: input.title,
      description: input.description ?? null,
      status: input.status ?? 'todo',
      priority: input.priority ?? 'medium',
      assignee_id: input.assigneeId ?? null,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create issue: ${error.message}`);
  }

  return data;
}

export async function updateIssue(
  id: number,
  input: Partial<CreateIssueInput>,
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('issues')
    .update({
      ...(input.title !== undefined && { title: input.title }),
      ...(input.description !== undefined && {
        description: input.description,
      }),
      ...(input.status !== undefined && {
        status: input.status,
      }),
      ...(input.priority !== undefined && {
        priority: input.priority,
      }),
      ...(input.assigneeId !== undefined && {
        assignee_id: input.assigneeId,
      }),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update issue: ${error.message}`);
  }

  return data;
}

export async function deleteIssue(id: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('issues')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete issue: ${error.message}`);
  }
}