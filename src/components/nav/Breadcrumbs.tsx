"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildBreadcrumbs, isMicrositePath } from "@/lib/nav/breadcrumbs";

type BreadcrumbsProps = {
  hideOnMicrosite?: boolean;
};

export default function Breadcrumbs({ hideOnMicrosite }: BreadcrumbsProps) {
  const pathname = usePathname() ?? "/";
  if (hideOnMicrosite && isMicrositePath(pathname)) {
    return null;
  }

  const crumbs = buildBreadcrumbs(pathname);

  return (
    <div className="border-b border-white/5 bg-[rgb(var(--bg-900))/0.6]">
      <nav
        aria-label="Breadcrumb"
        className="container-glambox flex flex-wrap items-center gap-2 py-3 text-xs text-[rgb(var(--text-400))] md:text-sm"
      >
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          const content = isLast ? (
            <span className="text-[rgb(var(--text-200))]" aria-current="page">
              {crumb.label}
            </span>
          ) : (
            <Link href={crumb.href} className="transition hover:text-white">
              {crumb.label}
            </Link>
          );

          return (
            <span key={`${crumb.href}-${crumb.label}`} className="flex items-center gap-2">
              {content}
              {!isLast && <span className="text-[rgb(var(--text-400))]">/</span>}
            </span>
          );
        })}
      </nav>
    </div>
  );
}
