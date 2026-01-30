"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { readBookingDraft, writeBookingDraft } from "@/lib/booking";

const timeSlots = ["09:00", "10:30", "12:00", "14:00", "16:00"];

export default function ChooseTimePage() {
  const params = useParams<{ microsite: string }>();
  const searchParams = useSearchParams();
  const microsite = params?.microsite ?? "";
  const serviceId = searchParams.get("serviceId") ?? "";
  const therapistId = searchParams.get("therapistId") ?? "";

  const draft = useMemo(() => {
    if (!microsite) return null;
    return readBookingDraft(microsite);
  }, [microsite]);

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
          <p className="badge text-xs">Choose a time</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Available times</h1>
          <p className="mt-3 text-[rgb(var(--text-300))]">
            Select a preferred time for your booking.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {timeSlots.map((time) => (
            <Link
              key={time}
              href={`/book/${microsite}/confirm`}
              onClick={() =>
                writeBookingDraft({
                  microsite,
                  serviceId: serviceId || draft?.serviceId,
                  therapistId: therapistId || draft?.therapistId,
                  datetime: `2024-07-20 ${time}`,
                })
              }
              className="card card-hover p-5 text-center"
            >
              <div className="text-lg font-semibold text-white">{time}</div>
              <div className="mt-2 text-sm text-[rgb(var(--text-300))]">
                Tap to confirm
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
