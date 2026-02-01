"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { writeBookingDraft } from "@/lib/booking";
import {
  getTherapistsForMicrosite,
  getTherapistsForService,
} from "@/lib/content/therapists";

export default function ChooseTherapistPage() {
  const params = useParams<{ microsite: string }>();
  const searchParams = useSearchParams();
  const microsite = params?.microsite ?? "";
  const serviceId = searchParams.get("serviceId") ?? "";
  const isHairTheme = microsite === "hair";

  const therapists = useMemo(() => {
    if (!microsite) return [];
    if (!serviceId) return getTherapistsForMicrosite(microsite);
    return getTherapistsForService(microsite, serviceId);
  }, [microsite, serviceId]);

  if (!microsite) {
    return (
      <main className="ambient-bg section-pad">
        <div className="container-glambox">Microsite not found.</div>
      </main>
    );
  }

  return (
    <main className="ambient-bg section-pad">
      <div className="container-glambox">
        <div>
          <h1
            className={`mt-4 text-3xl font-semibold ${
              isHairTheme ? "heading-accent" : "text-white"
            }`}
          >
            Hair Stylists
          </h1>
          <p className="mt-3 text-[rgb(var(--text-300))]">
            Select the stylist you’d like to book with.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {therapists.map((therapist) => (
            <div
              key={therapist.id}
              className={`${isHairTheme ? "card-artist-hair" : "card"} card-hover p-6`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {therapist.name}
                  </h2>
                  <p className="text-sm text-[rgb(var(--text-300))]">
                    {therapist.roles.join(" • ")}
                  </p>
                </div>
                <span className={`${isHairTheme ? "pill-accent" : "badge"} text-xs`}>
                  {therapist.rating}★
                </span>
              </div>
              <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
                {therapist.bio}
              </p>
              <Link
                href={`/book/${microsite}/choose-time?${
                  serviceId ? `serviceId=${serviceId}&` : ""
                }therapistId=${therapist.id}`}
                onClick={() =>
                  writeBookingDraft({ microsite, serviceId, therapistId: therapist.id })
                }
                className={`mt-5 inline-flex ${
                  isHairTheme ? "btn-hair" : "btn-primary"
                }`}
              >
                Choose time
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
