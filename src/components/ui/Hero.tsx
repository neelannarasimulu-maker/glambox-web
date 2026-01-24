import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/cn";

export function Hero({
  title,
  subtitle,
  ctaPrimary = "Book now",
  ctaSecondary = "Explore services",
  imageSrc = "/hero/glambox-hero.jpg",
  className,
}: {
  title: string;
  subtitle: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  imageSrc?: string;
  className?: string;
}) {
  return (
    <section className={cn("gb-bg", className)}>
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <Heading as="h1" tone="brand">
              {title}
            </Heading>

            <Text className="mt-3 max-w-xl" tone="muted" size="lg">
              {subtitle}
            </Text>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button>{ctaPrimary}</Button>
              <Button variant="secondary">{ctaSecondary}</Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted">
              <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1">
                Hair
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1">
                Nails
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1">
                Wellness
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1">
                Boutique Pop-ups
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="gb-glass overflow-hidden rounded-2xl shadow-soft">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={imageSrc}
                  alt="Glambox hero"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Quirky-professional accent: small corner badge */}
            <div className="absolute -bottom-3 -left-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-soft">
              <Text size="sm" weight="medium">
                Glow up, booked in minutes ✨
              </Text>
              <Text size="sm" tone="muted">
                Fast booking. Beautiful results.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
