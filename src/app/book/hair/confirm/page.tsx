"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BookingSummary from "@/components/hair/BookingSummary";
import { formatZar, getServiceById, getTherapistById } from "@/lib/hair-data";
import {
  appendBooking,
  clearBookingDraft,
  readBookingDraft,
  type BookingDraft,
} from "@/lib/hair-booking";

export default function HairBookingConfirmPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<BookingDraft>({ microsite: "hair" });
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setDraft(readBookingDraft());
  }, []);

  const service = draft.serviceId ? getServiceById(draft.serviceId) : undefined;
  const therapist = draft.therapistId
    ? getTherapistById(draft.therapistId)
    : undefined;

  return (
    <main className="section-pad">
      <div className="container-glambox grid gap-10 lg:grid-cols-[1.1fr_0.5fr]">
        <div>
          <p className="badge text-xs">Step 4</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">
            Confirm your booking
          </h1>
          <p className="mt-3 text-[rgb(var(--text-300))]">
            Review your details before confirming. Final pricing may vary by hair
            length, thickness, and consultation.
          </p>

          <div className="mt-6 space-y-4">
            <div className="card p-5">
              <h2 className="text-lg font-semibold text-white">Service</h2>
              <p className="mt-2 text-sm text-[rgb(var(--text-300))]">
                {service ? service.name : "Select a service"}
              </p>
              {service && (
                <p className="mt-2 text-sm text-white">
                  From {formatZar(service.fromPriceZar)} • {service.durationMins} mins
                </p>
              )}
            </div>
            <div className="card p-5">
              <h2 className="text-lg font-semibold text-white">Therapist</h2>
              <p className="mt-2 text-sm text-[rgb(var(--text-300))]">
                {therapist ? therapist.name : "Select a therapist"}
              </p>
              <p className="mt-2 text-sm text-white">
                {draft.location || "Choose a location"}
              </p>
            </div>
            <div className="card p-5">
              <h2 className="text-lg font-semibold text-white">Appointment time</h2>
              <p className="mt-2 text-sm text-[rgb(var(--text-300))]">
                {draft.datetime || "Select a time"}
              </p>
            </div>
            <div className="card p-5">
              <h2 className="text-lg font-semibold text-white">Notes</h2>
              <textarea
                className="mt-3 w-full rounded-2xl border border-white/10 bg-black/40 p-3 text-sm text-white"
                placeholder="Share anything we should know: hair length, sensitivities, goals."
                rows={4}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </div>
          </div>

          <button
            type="button"
            className="btn-primary mt-8"
            onClick={() => {
              const payload = { ...draft, notes };
              appendBooking(payload);
              clearBookingDraft();
              router.push("/book/success");
            }}
          >
            Confirm booking
          </button>
        </div>
        <BookingSummary />
      </div>
    </main>
  );
}
