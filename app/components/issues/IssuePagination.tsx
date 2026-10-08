import Link from 'next/link';

type IssuePaginationProps = {
  page: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
};

export function IssuePagination({
  page,
  totalPages,
  searchParams,
}: IssuePaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  function createHref(nextPage: number) {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(searchParams)) {
      if (value) {
        params.set(key, value);
      }
    }

    params.set('page', String(nextPage));

    return `/issues?${params.toString()}`;
  }

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-slate-500">
        Page {page} of {totalPages}
      </p>

      <div className="flex gap-2">
        {page > 1 && (
          <Link
            href={createHref(page - 1)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50"
          >
            Previous
          </Link>
        )}

        {page < totalPages && (
          <Link
            href={createHref(page + 1)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}