import Link from "next/link";
import { getMicrosites } from "@/lib/content/microsite";

export default function ExplorePage() {
  const microsites = getMicrosites();

  return (
    <main className="ambient-bg section-pad">
      <div className="container-glambox">
        <p className="badge text-xs">Explore</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">
          Discover our microsites
        </h1>
        <p className="mt-3 text-[rgb(var(--text-300))]">
          Browse services, therapists, gallery inspiration, and curated shop picks.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {microsites.map((microsite) => (
            <div key={microsite.id} className="card card-hover p-6">
              <h2 className="text-xl font-semibold text-white">
                {microsite.name}
              </h2>
              <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
                {microsite.tagline}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/explore/${microsite.id}`} className="btn-primary">
                  Explore {microsite.name}
                </Link>
                <Link
                  href={`/explore/${microsite.id}/services`}
                  className="btn-secondary"
                >
                  View services
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
