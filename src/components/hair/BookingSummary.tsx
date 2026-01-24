"use client";

import { useEffect, useState } from "react";
import { getServiceById, getTherapistById } from "@/lib/hair-data";
import { readBookingDraft, type BookingDraft } from "@/lib/hair-booking";

export default function BookingSummary() {
  const [draft, setDraft] = useState<BookingDraft>({ microsite: "hair" });

  useEffect(() => {
    setDraft(readBookingDraft());
    const handleStorage = () => setDraft(readBookingDraft());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const service = draft.serviceId ? getServiceById(draft.serviceId) : undefined;
  const therapist = draft.therapistId
    ? getTherapistById(draft.therapistId)
    : undefined;

  return (
    <div className="sticky top-24 z-30 hidden md:block">
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-white">Booking summary</h3>
        <div className="mt-4 space-y-3 text-sm text-[rgb(var(--text-300))]">
          <div>
            <p className="text-xs uppercase text-[rgb(var(--text-400))]">Service</p>
            <p className="text-white">
              {service ? service.name : "Select a service"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase text-[rgb(var(--text-400))]">Therapist</p>
            <p className="text-white">
              {therapist ? therapist.name : "Select a therapist"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase text-[rgb(var(--text-400))]">Location</p>
            <p className="text-white">{draft.location || "Choose a location"}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-[rgb(var(--text-400))]">Date & time</p>
            <p className="text-white">{draft.datetime || "Select a slot"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
