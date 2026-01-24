import Link from "next/link";
import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
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
    <footer className="mt-12">
      {/* Top divider */}
      <div className="gb-divider" />

      <div className="gb-bg">
        <Container className="py-10">
          <div className="grid gap-10 md:grid-cols-12">
            {/* Brand column */}
            <div className="md:col-span-5">
              <div className="gb-sticker rounded-2xl p-5 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand text-brand-ink shadow-glow">
                    G
                  </span>
                  <div>
                    <Heading as="h3" className="text-lg">
                      Glambox
                    </Heading>
                    <Text tone="muted" size="sm">
                      Vibrant, premium booking for hair, nails and wellness.
                    </Text>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="brand">Bookable</Badge>
                  <Badge>Trusted</Badge>
                  <Badge variant="muted">Boutique</Badge>
                  <Badge variant="outline">Pop-ups</Badge>
                </div>

                <Text tone="muted" className="mt-4">
                  Designed to feel effortless: clean spacing, confident colour,
                  and a little sparkle where it counts ✨
                </Text>

                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href="mailto:hello@glambox.com"
                    className="gb-glass rounded-xl border border-border px-4 py-2 text-sm text-text shadow-soft hover:bg-surface-2 transition focus-visible:gb-focus"
                  >
                    hello@glambox.com
                  </a>
                  <a
                    href="tel:+27000000000"
                    className="gb-glass rounded-xl border border-border px-4 py-2 text-sm text-text shadow-soft hover:bg-surface-2 transition focus-visible:gb-focus"
                  >
                    +27 00 000 0000
                  </a>
                </div>
              </div>
            </div>

            {/* Link columns */}
            <div className="md:col-span-7 grid gap-8 sm:grid-cols-3">
              <div>
                <Heading as="h4" className="text-base">
                  Explore
                </Heading>
                <div className="mt-3 flex flex-col gap-2">
                  <FooterLink href="/services">Services</FooterLink>
                  <FooterLink href="/gallery">Gallery</FooterLink>
                  <FooterLink href="/book">Book</FooterLink>
                  <FooterLink href="/ui">UI Kit</FooterLink>
                </div>
              </div>

              <div>
                <Heading as="h4" className="text-base">
                  Micro-sites
                </Heading>
                <div className="mt-3 flex flex-col gap-2">
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
                <Text tone="muted" size="sm" className="mt-3">
                  Each micro-site can apply <span className="font-medium">theme-hair</span>,{" "}
                  <span className="font-medium">theme-nails</span> or{" "}
                  <span className="font-medium">theme-wellness</span>.
                </Text>
              </div>

              <div>
                <Heading as="h4" className="text-base">
                  Company
                </Heading>
                <div className="mt-3 flex flex-col gap-2">
                  <FooterLink href="/about">About</FooterLink>
                  <FooterLink href="/contact">Contact</FooterLink>
                  <FooterLink href="/privacy">Privacy</FooterLink>
                  <FooterLink href="/terms">Terms</FooterLink>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Text tone="muted" size="sm">
              © {new Date().getFullYear()} Glambox. All rights reserved.
            </Text>

            <div className="flex flex-wrap items-center gap-2">
              <span className="gb-glass rounded-full border border-border px-3 py-1 text-xs text-muted shadow-soft">
                Built with Next.js + Tailwind
              </span>
              <span className="gb-glass rounded-full border border-border px-3 py-1 text-xs text-muted shadow-soft">
                Proudly SA 🇿🇦
              </span>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
