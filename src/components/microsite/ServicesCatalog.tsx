"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ServicesData } from "@/lib/content/services";
import { getTherapistsForService } from "@/lib/content/therapists";

const formatZar = (value: number) => `R${value.toLocaleString("en-ZA")}`;

export default function ServicesCatalog({
  microsite,
  data,
}: {
  microsite: string;
  data: ServicesData;
}) {
  const [category, setCategory] = useState("all");
  const [tier, setTier] = useState("all");

  const services = useMemo(() => {
    return data.services.filter((service) => {
      if (category !== "all" && service.category !== category) return false;
      if (tier !== "all" && service.tier !== tier) return false;
      return true;
    });
  }, [category, tier, data.services]);

  return (
    <div className="container-glambox section-pad">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold heading-accent">Services</h1>
          <p className="mt-3 text-[rgb(var(--text-300))]">{data.pricingNote}</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase text-[rgb(var(--text-400))]">
              Category
            </span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-full border border-white/10 bg-transparent px-4 py-2 text-[rgb(var(--text-200))]"
            >
              <option value="all" className="bg-white text-slate-900">
                All
              </option>
              {data.categories.map((item) => (
                <option key={item} value={item} className="bg-white text-slate-900">
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase text-[rgb(var(--text-400))]">Tier</span>
            <select
              value={tier}
              onChange={(event) => setTier(event.target.value)}
              className="rounded-full border border-white/10 bg-transparent px-4 py-2 text-[rgb(var(--text-200))]"
            >
              <option value="all" className="bg-white text-slate-900">
                All
              </option>
              {data.tiers.map((item) => (
                <option key={item} value={item} className="bg-white text-slate-900">
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => {
          const therapists = getTherapistsForService(microsite, service.id)
            .map((therapist) => therapist.name)
            .slice(0, 3);

          return (
            <div
              key={service.id}
              className="card-accent card-hover p-6"
            >
              <div className="flex items-center justify-between">
                <span className="pill-accent text-xs">{service.tier}</span>
                <span className="text-sm text-[rgb(var(--text-300))]">
                  {service.durationMins} mins
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold heading-accent">
                {service.name}
              </h3>
              <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
                {service.outcome}
              </p>
              <div className="mt-4 text-lg font-semibold text-white">
                From {formatZar(service.fromPriceZar)}
              </div>
              {therapists.length > 0 ? (
                <div className="mt-4 text-sm text-[rgb(var(--text-300))]">
                  Available with {therapists.join(", ")}
                </div>
              ) : (
                <div className="mt-4 text-sm text-[rgb(var(--text-300))]">
                  Therapists coming soon
                </div>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/explore/${microsite}/services/${service.id}`}
                  className="btn-accent"
                >
                  View details
                </Link>
                <Link
                  href={`/book/${microsite}/choose-therapist?serviceId=${service.id}`}
                  className="btn-accent-outline"
                >
                  Book
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
