import Link from "next/link";

export default function BookingSuccessPage() {
  return (
    <main className="section-pad">
      <div className="container-glambox max-w-2xl">
        <p className="badge text-xs">Booking confirmed</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">
          Your hair appointment is confirmed
        </h1>
        <p className="mt-3 text-[rgb(var(--text-300))]">
          We’ve saved your booking. You can review details or make changes from
          your dashboard anytime.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/dashboard" className="btn-primary">
            Go to dashboard
          </Link>
          <Link href="/explore/hair" className="btn-secondary">
            Back to Hair Studio
          </Link>
        </div>
      </div>
    </main>
  );
}
