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
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h1 className="text-xl font-semibold text-foreground">
          Unable to load issues
        </h1>

        <p className="mt-2 text-sm text-muted">
          Something went wrong while fetching the issue list.
        </p>

        <button
          type="button"
          onClick={retry}
          className="mt-5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
