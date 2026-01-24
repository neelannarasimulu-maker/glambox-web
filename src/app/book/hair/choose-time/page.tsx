"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import BookingSummary from "@/components/hair/BookingSummary";
import { getServiceById, getTherapistById } from "@/lib/hair-data";
import { readBookingDraft, writeBookingDraft } from "@/lib/hair-booking";

const timeSlots = [
  "09:00",
  "10:30",
  "12:00",
  "14:00",
  "15:30",
  "17:00",
];

const dates = ["Today", "Tomorrow", "Saturday", "Sunday"];

export default function ChooseTimePage() {
  const params = useSearchParams();
  const serviceId = params.get("serviceId") || undefined;
  const therapistId = params.get("therapistId") || undefined;
  const [selected, setSelected] = useState<string | null>(null);

  const service = serviceId ? getServiceById(serviceId) : undefined;
  const therapist = therapistId ? getTherapistById(therapistId) : undefined;

  useEffect(() => {
    const current = readBookingDraft();
    writeBookingDraft({
      ...current,
      microsite: "hair",
      serviceId: serviceId ?? current.serviceId,
      therapistId: therapistId ?? current.therapistId,
      location: therapist?.locations[0] ?? current.location,
    });
  }, [serviceId, therapistId, therapist]);

  const nextStep = useMemo(() => {
    if (!selected) return "#";
    return "/book/hair/confirm";
  }, [selected]);

  return (
    <main className="section-pad">
      <div className="container-glambox grid gap-10 lg:grid-cols-[1.1fr_0.5fr]">
        <div>
          <p className="badge text-xs">Step 3</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">
            Choose a time
          </h1>
          <p className="mt-3 text-[rgb(var(--text-300))]">
            {service ? `${service.durationMins} min session` : "Session length"} with
            {" "}{therapist ? therapist.name : "your therapist"}.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {dates.map((date) => (
              <div key={date} className="card p-5">
                <h2 className="text-lg font-semibold text-white">{date}</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {timeSlots.map((slot) => {
                    const value = `${date} ${slot}`;
                    const isSelected = selected === value;

                    return (
                      <button
                        key={value}
                        type="button"
                        className={`chip text-sm text-left ${
                          isSelected ? "bg-white/10" : ""
                        }`}
                        onClick={() => {
                          setSelected(value);
                          writeBookingDraft({
                            ...readBookingDraft(),
                            microsite: "hair",
                            datetime: value,
                          });
                        }}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book/hair/choose-therapist" className="btn-secondary">
              Back
            </Link>
            <Link
              href={nextStep}
              className={`btn-primary ${!selected ? "pointer-events-none opacity-60" : ""}`}
            >
              Continue to confirm
            </Link>
          </div>
        </div>
        <BookingSummary />
      </div>
    </main>
  );
}
