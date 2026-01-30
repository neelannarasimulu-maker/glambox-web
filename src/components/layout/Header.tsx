"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "./Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

function TopLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-xl px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition"
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  const closeMobile = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50">
      {/* REAL colourful background (gradient variable) */}
      <div className="absolute inset-0 -z-10 [background:var(--btn-primary)]" />
      {/* subtle glass layer */}
      <div className="absolute inset-0 -z-10 bg-black/10 backdrop-blur-xl" />
      {/* bottom border to separate from hero */}
      <div className="absolute inset-x-0 bottom-0 h-px -z-10 bg-white/15" />

      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" onClick={closeMobile}>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-black font-bold shadow-lg">
              G
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">
              Glambox
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            {/* Explore dropdown (CSS-based, no flicker) */}
            <div className="group relative">
              <button
                className="rounded-xl px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition"
                type="button"
              >
                Explore
              </button>

              {/* hover bridge to prevent popup disappearing */}
              <div className="absolute left-0 top-full h-3 w-56" />

              <div
                className={cn(
                  "absolute left-0 top-[calc(100%+0.5rem)] w-64 overflow-hidden rounded-2xl",
                  "bg-white text-black shadow-2xl ring-1 ring-black/10",
                  "opacity-0 translate-y-1 pointer-events-none",
                  "group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto",
                  "transition duration-150"
                )}
              >
                <Link
                  href="/explore"
                  className="block px-4 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
                >
                  Explore All (Microsites)
                </Link>

                <div className="h-px bg-neutral-200" />

                <Link
                  href="/explore/hair"
                  className="block px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-100"
                >
                  Hair
                </Link>

                <Link
                  href="/explore/nails"
                  className="block px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-100"
                >
                  Nails
                </Link>

                <Link
                  href="/explore/wellness"
                  className="block px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-100"
                >
                  Wellness
                </Link>
              </div>
            </div>

            <TopLink href="/ui">UI Kit</TopLink>
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* IMPORTANT: route to auth entry (which fans out to sign-in/sign-up) */}
            <Link href="/auth" className="rounded-xl px-3 py-2 text-sm font-medium text-white hover:bg-white/10 transition">
              Sign in
            </Link>

            <Link href="/book" className="rounded-xl px-3 py-2 text-sm font-medium bg-black text-white hover:bg-neutral-900 transition">
              Book now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={cn(
              "md:hidden rounded-xl border border-white/25 px-3 py-2 text-sm text-white",
              "hover:bg-white/10"
            )}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-3 rounded-2xl bg-white text-black shadow-xl p-4">
            <div className="flex flex-col gap-2">
              <Link
                href="/explore"
                className="font-semibold hover:underline"
                onClick={closeMobile}
              >
                Explore (Microsites)
              </Link>

              <Link
                href="/explore/hair"
                className="pl-3 text-sm hover:underline"
                onClick={closeMobile}
              >
                Hair
              </Link>

              <Link
                href="/explore/nails"
                className="pl-3 text-sm hover:underline"
                onClick={closeMobile}
              >
                Nails
              </Link>

              <Link
                href="/explore/wellness"
                className="pl-3 text-sm hover:underline"
                onClick={closeMobile}
              >
                Wellness
              </Link>

              <div className="h-px bg-neutral-200 my-2" />

              <Link
                href="/ui"
                className="text-sm font-medium hover:underline"
                onClick={closeMobile}
              >
                UI Kit
              </Link>
            </div>

            <div className="mt-4 flex gap-2">
              {/* Mobile Sign in routes to auth entry */}

              <Button className="flex-1" variant="secondary" onClick={closeMobile}>
                <Link href="/auth">
                  Sign in
                </Link>
              </Button>

              <Button className="flex-1">
                <Link href="/book" onClick={closeMobile}>
                  Book
                </Link>
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
