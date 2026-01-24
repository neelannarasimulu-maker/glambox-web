import Link from "next/link";

export default function BookPage() {
  return (
    <main className="section-pad">
      <div className="container-glambox">
        <p className="badge text-xs">Book</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">
          Choose your booking journey
        </h1>
        <p className="mt-3 text-[rgb(var(--text-300))]">
          Start with a microsite to book the right service and therapist for you.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="card card-hover p-6">
            <h2 className="text-xl font-semibold text-white">Hair Studio</h2>
            <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
              Cuts, colour, treatments, and protective styles with therapist-first
              booking.
            </p>
            <Link href="/book/hair" className="btn-primary mt-6">
              Book hair
            </Link>
          </div>
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white">More coming soon</h2>
            <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
              Nail and wellness booking flows are on the way.
            </p>
            <Link href="/explore" className="btn-secondary mt-6">
              Explore microsites
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
