import Link from "next/link";
import { cn } from "@/lib/cn";

export type Crumb = {
  label: string;
  href?: string; // if omitted, treated as current page
};

export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("w-full", className)}>
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((c, idx) => {
          const isLast = idx === items.length - 1;
          const content = c.href && !isLast ? (
            <Link
              href={c.href}
              className={cn(
                "rounded-lg px-2 py-1 text-muted transition hover:text-text hover:bg-surface-2",
                "focus-visible:gb-focus"
              )}
            >
              {c.label}
            </Link>
          ) : (
            <span className="rounded-lg px-2 py-1 font-medium text-text">{c.label}</span>
          );

          return (
            <li key={`${c.label}-${idx}`} className="flex items-center gap-2">
              {content}
              {!isLast ? <span className="text-muted/70">›</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}