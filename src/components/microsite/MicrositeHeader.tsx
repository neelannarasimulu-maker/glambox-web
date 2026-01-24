import Link from "next/link";
import type { MicrositeConfig } from "@/lib/content/microsite";

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
  return (
    <div className="border-b border-white/5 bg-[rgb(var(--bg-900))]">
      <div className="container-glambox flex flex-wrap items-center justify-between gap-4 py-5">
        <div>
          <Link href={`/explore/${config.id}`} className="text-lg font-semibold text-white">
            {config.name}
          </Link>
          <p className="text-sm text-[rgb(var(--text-300))]">{config.tagline}</p>
        </div>
        <nav className="flex flex-wrap gap-3 text-sm">
          {config.nav.map((item) => (
            <Link
              key={item}
              href={navPaths[item]?.(config.id) ?? `/explore/${config.id}`}
              className="rounded-full border border-white/10 px-4 py-2 text-[rgb(var(--text-200))] hover:border-white/30"
            >
              {navLabels[item] ?? item}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
