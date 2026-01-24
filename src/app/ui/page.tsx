"use client";

import * as React from "react";

import { Hero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Heading, Text } from "@/components/ui/Typography";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { Switch } from "@/components/ui/Switch";
import { Badge } from "@/components/ui/Badge";

import Section from "@/components/layout/Section";

export default function UiPage() {
  return (
    <main className="min-h-screen gb-bg gb-page gb-grain">
      <Hero
        title="Glambox"
        subtitle="A vibrant, premium booking experience for hair, nails, wellness and boutique pop-ups. Clean UI, bold accents, smooth flows."
      />

      {/* Core tokens + utilities showcase */}
      <Section>
        <div className="flex flex-col gap-6">
          <div>
            <Heading as="h2">Design Tokens</Heading>
            <Text tone="muted" className="mt-2">
              These swatches + surfaces are driven by CSS variables in globals.css and mapped into Tailwind.
            </Text>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex flex-col items-start gap-2">
                <div className="h-10 w-24 rounded-2xl bg-brand shadow-glow" />
                <Text size="sm" tone="muted">
                  brand
                </Text>
              </div>

              <div className="flex flex-col items-start gap-2">
                <div className="h-10 w-24 rounded-2xl bg-brand-2 shadow-glow" />
                <Text size="sm" tone="muted">
                  brand-2
                </Text>
              </div>

              <div className="flex flex-col items-start gap-2">
                <div className="h-10 w-24 rounded-2xl bg-brand-3 shadow-glow" />
                <Text size="sm" tone="muted">
                  brand-3
                </Text>
              </div>

              <div className="flex flex-col items-start gap-2">
                <div className="h-10 w-24 rounded-2xl bg-brand-4 shadow-glow" />
                <Text size="sm" tone="muted">
                  brand-4
                </Text>
              </div>

              <div className="ml-auto hidden md:flex items-center gap-2">
                <div className="h-10 w-10 rounded-2xl bg-surface border border-border shadow-soft" />
                <div className="h-10 w-10 rounded-2xl bg-surface-2 border border-border shadow-soft" />
                <div className="h-10 w-10 rounded-2xl bg-bg border border-border shadow-soft" />
              </div>
            </div>
          </div>

          {/* Sticker + divider */}
          <div className="mt-2">
            <div className="inline-flex items-center rounded-2xl px-4 py-3 gb-sticker shadow-soft ring-1 ring-brand/20">
              <span className="text-sm font-medium">✨ Designed to feel effortless</span>
              <span className="ml-2 text-sm text-muted">Clean spacing, confident colour</span>
            </div>

            <div className="mt-6 gb-divider" />
          </div>

          {/* Typography */}
          <div className="mt-2">
            <Heading as="h2">Typography</Heading>
            <Text tone="muted" className="mt-2">
              Global fonts are set in layout.tsx (Inter + Manrope). Headings use the display font, body uses the sans font.
            </Text>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Card className="gb-glass">
                <CardHeader>
                  <CardTitle>Headings</CardTitle>
                </CardHeader>
                <CardContent className="text-text space-y-2">
                  <Heading as="h1">Heading H1</Heading>
                  <Heading as="h2">Heading H2</Heading>
                  <Heading as="h3">Heading H3</Heading>
                  <Heading as="h4">Heading H4</Heading>
                </CardContent>
              </Card>

              <Card className="gb-glass">
                <CardHeader>
                  <CardTitle>Body text</CardTitle>
                </CardHeader>
                <CardContent className="text-text space-y-2">
                  <Text size="lg">
                    Large body text for hero intros, key descriptions and emotional story copy.
                  </Text>
                  <Text>
                    Default text for normal UI paragraphs. Comfortable line height for reading and scanning.
                  </Text>
                  <Text size="sm" tone="muted">
                    Small muted text for hints, helper copy and subtle metadata.
                  </Text>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Core components: + buttons + focus ring + badges*/}
          <div className="mt-2">
            <Heading as="h2">Components + States</Heading>
            <Text tone="muted" className="mt-2">
              Buttons, glass cards and focus rings should match the tokens and utilities from globals.css.
            </Text>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <Card className="gb-glass lg:col-span-2">
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                </CardHeader>
                <CardContent className="text-text">
                  <div className="flex flex-wrap gap-3">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button disabled>Disabled</Button>
                  </div>

                  <Text size="sm" tone="muted" className="mt-4">
                    Tip: press Tab to see the gb-focus ring on interactive elements.
                  </Text>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button className="rounded-xl border border-border bg-surface px-4 py-2 text-sm focus-visible:gb-focus">
                      Focus test (Tab me)
                    </button>
                    <a
                      href="#"
                      className="rounded-xl border border-border bg-surface px-4 py-2 text-sm hover:bg-surface-2 focus-visible:gb-focus"
                    >
                      Link focus test
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="gb-sticker">
                <CardHeader>
                  <CardTitle>Glass + Sticker</CardTitle>
                </CardHeader>
                <CardContent className="text-text space-y-2">
                  <Text>
                    This card uses <span className="font-medium">gb-sticker</span> instead of gb-glass for a playful,
                    boutique accent.
                  </Text>
                  <Text size="sm" tone="muted">
                    You can use sticker surfaces for promos, “specials”, and micro-site highlights.
                  </Text>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Input, Checkbox, Switch */}
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className="gb-glass">
              <CardHeader>
                <CardTitle>Core Inputs</CardTitle>
              </CardHeader>
              <CardContent className="text-text space-y-5">
                <Input
                  id="name"
                  label="Your name"
                  placeholder="e.g. Ayesha"
                  hint="This helps personalize your booking."
                />

                <Input
                  id="email"
                  label="Email"
                  placeholder="you@example.com"
                  rightSlot={<span className="text-xs">✉</span>}
                />

                <Input
                  id="promo"
                  label="Promo code"
                  placeholder="GLAM10"
                  error="That code looks invalid. Try again."
                />

                <Select id="service" label="Choose a service" hint="We’ll show available times next.">
                  <option value="">Select…</option>
                  <option value="hair">Hair</option>
                  <option value="nails">Nails</option>
                  <option value="wellness">Wellness</option>
                </Select>
              </CardContent>
            </Card>

            <Card className="gb-glass">
              <CardHeader>
                <CardTitle>Toggles + Badges</CardTitle>
              </CardHeader>
              <CardContent className="text-text space-y-6 bg-white/40 rounded-2xl p-5">
                <div className="flex flex-wrap gap-2">
                  <Badge>Popular</Badge>
                  <Badge variant="muted">New</Badge>
                  <Badge variant="outline">Limited</Badge>
                  <Badge variant="brand">Bookable</Badge>
                </div>

                <div className="gb-divider" />

                <Checkbox
                  id="consent"
                  label="Keep me updated"
                  hint="Occasional drops, specials and early access."
                  defaultChecked
                />

                <Checkbox
                  id="terms"
                  label={
                    <span>
                      I agree to the <span className="text-brand">terms</span>
                    </span>
                  }
                  hint="Required to continue."
                />

                <div className="gb-divider" />

                <Switch
                  id="reminders"
                  label="Booking reminders"
                  hint="We’ll message you before your appointment."
                  defaultChecked
                />

                <Switch
                  id="private"
                  label="Private mode"
                  hint="Hide your booking details on shared devices."
                />

                <div className="pt-2 flex flex-wrap gap-3">
                  <Button>Save</Button>
                  <Button variant="secondary">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Theme overrides */}
          <div className="mt-2">
            <Heading as="h2">Micro-site Themes</Heading>
            <Text tone="muted" className="mt-2">
              These blocks override the same CSS variables using theme classes: theme-nails, theme-hair, theme-wellness.
            </Text>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="theme-nails gb-bg rounded-2xl border border-border p-5 shadow-soft">
                <Heading as="h3" tone="brand">
                  Nails
                </Heading>
                <Text tone="muted" className="mt-2">
                  Bright, playful glam. Borders and highlights inherit the nails palette.
                </Text>
                <div className="mt-4 flex gap-2">
                  <div className="h-8 w-8 rounded-xl bg-brand-2" />
                  <div className="h-8 w-8 rounded-xl bg-brand-3" />
                  <div className="h-8 w-8 rounded-xl bg-brand-4" />
                </div>
                <div className="mt-4">
                  <Button>Book nails</Button>
                </div>
              </div>

              <div className="theme-hair gb-bg rounded-2xl border border-border p-5 shadow-soft">
                <Heading as="h3" tone="brand">
                  Hair
                </Heading>
                <Text tone="muted" className="mt-2">
                  Cool confidence with a modern salon edge. Same components, different mood.
                </Text>
                <div className="mt-4 flex gap-2">
                  <div className="h-8 w-8 rounded-xl bg-brand-2" />
                  <div className="h-8 w-8 rounded-xl bg-brand-3" />
                  <div className="h-8 w-8 rounded-xl bg-brand-4" />
                </div>
                <div className="mt-4">
                  <Button>Book hair</Button>
                </div>
              </div>

              <div className="theme-wellness gb-bg rounded-2xl border border-border p-5 shadow-soft">
                <Heading as="h3" tone="brand">
                  Wellness
                </Heading>
                <Text tone="muted" className="mt-2">
                  Calm energy, premium care. Vibrant accents with softer emotional tone.
                </Text>
                <div className="mt-4 flex gap-2">
                  <div className="h-8 w-8 rounded-xl bg-brand-2" />
                  <div className="h-8 w-8 rounded-xl bg-brand-3" />
                  <div className="h-8 w-8 rounded-xl bg-brand-4" />
                </div>
                <div className="mt-4">
                  <Button>Book wellness</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Selection hint */}
          <div className="mt-2">
            <Heading as="h2">Small Polishes</Heading>
            <Text tone="muted" className="mt-2">
              Selection styling is also defined in globals.css. Try selecting this sentence to see the brand-tinted highlight.
            </Text>
          </div>
        </div>
      </Section>
    </main>
  );
}
