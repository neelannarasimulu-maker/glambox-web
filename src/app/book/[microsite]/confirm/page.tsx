"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { appendBooking, clearBookingDraft, readBookingDraft } from "@/lib/booking";
import { getServiceById } from "@/lib/content/services";
import { getTherapistById } from "@/lib/content/therapists";
import { getMicrosite } from "@/lib/content/microsite";

export default function ConfirmBookingPage() {
  const params = useParams<{ microsite: string }>();
  const microsite = params?.microsite ?? "";
  const [confirmed, setConfirmed] = useState(false);

  const draft = useMemo(() => {
    if (!microsite) return null;
    return readBookingDraft(microsite);
  }, [microsite]);

  const service = draft?.serviceId
    ? getServiceById(microsite, draft.serviceId)
    : null;
  const therapist = draft?.therapistId
    ? getTherapistById(draft.therapistId)
    : null;
  const config = getMicrosite(microsite);

  useEffect(() => {
    if (confirmed && draft) {
      appendBooking(draft);
      clearBookingDraft();
    }
  }, [confirmed, draft]);

  if (!config || !draft) {
    return (
      <main className="section-pad">
        <div className="container-glambox">Booking details missing.</div>
      </main>
    );
  }

  return (
    <main className="container-glambox section-pad">
      <div className="card p-8">
        <p className="badge text-xs">Confirm booking</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">
          Review your booking
        </h1>
        <div className="mt-6 space-y-3 text-sm text-[rgb(var(--text-300))]">
          <div>
            <strong className="text-white">Microsite:</strong> {config.name}
          </div>
          <div>
            <strong className="text-white">Service:</strong> {service?.name ?? "TBD"}
          </div>
          <div>
            <strong className="text-white">Therapist:</strong> {therapist?.name ?? "TBD"}
          </div>
          <div>
            <strong className="text-white">Time:</strong> {draft.datetime ?? "TBD"}
          </div>
        </div>

        {confirmed ? (
          <div className="mt-6">
            <p className="text-[rgb(var(--text-300))]">
              Booking confirmed! We saved your booking locally.
            </p>
            <Link href={`/explore/${config.id}`} className="btn-primary mt-4">
              Return to {config.name}
            </Link>
          </div>
        ) : (
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setConfirmed(true)}
              className="btn-primary"
            >
              Confirm booking
            </button>
            <Link href={`/book/${config.id}`} className="btn-secondary">
              Start over
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
