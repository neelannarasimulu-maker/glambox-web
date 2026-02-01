import Link from "next/link";
import { getMicrosites } from "@/lib/content/microsite";

export default function BookPage() {
  const microsites = getMicrosites();

  return (
    <main className="ambient-bg section-pad">
      <div className="container-glambox">
        <h1 className="mt-4 text-3xl font-semibold text-white">
          Choose your booking journey
        </h1>
        <p className="mt-3 text-[rgb(var(--text-300))]">
          Start with a popup to book the right service and consultant for you.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {microsites.map((microsite) => (
            <div
              key={microsite.id}
              className="card card-hover flex h-full flex-col gap-3 p-6"
            >
              <h2 className="text-xl font-semibold text-white">
                {microsite.name}
              </h2>
              <p className="text-sm text-[rgb(var(--text-300))]">
                {microsite.tagline}
              </p>
              <Link
                href={`/book/${microsite.id}`}
                className="btn-primary mt-4 inline-flex self-start"
              >
                Book {microsite.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
