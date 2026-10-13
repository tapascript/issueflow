import Link from 'next/link';
import type { IssueWithRelations } from '@/lib/issues/types';

type IssueListProps = {
  issues: IssueWithRelations[];
};

const statusStyles = {
  todo: 'bg-slate-100 text-slate-700',
  in_progress: 'bg-blue-100 text-blue-700',
  done: 'bg-green-100 text-green-700',
};

const priorityStyles = {
  low: 'text-slate-500',
  medium: 'text-blue-600',
  high: 'text-orange-600',
  critical: 'text-red-600',
};

function formatStatus(status: IssueWithRelations['status']) {
  return status.replace('_', ' ');
}

export function IssueList({ issues }: IssueListProps) {
  if (issues.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <h2 className="font-semibold text-slate-900">
          No issues found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Try adjusting your search or filters, or create a new issue.
        </p>

        <Link
          href="/issues/new"
          className="mt-5 inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Create issue
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="divide-y divide-slate-100">
        {issues.map((issue) => (
          <Link
            key={issue.id}
            href={`/issues/${issue.id}`}
            className="block px-5 py-5 transition hover:bg-slate-50"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-300" />

                  <div className="min-w-0">
                    <h2 className="font-medium text-slate-900">
                      {issue.title}
                    </h2>

                    {issue.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                        {issue.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 pl-5">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[issue.status]}`}
                  >
                    {formatStatus(issue.status)}
                  </span>

                  <span
                    className={`text-xs font-medium capitalize ${priorityStyles[issue.priority]}`}
                  >
                    {issue.priority}
                  </span>

                  {issue.labels.map((label) => (
                    <span
                      key={label.id}
                      className="rounded-full px-2 py-1 text-xs"
                      style={{
                        backgroundColor: `${label.color}15`,
                        color: label.color,
                      }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 text-sm text-slate-500">
                {issue.assignee?.name ?? 'Unassigned'}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}