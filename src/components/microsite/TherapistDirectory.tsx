"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Therapist } from "@/lib/content/therapists";

export default function TherapistDirectory({
  therapists,
  worksIn,
  badgeLabel = "Therapists",
  title = "Find your match",
  subtitle = "Browse across hair, nails, and wellness.",
  showWorksIn = true,
}: {
  therapists: Therapist[];
  worksIn: Record<string, string[]>;
  badgeLabel?: string;
  title?: string;
  subtitle?: string;
  showWorksIn?: boolean;
}) {
  const [location, setLocation] = useState("all");
  const [role, setRole] = useState("all");

  const locations = useMemo(() => {
    const unique = new Set<string>();
    therapists.forEach((therapist) =>
      therapist.locations.forEach((item) => unique.add(item)),
    );
    return Array.from(unique);
  }, [therapists]);

  const roles = useMemo(() => {
    const unique = new Set<string>();
    therapists.forEach((therapist) =>
      therapist.roles.forEach((item) => unique.add(item)),
    );
    return Array.from(unique);
  }, [therapists]);

  const filtered = useMemo(() => {
    return therapists.filter((therapist) => {
      if (location !== "all" && !therapist.locations.includes(location)) {
        return false;
      }
      if (role !== "all" && !therapist.roles.includes(role)) {
        return false;
      }
      return true;
    });
  }, [therapists, location, role]);

  return (
    <main className="container-glambox section-pad">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="badge text-xs">{badgeLabel}</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">{title}</h1>
          <p className="mt-3 text-[rgb(var(--text-300))]">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase text-[rgb(var(--text-400))]">
              Location
            </span>
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="rounded-full border border-white/10 bg-transparent px-4 py-2 text-[rgb(var(--text-200))]"
            >
              <option value="all">All</option>
              {locations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase text-[rgb(var(--text-400))]">Role</span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="rounded-full border border-white/10 bg-transparent px-4 py-2 text-[rgb(var(--text-200))]"
            >
              <option value="all">All</option>
              {roles.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((therapist) => (
          <div key={therapist.id} className="card card-hover p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {therapist.name}
                </h2>
                <p className="text-sm text-[rgb(var(--text-300))]">
                  {therapist.roles.join(" • ")}
                </p>
              </div>
              <span className="badge text-xs">{therapist.rating}★</span>
            </div>
            <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
              {therapist.bio}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {therapist.specialties.slice(0, 3).map((specialty) => (
                <span key={specialty} className="chip text-xs">
                  {specialty}
                </span>
              ))}
            </div>
            {showWorksIn ? (
              <>
                <div className="mt-4 text-xs uppercase text-[rgb(var(--text-400))]">
                  Works in
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {worksIn[therapist.id]?.map((microsite) => (
                    <span key={microsite} className="badge text-xs">
                      {microsite}
                    </span>
                  ))}
                </div>
              </>
            ) : null}
            <Link href={`/therapists/${therapist.id}`} className="btn-primary mt-6">
              View profile
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
