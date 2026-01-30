"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { writeBookingDraft } from "@/lib/booking";
import { getServicesByMicrosite } from "@/lib/content/services";
import { getServiceIdsForTherapistMicrosite } from "@/lib/content/therapists";

const formatZar = (value: number) => `R${value.toLocaleString("en-ZA")}`;

export default function ChooseServicePage() {
  const params = useParams<{ microsite: string }>();
  const searchParams = useSearchParams();
  const microsite = params?.microsite ?? "";
  const therapistId = searchParams.get("therapistId") ?? "";
  const servicesData = getServicesByMicrosite(microsite);

  const services = useMemo(() => {
    if (!servicesData) return [];
    if (!therapistId) return servicesData.services;
    const allowed = new Set(
      getServiceIdsForTherapistMicrosite(therapistId, microsite),
    );
    return servicesData.services.filter((service) => allowed.has(service.id));
  }, [servicesData, therapistId, microsite]);

  if (!servicesData) {
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
          <p className="badge text-xs">Choose a service</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Services</h1>
          <p className="mt-3 text-[rgb(var(--text-300))]">
            {servicesData.pricingNote}
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="card card-hover p-6">
              <div className="flex items-center justify-between">
                <span className="badge text-xs">{service.tier}</span>
                <span className="text-sm text-[rgb(var(--text-300))]">
                  {service.durationMins} mins
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">
                {service.name}
              </h2>
              <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
                {service.outcome}
              </p>
              <div className="mt-4 text-white">
                From {formatZar(service.fromPriceZar)}
              </div>
              {therapistId ? (
                <Link
                  href={`/book/${microsite}/choose-time?serviceId=${service.id}&therapistId=${therapistId}`}
                  onClick={() =>
                    writeBookingDraft({ microsite, serviceId: service.id, therapistId })
                  }
                  className="btn-primary mt-5 inline-flex"
                >
                  Choose time
                </Link>
              ) : (
                <Link
                  href={`/book/${microsite}/choose-therapist?serviceId=${service.id}`}
                  onClick={() =>
                    writeBookingDraft({ microsite, serviceId: service.id })
                  }
                  className="btn-primary mt-5 inline-flex"
                >
                  Choose therapist
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
