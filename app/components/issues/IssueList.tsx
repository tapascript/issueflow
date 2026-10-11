import Link from 'next/link';
import type { IssueWithRelations } from '@/lib/issues/types';

type IssueListProps = {
  issues: IssueWithRelations[];
};

const statusStyles = {
  todo: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  in_progress: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  done: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300',
};

const priorityStyles = {
  low: 'text-slate-500 dark:text-slate-400',
  medium: 'text-blue-600 dark:text-blue-400',
  high: 'text-orange-600 dark:text-orange-400',
  critical: 'text-red-600 dark:text-red-400',
};

function formatStatus(status: IssueWithRelations['status']) {
  return status.replace('_', ' ');
}

function relativeLuminance(hex: string): number {
  const value = hex.replace('#', '');

  if (!/^[0-9a-fA-F]{6}$/.test(value)) {
    return 0.5;
  }

  const [r, g, b] = [0, 2, 4].map((start) => {
    const channel = parseInt(value.slice(start, start + 2), 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: number, b: number): number {
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}

function labelStyles(color: string): {
  backgroundColor: string;
  color: string;
} {
  const luminance = relativeLuminance(color);
  const withDarkText = contrast(luminance, 0);
  const withLightText = contrast(luminance, 1);

  return {
    backgroundColor: color,
    color: withDarkText >= withLightText ? '#0f172a' : '#ffffff',
  };
}

export function IssueList({ issues }: IssueListProps) {
  if (issues.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-input bg-card px-6 py-16 text-center">
        <h2 className="font-semibold text-foreground">
          No issues found
        </h2>

        <p className="mt-2 text-sm text-muted">
          Try adjusting your search or filters, or create a new issue.
        </p>

        <Link
          href="/issues/new"
          className="mt-5 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
        >
          Create issue
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="divide-y divide-border">
        {issues.map((issue) => (
          <Link
            key={issue.id}
            href={`/issues/${issue.id}`}
            className="block px-5 py-5 transition hover:bg-hover"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-300 dark:bg-slate-500" />

                  <div className="min-w-0">
                    <h2 className="font-medium text-foreground">
                      {issue.title}
                    </h2>

                    {issue.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-muted">
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
                      className="rounded-full px-2 py-1 text-xs font-medium"
                      style={labelStyles(label.color)}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 text-sm text-muted">
                {issue.assignee?.name ?? 'Unassigned'}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}