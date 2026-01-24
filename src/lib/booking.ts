export type BookingDraft = {
  microsite: string;
  serviceId?: string;
  therapistId?: string;
  datetime?: string;
  location?: string;
  notes?: string;
};

export type BookingRecord = BookingDraft & {
  id: string;
  createdAt: string;
};

export const bookingDraftKey = "glambox.bookingDraft";
export const bookingsKey = "glambox.bookings";

export const readBookingDraft = (microsite: string): BookingDraft => {
  if (typeof window === "undefined") {
    return { microsite };
  }
  const stored = window.localStorage.getItem(bookingDraftKey);
  if (!stored) return { microsite };
  try {
    const parsed = JSON.parse(stored) as BookingDraft;
    return { microsite, ...parsed };
  } catch {
    return { microsite };
  }
};

export const writeBookingDraft = (draft: BookingDraft) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(bookingDraftKey, JSON.stringify(draft));
};

export const clearBookingDraft = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(bookingDraftKey);
};

export const appendBooking = (draft: BookingDraft) => {
  if (typeof window === "undefined") return;
  const stored = window.localStorage.getItem(bookingsKey);
  const current = stored ? (JSON.parse(stored) as BookingRecord[]) : [];
  const record: BookingRecord = {
    ...draft,
    id: `booking-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  window.localStorage.setItem(bookingsKey, JSON.stringify([...current, record]));
};
