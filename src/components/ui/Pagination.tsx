"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
}: {
  page: number; // 1-based
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}) {
  const canPrev = page > 1;
  const canNext = page < pageCount;

  function go(p: number) {
    const next = Math.min(pageCount, Math.max(1, p));
    if (next !== page) onPageChange(next);
  }

  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={!canPrev}
        className={cn(
          "gb-glass rounded-xl border border-border px-4 py-2 text-sm font-medium shadow-soft transition",
          "hover:bg-surface-2 focus-visible:gb-focus",
          !canPrev && "opacity-50 cursor-not-allowed"
        )}
      >
        ← Previous
      </button>

      <div className="gb-sticker rounded-full border border-border px-4 py-2 text-sm text-text shadow-soft">
        Page <span className="font-semibold">{page}</span> of{" "}
        <span className="font-semibold">{pageCount}</span>
      </div>

      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={!canNext}
        className={cn(
          "gb-glass rounded-xl border border-border px-4 py-2 text-sm font-medium shadow-soft transition",
          "hover:bg-surface-2 focus-visible:gb-focus",
          !canNext && "opacity-50 cursor-not-allowed"
        )}
      >
        Next →
      </button>
    </div>
  );
}