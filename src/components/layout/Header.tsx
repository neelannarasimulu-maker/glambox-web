"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "./Container";
import NavLink from "./NavLink";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Wordmark */}
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-brand text-brand-ink shadow-glow">
              G
            </span>
            <span className="gb-display text-sm font-semibold tracking-tight">
              Glambox
            </span>
            <span className="hidden sm:inline rounded-full border border-border bg-surface px-2 py-1 text-xs text-muted">
              vibrant • premium
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-2 md:flex">
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/gallery">Gallery</NavLink>
            <NavLink href="/book">Book</NavLink>
            <NavLink href="/ui">UI Kit</NavLink>
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost">Sign in</Button>
            <Button>Book now</Button>
          </div>

          {/* Mobile toggle */}
          <button
            className={cn(
              "md:hidden rounded-xl border border-border bg-surface px-3 py-2 text-sm",
              "hover:bg-surface-2 focus-visible:gb-focus"
            )}
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4">
            <div className="gb-divider mb-3" />
            <div className="flex flex-col gap-1">
              <NavLink href="/services">Services</NavLink>
              <NavLink href="/gallery">Gallery</NavLink>
              <NavLink href="/book">Book</NavLink>
              <NavLink href="/ui">UI Kit</NavLink>
            </div>

            <div className="mt-3 flex gap-2">
              <Button className="flex-1" variant="secondary">
                Sign in
              </Button>
              <Button className="flex-1">Book</Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
