"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { writeBookingDraft } from "@/lib/booking";
import { getMicrosite } from "@/lib/content/microsite";
import { getProviderCopy } from "@/lib/content/provider-copy";

export default function BookingLauncherPage() {
  const params = useParams<{ microsite: string }>();
  const microsite = params?.microsite ?? "";
  const config = getMicrosite(microsite);
  const providerCopy = getProviderCopy(microsite);

  useEffect(() => {
    if (microsite) {
      writeBookingDraft({ microsite });
    }
  }, [microsite]);

  if (!config) {
    return (
      <main className="ambient-bg section-pad">
        <div className="container-glambox">
          <p className="text-[rgb(var(--text-300))]">
            Microsite not found.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="ambient-bg section-pad">
      <div className="container-glambox">
        <div className="max-w-2xl">
          <h1 className="mt-4 text-3xl font-semibold heading-accent">
            Choose how you want to book
          </h1>
          <p className="mt-3 text-[rgb(var(--text-300))]">
            Start with a service or start with a {providerCopy.singular}. We’ll guide you to
            the perfect match.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="card-accent card-hover flex h-full flex-col gap-3 p-6">
            <h2 className="text-xl font-semibold heading-accent">Book by Service</h2>
            <p className="text-sm text-[rgb(var(--text-300))]">
              Pick the outcome you want, then choose the best {providerCopy.singular} and time.
            </p>
            <Link
              href={`/book/${config.id}/choose-service`}
              className="btn-accent mt-4 inline-flex self-start"
            >
              Start with a service
            </Link>
          </div>
          <div className="card-accent card-hover flex h-full flex-col gap-3 p-6">
            <h2 className="text-xl font-semibold heading-accent">
              Book by {providerCopy.label}
            </h2>
            <p className="text-sm text-[rgb(var(--text-300))]">
              Choose a {providerCopy.singular} you love, then select the right service.
            </p>
            <Link
              href={`/book/${config.id}/choose-therapist`}
              className="btn-accent mt-4 inline-flex self-start"
            >
              Start with a {providerCopy.singular}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
