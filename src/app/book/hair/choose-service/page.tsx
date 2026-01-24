"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import BookingSummary from "@/components/hair/BookingSummary";
import {
  formatZar,
  getTherapistById,
  serviceCategories,
  services,
  viewDetailsLabel,
} from "@/lib/hair-data";
import {
  mergePreferences,
  rankServices,
  type HairQuestionnaire,
} from "@/lib/hair-recommendations";
import { readBookingDraft, writeBookingDraft } from "@/lib/hair-booking";

export default function ChooseServicePage() {
  const params = useSearchParams();
  const therapistId = params.get("therapistId") || undefined;
  const [category, setCategory] = useState<string | null>(null);
  const [questionnaire, setQuestionnaire] = useState<HairQuestionnaire | undefined>(
    undefined
  );

  useEffect(() => {
    const stored = window.localStorage.getItem("glambox.questionnaire");
    const profile = window.localStorage.getItem("glambox.profile");
    let parsedQuestionnaire: HairQuestionnaire | undefined;
    let parsedProfile: HairQuestionnaire | undefined;
    try {
      parsedQuestionnaire = stored ? (JSON.parse(stored) as HairQuestionnaire) : undefined;
    } catch {
      parsedQuestionnaire = undefined;
    }
    try {
      parsedProfile = profile ? (JSON.parse(profile) as HairQuestionnaire) : undefined;
    } catch {
      parsedProfile = undefined;
    }
    setQuestionnaire(mergePreferences(parsedQuestionnaire, parsedProfile));
  }, []);

  useEffect(() => {
    const current = readBookingDraft();
    writeBookingDraft({
      ...current,
      microsite: "hair",
      therapistId: therapistId ?? current.therapistId,
      location: therapistId
        ? getTherapistById(therapistId)?.locations[0]
        : current.location,
    });
  }, [therapistId]);

  const filtered = useMemo(() => {
    let list = [...services];
    if (category) list = list.filter((item) => item.category === category);
    return rankServices(list, questionnaire);
  }, [category, questionnaire]);

  return (
    <main className="section-pad">
      <div className="container-glambox grid gap-10 lg:grid-cols-[1.1fr_0.5fr]">
        <div>
          <p className="badge text-xs">Step 1</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">
            Choose a service
          </h1>
          <p className="mt-3 text-[rgb(var(--text-300))]">
            Prices are shown as “from” and vary by hair length, thickness, and
            consultation.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {serviceCategories.map((item) => (
              <button
                key={item}
                type="button"
                className={`chip text-sm ${category === item ? "bg-white/10" : ""}`}
                onClick={() => setCategory(category === item ? null : item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {filtered.map((service) => {
              const nextStep = therapistId
                ? `/book/hair/choose-time?serviceId=${service.id}&therapistId=${therapistId}`
                : `/book/hair/choose-therapist?serviceId=${service.id}`;

              return (
                <div key={service.id} className="card card-hover p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {service.name}
                      </h2>
                      <p className="mt-1 text-sm text-[rgb(var(--text-300))]">
                        {service.outcome}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-white">
                        From {formatZar(service.fromPriceZar)}
                      </p>
                      <p className="text-xs text-[rgb(var(--text-400))]">
                        {service.durationMins} mins
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/explore/hair/services/${service.id}`}
                      className="btn-secondary"
                    >
                      {viewDetailsLabel}
                    </Link>
                    <Link
                      href={nextStep}
                      className="btn-primary"
                      onClick={() =>
                        writeBookingDraft({
                          ...readBookingDraft(),
                          microsite: "hair",
                          serviceId: service.id,
                        })
                      }
                    >
                      Select service
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <BookingSummary />
      </div>
    </main>
  );
}
