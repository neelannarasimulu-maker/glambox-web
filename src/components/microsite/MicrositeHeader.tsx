"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MicrositeConfig } from "@/lib/content/microsite";
import { cn } from "@/lib/cn";

const navLabels: Record<string, string> = {
  services: "Services",
  therapists: "Therapists",
  gallery: "Gallery",
  shop: "Shop",
  book: "Book",
};

const navPaths: Record<string, (microsite: string) => string> = {
  services: (microsite) => `/explore/${microsite}/services`,
  therapists: () => "/therapists",
  gallery: (microsite) => `/explore/${microsite}/gallery`,
  shop: (microsite) => `/explore/${microsite}/shop`,
  book: (microsite) => `/book/${microsite}`,
};

export default function MicrositeHeader({ config }: { config: MicrositeConfig }) {
  const pathname = usePathname();

  return (
    <div className="sticky top-[var(--header-h)] z-40 border-b border-white/10 bg-[rgb(var(--bg-900))/0.9] backdrop-blur-xl">
      <div className="container-glambox flex flex-wrap items-center justify-between gap-4 py-5">
        <div>
          <Link href={`/explore/${config.id}`} className="text-lg font-semibold text-white">
            {config.name}
          </Link>
          <p className="text-sm text-[rgb(var(--text-300))]">{config.tagline}</p>
        </div>
        <nav className="flex flex-wrap gap-3 text-sm">
          {config.nav.map((item) => {
            const isObject = typeof item === "object";
            const key = isObject ? item.key : item;
            const label = isObject ? item.label : navLabels[item] ?? item;
            const href = isObject
              ? item.href
              : navPaths[item]?.(config.id) ?? `/explore/${config.id}`;
            const isActive = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={key}
                href={href}
                className={cn(
                  "rounded-full border px-4 py-2 transition",
                  isActive
                    ? "border-[rgb(var(--accent)/0.5)] bg-[rgb(var(--accent)/0.14)] text-white shadow-[0_0_16px_rgb(var(--accent)/0.25)]"
                    : "border-white/10 text-[rgb(var(--text-200))] hover:border-white/30 hover:text-white"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
