'use client';

import { useEffect } from 'react';

export default function IssuesError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h1 className="text-xl font-semibold text-slate-900">
          Unable to load issues
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Something went wrong while fetching the issue list.
        </p>

        <button
          type="button"
          onClick={retry}
          className="mt-5 rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
