import Image from "next/image";
import Link from "next/link";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Heading, Text } from "@/components/ui/Typography";

export default function HomePage() {
  return (
    <main className="min-h-screen gb-bg gb-page gb-grain">
      {/* HERO */}
      <section className="gb-bg">
        <Container className="py-10 md:py-14">
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* Copy */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="brand">New</Badge>
                <Badge>Hair</Badge>
                <Badge variant="muted">Nails</Badge>
                <Badge variant="outline">Wellness</Badge>
              </div>

              <h1 className="gb-display mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-text md:text-6xl">
                Your next{" "}
                <span className="text-brand">glow-up</span>{" "}
                <span className="text-brand-2">booked</span> in minutes.
              </h1>

              <p className="mt-4 max-w-xl text-base leading-7 text-muted md:text-lg">
                Glambox is a vibrant, premium booking experience for hair, nails,
                wellness and boutique pop-ups. Clean UI, bold accents, smooth flows.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button>
                  Book now
                </Button>
                <Button variant="secondary">
                  Explore services
                </Button>
                <Button variant="ghost">
                  View gallery
                </Button>
              </div>

              {/* Trust row */}
              <div className="mt-7 flex flex-wrap items-center gap-2 text-sm text-muted">
                <span className="gb-sticker rounded-full px-3 py-1 shadow-soft ring-1 ring-brand/20">
                  Fast booking
                </span>
                <span className="gb-sticker rounded-full px-3 py-1 shadow-soft ring-1 ring-brand-2/20">
                  Verified pros
                </span>
                <span className="gb-sticker rounded-full px-3 py-1 shadow-soft ring-1 ring-brand-3/20">
                  Beautiful results
                </span>
              </div>
            </div>

            {/* Hero imagery */}
            <div className="relative">
              <div className="gb-glass overflow-hidden rounded-[28px] border border-border shadow-soft">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/hero/landing-hero.jpg"
                    alt="Glambox hero"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Floating promo sticker */}
              <div className="absolute -bottom-4 -left-3 hidden rounded-2xl border border-border bg-white/40 px-4 py-3 shadow-soft backdrop-blur md:block">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-brand text-brand-ink shadow-glow">
                    ✨
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text">Specials drop weekly</p>
                    <p className="text-sm text-muted">Save, glow, repeat.</p>
                  </div>
                </div>
              </div>

              {/* Quirky corner highlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 rounded-[22px] border border-border bg-white/40 shadow-soft backdrop-blur"
              />
            </div>
          </div>
        </Container>
      </section>

      <div className="gb-divider" />

      {/* FEATURE STRIP */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="gb-glass">
            <CardHeader>
              <CardTitle>Book in minutes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Text tone="muted">
                Choose service, pick a time, confirm. Designed to feel effortless.
              </Text>
              <div className="flex flex-wrap gap-2">
                <Badge>Smart flow</Badge>
                <Badge variant="muted">Quick steps</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="gb-glass">
            <CardHeader>
              <CardTitle>Bold, premium visuals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Text tone="muted">
                Large typography, clean spacing, and vibrant accents that feel modern.
              </Text>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Big type</Badge>
                <Badge variant="muted">Clean spacing</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="gb-glass">
            <CardHeader>
              <CardTitle>Micro-sites per category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Text tone="muted">
                Hair, Nails and Wellness can each have a distinct theme, with shared components.
              </Text>
              <div className="flex flex-wrap gap-2">
                <Badge variant="brand">Themes</Badge>
                <Badge>Reusable UI</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* SERVICES PREVIEW */}
      <Section>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Heading as="h2">Featured services</Heading>
            <Text tone="muted" className="mt-2 max-w-2xl">
              A clean grid that scales across categories. Swap imagery + theme class per micro-site.
            </Text>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">See all</Button>
            <Button>Book now</Button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <ServiceCard
            title="Silk Press + Finish"
            meta="Hair • 60 min"
            price="From R450"
            imageSrc="/services/hair-1.jpg"
            badge="Popular"
          />
          <ServiceCard
            title="Signature Gel Set"
            meta="Nails • 50 min"
            price="From R300"
            imageSrc="/services/nails-1.jpg"
            badge="New"
          />
          <ServiceCard
            title="Glow Facial Reset"
            meta="Wellness • 45 min"
            price="From R520"
            imageSrc="/services/wellness-1.jpg"
            badge="Trending"
          />
        </div>
      </Section>

      {/* GALLERY STRIP */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <Heading as="h2">Gallery that sells the feeling</Heading>
            <Text tone="muted" className="mt-2">
              Bold images, minimal UI, and just enough sparkle to trigger the “I want that” moment.
            </Text>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="brand">Before/After</Badge>
              <Badge>Trending</Badge>
              <Badge variant="muted">Creators</Badge>
              <Badge variant="outline">Locations</Badge>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button>View gallery</Button>
              <Button variant="secondary">Become a partner</Button>
            </div>

            <div className="mt-6 inline-flex items-center rounded-2xl px-4 py-3 gb-sticker shadow-soft ring-1 ring-brand/20">
              <span className="text-sm font-medium">✨ Designed to feel effortless</span>
              <span className="ml-2 text-sm text-muted">Clean spacing, confident colour</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <GalleryTile src="/gallery/g-1.jpg" label="Hair" className="theme-hair" />
            <GalleryTile src="/gallery/g-2.jpg" label="Nails" className="theme-nails" />
            <GalleryTile src="/gallery/g-3.jpg" label="Wellness" className="theme-wellness sm:col-span-2" />
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="gb-glass rounded-[28px] border border-border p-7 shadow-soft md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <Heading as="h2" className="text-2xl md:text-3xl">
                Ready to book your next glow?
              </Heading>
              <Text tone="muted" className="mt-2 max-w-2xl">
                One account. Multiple categories. Clean experience. Bold aesthetic.
              </Text>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button>Book now</Button>
              <Button variant="secondary">Explore services</Button>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}

/* ---------------------------------------------------------
   Helpers used by the landing page
--------------------------------------------------------- */

function ServiceCard({
  title,
  meta,
  price,
  imageSrc,
  badge,
}: {
  title: string;
  meta: string;
  price: string;
  imageSrc: string;
  badge?: string;
}) {
  return (
    <Card className="gb-glass overflow-hidden">
      <div className="relative aspect-[4/3] w-full">
        <Image src={imageSrc} alt={title} fill className="object-cover" />
        {badge ? (
          <div className="absolute left-3 top-3">
            <span className="gb-sticker rounded-full px-3 py-1 text-xs font-medium shadow-soft ring-1 ring-brand/20">
              {badge}
            </span>
          </div>
        ) : null}
      </div>

      <CardContent className="space-y-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="gb-display text-base font-semibold text-text">{title}</p>
            <p className="text-sm text-muted">{meta}</p>
          </div>
          <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text">
            {price}
          </span>
        </div>

        <div className="pt-2 flex gap-2">
          <Button className="w-full">Book</Button>
          <Button variant="secondary" className="w-full">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function GalleryTile({
  src,
  label,
  className,
}: {
  src: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="gb-glass group relative overflow-hidden rounded-[26px] border border-border shadow-soft">
        <div className="relative aspect-[4/3] w-full">
          <Image src={src} alt={label} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        </div>

        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

        <div className="absolute left-3 top-3">
          <span className="gb-sticker rounded-full px-3 py-1 text-xs font-medium shadow-soft ring-1 ring-brand/20">
            {label}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="text-sm font-medium text-white drop-shadow">
            {label} highlights
          </span>
          <Link
            href="/gallery"
            className="rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-text shadow-soft backdrop-blur hover:bg-white transition focus-visible:gb-focus"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
