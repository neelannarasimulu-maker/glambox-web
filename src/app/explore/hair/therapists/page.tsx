"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { therapists } from "@/lib/hair-data";
import {
  mergePreferences,
  rankTherapists,
  scoreTherapist,
  type HairQuestionnaire,
} from "@/lib/hair-recommendations";

const specialtyFilters = [
  "Balayage",
  "Protective styles",
  "Natural hair care",
  "Blowouts",
];

const priceFilters = ["Essential", "Signature", "Luxe"];

const locationFilters = ["Cape Town", "Johannesburg", "Pretoria"];

export default function HairTherapistsPage() {
  const [specialty, setSpecialty] = useState<string | null>(null);
  const [priceTier, setPriceTier] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
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
    let list = [...therapists];
    if (specialty)
      list = list.filter((item) =>
        item.specialties.some((spec) => spec.includes(specialty))
      );
    if (priceTier) list = list.filter((item) => item.priceTier === priceTier);
    if (location) list = list.filter((item) => item.locations.includes(location));

    const ranked = rankTherapists(list, questionnaire);
    if (recommendedOnly) {
      return ranked.filter((item) => scoreTherapist(item, questionnaire) > 0);
    }

    return ranked;
  }, [specialty, priceTier, location, recommendedOnly, questionnaire]);

  const recommended = filtered.filter(
    (item) => scoreTherapist(item, questionnaire) > 0
  );

  return (
    <main className="section-pad">
      <div className="container-glambox">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="badge text-xs">Therapist Directory</p>
            <h1 className="mt-4 text-3xl font-semibold text-white">
              Meet your hair artists
            </h1>
            <p className="mt-3 text-[rgb(var(--text-300))]">
              Book someone you know or let us match you based on your goals.
            </p>
          </div>
          <Link href="/book/hair" className="btn-primary">
            Book Hair
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {specialtyFilters.map((item) => (
            <button
              key={item}
              type="button"
              className={`chip text-sm ${specialty === item ? "bg-white/10" : ""}`}
              onClick={() => setSpecialty(specialty === item ? null : item)}
            >
              {item}
            </button>
          ))}
          {priceFilters.map((item) => (
            <button
              key={item}
              type="button"
              className={`chip text-sm ${priceTier === item ? "bg-white/10" : ""}`}
              onClick={() => setPriceTier(priceTier === item ? null : item)}
            >
              {item}
            </button>
          ))}
          {locationFilters.map((item) => (
            <button
              key={item}
              type="button"
              className={`chip text-sm ${location === item ? "bg-white/10" : ""}`}
              onClick={() => setLocation(location === item ? null : item)}
            >
              {item}
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

        {recommended.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-white">
              Recommended for you
            </h2>
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              {recommended.map((therapist) => (
                <div key={therapist.id} className="card card-hover p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        src={therapist.photo}
                        alt={therapist.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {therapist.name}
                      </p>
                      <p className="text-sm text-[rgb(var(--text-300))]">
                        {therapist.role}
                      </p>
                    </div>
                    <span className="badge text-xs ml-auto">Recommended</span>
                  </div>
                  <p className="mt-4 text-sm text-[rgb(var(--text-300))]">
                    Best for {therapist.vibeTags[0]} • Next available
                    {" "}{therapist.nextAvailable}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {therapist.specialties.slice(0, 3).map((spec) => (
                      <span key={spec} className="chip text-xs">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/explore/hair/therapists/${therapist.id}`}
                      className="btn-secondary"
                    >
                      View profile
                    </Link>
                    <Link
                      href={`/book/hair/choose-service?therapistId=${therapist.id}`}
                      className="btn-primary"
                    >
                      Book with {therapist.name.split(" ")[0]}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {filtered.map((therapist) => (
            <div key={therapist.id} className="card card-hover p-6">
              <div className="flex items-start gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
                  <Image
                    src={therapist.photo}
                    alt={therapist.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {therapist.name}
                      </h3>
                      <p className="text-sm text-[rgb(var(--text-300))]">
                        {therapist.role}
                      </p>
                    </div>
                    <span className="badge text-xs">{therapist.priceTier}</span>
                  </div>
                  <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
                    Best for {therapist.vibeTags[0]}
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
              <div className="mt-4 text-sm text-[rgb(var(--text-300))]">
                Next available: {therapist.nextAvailable}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/explore/hair/therapists/${therapist.id}`}
                  className="btn-secondary"
                >
                  View profile
                </Link>
                <Link
                  href={`/book/hair/choose-service?therapistId=${therapist.id}`}
                  className="btn-primary"
                >
                  Book with {therapist.name.split(" ")[0]}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
