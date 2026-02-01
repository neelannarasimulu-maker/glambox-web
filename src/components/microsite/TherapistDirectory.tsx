"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Therapist } from "@/lib/content/therapists";

export default function TherapistDirectory({
  therapists,
  worksIn,
  themeKey: _themeKey,
  title = "Find your match",
  subtitle = "Browse across hair, nails, and wellness.",
  showWorksIn = true,
}: {
  therapists: Therapist[];
  worksIn: Record<string, string[]>;
  themeKey?: string;
  title?: string;
  subtitle?: string;
  showWorksIn?: boolean;
}) {
  const [role, setRole] = useState("all");
  void _themeKey;

  const roles = useMemo(() => {
    const unique = new Set<string>();
    therapists.forEach((therapist) =>
      therapist.roles.forEach((item) => unique.add(item)),
    );
    return Array.from(unique);
  }, [therapists]);

  const filtered = useMemo(() => {
    return therapists.filter((therapist) => {
      if (role !== "all" && !therapist.roles.includes(role)) {
        return false;
      }
      return true;
    });
  }, [therapists, role]);

  return (
    <main className="container-glambox section-pad">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold heading-accent">{title}</h1>
          <p className="mt-3 text-[rgb(var(--text-300))]">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase text-[rgb(var(--text-400))]">Role</span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="rounded-full border border-white/10 bg-[rgb(var(--bg-900))] px-4 py-2 text-[rgb(var(--text-100))]"
            >
              <option value="all" className="bg-[rgb(var(--bg-900))] text-[rgb(var(--text-100))]">
                All
              </option>
              {roles.map((item) => (
                <option
                  key={item}
                  value={item}
                  className="bg-[rgb(var(--bg-900))] text-[rgb(var(--text-100))]"
                >
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((therapist) => (
          <div
            key={therapist.id}
            className="card-accent card-hover p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold heading-accent">
                  {therapist.name}
                </h2>
                <p className="text-sm text-[rgb(var(--text-300))]">
                  {therapist.roles.join(" • ")}
                </p>
              </div>
              <span className="pill-accent text-xs">{therapist.rating}★</span>
            </div>
            <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
              {therapist.bio}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {therapist.specialties.slice(0, 3).map((specialty) => (
                <span key={specialty} className="pill-accent text-xs">
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
                    <span key={microsite} className="pill-accent text-xs">
                      {microsite}
                    </span>
                  ))}
                </div>
              </>
            ) : null}
            <div className="mt-6">
              <Link href={`/therapists/${therapist.id}`} className="btn-accent inline-flex">
                View profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
