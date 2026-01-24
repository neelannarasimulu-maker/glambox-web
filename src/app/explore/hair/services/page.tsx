"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  formatZar,
  getTherapistById,
  priceTiers,
  serviceCategories,
  services,
  type Therapist,
} from "@/lib/hair-data";
import {
  mergePreferences,
  rankServices,
  scoreService,
  type HairQuestionnaire,
} from "@/lib/hair-recommendations";

const durations = [
  { label: "Under 60 min", value: "short" },
  { label: "60–120 min", value: "medium" },
  { label: "120+ min", value: "long" },
];

export default function HairServicesPage() {
  const [category, setCategory] = useState<string | null>(null);
  const [tier, setTier] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [recommendedOnly, setRecommendedOnly] = useState(false);
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

  const filtered = useMemo(() => {
    let list = [...services];
    if (category) list = list.filter((item) => item.category === category);
    if (tier) list = list.filter((item) => item.tier === tier);
    if (duration === "short") list = list.filter((item) => item.durationMins < 60);
    if (duration === "medium")
      list = list.filter((item) => item.durationMins >= 60 && item.durationMins <= 120);
    if (duration === "long") list = list.filter((item) => item.durationMins > 120);

    const ranked = rankServices(list, questionnaire);
    if (recommendedOnly) {
      return ranked.filter((item) => scoreService(item, questionnaire) > 0);
    }

    return ranked;
  }, [category, tier, duration, recommendedOnly, questionnaire]);

  return (
    <main className="section-pad">
      <div className="container-glambox">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="badge text-xs">Hair Services</p>
            <h1 className="mt-4 text-3xl font-semibold text-white">Service catalogue</h1>
            <p className="mt-3 text-[rgb(var(--text-300))]">
              Pricing shown as “from” and varies by hair length, thickness, and location.
            </p>
          </div>
          <Link href="/book/hair" className="btn-primary">
            Book Hair
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
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
          {priceTiers.map((item) => (
            <button
              key={item}
              type="button"
              className={`chip text-sm ${tier === item ? "bg-white/10" : ""}`}
              onClick={() => setTier(tier === item ? null : item)}
            >
              {item}
            </button>
          ))}
          {durations.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`chip text-sm ${duration === item.value ? "bg-white/10" : ""}`}
              onClick={() => setDuration(duration === item.value ? null : item.value)}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            className={`chip text-sm ${recommendedOnly ? "bg-white/10" : ""}`}
            onClick={() => setRecommendedOnly((prev) => !prev)}
          >
            Recommended for you
          </button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {filtered.map((service) => {
            const recommendedTherapists = service.recommendedTherapistIds
              .map((id) => getTherapistById(id))
              .filter((therapist): therapist is Therapist => Boolean(therapist))
              .slice(0, 2);
            const isRecommended = scoreService(service, questionnaire) > 0;

            return (
              <div key={service.id} className="card card-hover p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="badge text-xs">{service.tier}</span>
                  {isRecommended && (
                    <span className="badge text-xs">Recommended for you</span>
                  )}
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm text-[rgb(var(--text-300))]">
                      {service.outcome}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-white">
                      From {formatZar(service.fromPriceZar)}
                    </div>
                    <div className="text-sm text-[rgb(var(--text-400))]">
                      {service.durationMins} mins
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  {recommendedTherapists.map((therapist) => (
                    <div
                      key={therapist.id}
                      className="relative h-8 w-8 overflow-hidden rounded-full border border-white/10"
                    >
                      <Image
                        src={therapist.photo}
                        alt={therapist.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <span className="text-xs text-[rgb(var(--text-400))]">
                    Recommended therapists
                  </span>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/explore/hair/services/${service.id}`}
                    className="btn-secondary"
                  >
                    View details
                  </Link>
                  <Link
                    href={`/book/hair/choose-therapist?serviceId=${service.id}`}
                    className="btn-primary"
                  >
                    Book
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
