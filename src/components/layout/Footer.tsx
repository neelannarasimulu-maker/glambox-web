import Link from "next/link";
import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import { cn } from "@/lib/cn";
import { Heading, Text } from "@/components/ui/Typography";

function FooterLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm text-muted hover:text-text transition",
        "focus-visible:gb-focus rounded-lg px-1 py-0.5",
        className
      )}
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="mt-8">
      {/* Top divider */}
      <div className="gb-divider" />

      <div className="gb-bg">
        <Container className="py-6 md:py-8">
          <div className="grid gap-6 md:grid-cols-12">
            {/* Brand column */}
            <div className="md:col-span-5">
              <div className="gb-sticker rounded-2xl p-4 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand text-brand-ink shadow-glow">
                    G
                  </span>
                  <div>
                    <Heading as="h3" className="text-lg">
                      Glambox
                    </Heading>
                    <Text tone="muted" size="sm">
                      Vibrant health, beauty and wellness portal.
                    </Text>
                    <Text tone="muted" size="sm">
                      © {new Date().getFullYear()} Glambox. All rights reserved.
                    </Text>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href="mailto:hello@glambox.com"
                    className="gb-glass rounded-xl border border-border px-3 py-1.5 text-sm text-text shadow-soft hover:bg-surface-2 transition focus-visible:gb-focus"
                  >
                    hello@glambox.co.za
                  </a>
                  <a
                    href="tel:+27000000000"
                    className="gb-glass rounded-xl border border-border px-3 py-1.5 text-sm text-text shadow-soft hover:bg-surface-2 transition focus-visible:gb-focus"
                  >
                    +27 00 000 0000
                  </a>
                </div>
              </div>
            </div>

            {/* Link columns */}
            <div className="md:col-span-7 grid gap-6 sm:grid-cols-3">

              <div>
                <Heading as="h4" className="text-base">
                  Pop Ups
                </Heading>
                <div className="mt-2.5 flex flex-col gap-2">
                  <FooterLink href="/hair" className="text-brand">
                    Hair
                  </FooterLink>
                  <FooterLink href="/nails" className="text-brand-4">
                    Nails
                  </FooterLink>
                  <FooterLink href="/wellness" className="text-brand-2">
                    Wellness
                  </FooterLink>
                </div>
              </div>

              <div>
                <Heading as="h4" className="text-base">
                  Company
                </Heading>
                <div className="mt-2.5 flex flex-col gap-2">
                  <FooterLink href="/about">About</FooterLink>
                  <FooterLink href="/contact">Contact</FooterLink>
                  <FooterLink href="/privacy">Ts & Cs</FooterLink>
                </div>
              </div>
            </div>
          </div>

        </Container>
      </div>
    </footer>
  );
}
