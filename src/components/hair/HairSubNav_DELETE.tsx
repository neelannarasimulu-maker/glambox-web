"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

const navItems = [
  { label: "Services", href: "/explore/hair/services" },
  { label: "Therapists", href: "/explore/hair/therapists" },
  { label: "Results", href: "/explore/hair#results" },
  { label: "Standards", href: "/explore/hair#standards" },
];

export default function HairSubNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const activeLabel = useMemo(() => {
    const active = navItems.find((item) => pathname.startsWith(item.href));
    if (active) return active.label;
    if (pathname === "/explore/hair") return "Home";
    return "Explore";
  }, [pathname]);

  return (
    <div className="sticky top-16 z-40 border-b border-white/10 bg-[rgb(var(--bg-900))]/90 backdrop-blur">
      <div className="container-glambox flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="badge text-xs">Hair Microsite</span>
          <span className="text-sm text-[rgb(var(--text-300))]">
            {activeLabel}
          </span>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="md:hidden">
            <button
              type="button"
              className="chip w-full text-left"
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
            >
              {open ? "Close menu" : "Browse sections"}
            </button>
            {open && (
              <div className="mt-2 flex flex-col gap-2 rounded-2xl bg-black/40 p-3">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm text-white/90 hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/book/hair"
                  className="btn-primary text-center"
                  onClick={() => setOpen(false)}
                >
                  Book Hair
                </Link>
              </div>
            )}
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium transition",
                    "text-white/80 hover:text-white",
                    active && "bg-white/10 text-white"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link href="/book/hair" className="btn-primary hidden md:inline-flex">
            Book Hair
          </Link>
        </div>
      </div>
    </div>
  );
}
