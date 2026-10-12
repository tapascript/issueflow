'use client';

export default function IssuesError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <h2 className="font-semibold text-slate-900">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            We couldn&apos;t load the issue list. Please try again.
          </p>

          <button
            type="button"
            onClick={retry}
            className="mt-5 inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}
