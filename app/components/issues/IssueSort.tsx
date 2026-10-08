'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function IssueSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sort = searchParams.get('sort') ?? 'created_at';
  const direction = searchParams.get('direction') ?? 'desc';

  function updateSort(
    nextSort: 'created_at' | 'title' | 'priority',
  ) {
    const params = new URLSearchParams(searchParams.toString());

    if (sort === nextSort) {
      params.set(
        'direction',
        direction === 'asc' ? 'desc' : 'asc',
      );
    } else {
      params.set('sort', nextSort);
      params.set('direction', 'desc');
    }

    params.delete('page');

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-500">Sort:</span>

      <select
        value={sort}
        onChange={(event) =>
          updateSort(
            event.target.value as
              | 'created_at'
              | 'title'
              | 'priority',
          )
        }
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
        aria-label="Sort issues"
      >
        <option value="created_at">Created</option>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>

      <button
        type="button"
        onClick={() =>
          updateSort(
            sort as 'created_at' | 'title' | 'priority',
          )
        }
        className="rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
        aria-label="Toggle sort direction"
      >
        {direction === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
}