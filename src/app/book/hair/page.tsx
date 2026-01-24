"use client";

import Link from "next/link";
import { useEffect } from "react";
import { writeBookingDraft } from "@/lib/hair-booking";

export default function HairBookingLauncherPage() {
  useEffect(() => {
    writeBookingDraft({ microsite: "hair" });
  }, []);

  return (
    <main className="section-pad">
      <div className="container-glambox">
        <div className="max-w-2xl">
          <p className="badge text-xs">Book Hair</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">
            Choose how you want to book
          </h1>
          <p className="mt-3 text-[rgb(var(--text-300))]">
            Start with a service or start with a therapist. We’ll guide you to the
            perfect match.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="card card-hover p-6">
            <h2 className="text-xl font-semibold text-white">Book by Service</h2>
            <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
              Pick the outcome you want, then choose the best therapist and time.
            </p>
            <Link href="/book/hair/choose-service" className="btn-primary mt-6">
              Start with a service
            </Link>
          </div>
          <div className="card card-hover p-6">
            <h2 className="text-xl font-semibold text-white">Book by Therapist</h2>
            <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
              Choose a hair artist you love, then select the right service.
            </p>
            <Link
              href="/book/hair/choose-therapist"
              className="btn-primary mt-6"
            >
              Start with a therapist
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
