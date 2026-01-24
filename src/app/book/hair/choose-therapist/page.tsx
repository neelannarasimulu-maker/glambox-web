"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import BookingSummary from "@/components/hair/BookingSummary";
import { getServiceById, therapists } from "@/lib/hair-data";
import {
  mergePreferences,
  rankTherapists,
  scoreTherapist,
  type HairQuestionnaire,
} from "@/lib/hair-recommendations";
import { readBookingDraft, writeBookingDraft } from "@/lib/hair-booking";

export default function ChooseTherapistPage() {
  const params = useSearchParams();
  const serviceId = params.get("serviceId") || undefined;
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
      serviceId: serviceId ?? current.serviceId,
    });
  }, [serviceId]);

  const recommendedIds = serviceId
    ? getServiceById(serviceId)?.recommendedTherapistIds ?? []
    : [];

  const ranked = useMemo(
    () => rankTherapists(therapists, questionnaire),
    [questionnaire]
  );

  const display = useMemo(() => {
    const recommended = ranked.filter((item) => recommendedIds.includes(item.id));
    const rest = ranked.filter((item) => !recommendedIds.includes(item.id));
    return [...recommended, ...rest];
  }, [ranked, recommendedIds]);

  return (
    <main className="section-pad">
      <div className="container-glambox grid gap-10 lg:grid-cols-[1.1fr_0.5fr]">
        <div>
          <p className="badge text-xs">Step 2</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">
            Choose a therapist
          </h1>
          <p className="mt-3 text-[rgb(var(--text-300))]">
            We’ve highlighted hair artists that best match your service and preferences.
          </p>

          <div className="mt-8 space-y-4">
            {display.map((therapist) => {
              const isRecommended =
                recommendedIds.includes(therapist.id) ||
                scoreTherapist(therapist, questionnaire) > 0;
              const nextStep = serviceId
                ? `/book/hair/choose-time?serviceId=${serviceId}&therapistId=${therapist.id}`
                : `/book/hair/choose-service?therapistId=${therapist.id}`;

              return (
                <div key={therapist.id} className="card card-hover p-5">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        src={therapist.photo}
                        alt={therapist.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold text-white">
                          {therapist.name}
                        </h2>
                        {isRecommended && (
                          <span className="badge text-xs">Recommended for you</span>
                        )}
                      </div>
                      <p className="text-sm text-[rgb(var(--text-300))]">
                        {therapist.role} • {therapist.priceTier} tier
                      </p>
                      <p className="mt-2 text-sm text-[rgb(var(--text-300))]">
                        Best for {therapist.vibeTags[0]} • Next available
                        {" "}{therapist.nextAvailable}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {therapist.specialties.slice(0, 3).map((spec) => (
                      <span key={spec} className="chip text-xs">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={`/explore/hair/therapists/${therapist.id}`}
                      className="btn-secondary"
                    >
                      View profile
                    </Link>
                    <Link
                      href={nextStep}
                      className="btn-primary"
                      onClick={() =>
                        writeBookingDraft({
                          ...readBookingDraft(),
                          microsite: "hair",
                          therapistId: therapist.id,
                          location: therapist.locations[0],
                        })
                      }
                    >
                      Select therapist
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
