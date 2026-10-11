'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export function IssueSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set('q', value);
    } else {
      params.delete('q');
    }

    params.delete('page');

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="relative">
      <input
        type="search"
        defaultValue={searchParams.get('q') ?? ''}
        onChange={(event) => handleSearch(event.target.value)}
        placeholder="Search issues..."
        aria-label="Search issues"
        className="w-full rounded-md border border-input bg-card px-4 py-2.5 text-sm outline-none placeholder:text-faint focus:border-input focus:ring-2 focus:ring-ring"
      />

      {isPending && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">
          Searching...
        </span>
      )}
    </div>
  );
}