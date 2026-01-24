import Image from "next/image";
import Link from "next/link";
import { getHairTherapists, viewProfileLabel } from "@/lib/content/hair";

export default function HairTherapistsPage() {
  const therapists = getHairTherapists();

  return (
    <main className="section-pad">
      <div className="container-glambox">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="badge text-xs">Therapist Directory</p>
            <h1 className="mt-4 text-3xl font-semibold text-white">
              Meet your hair artists
            </h1>
            <p className="mt-3 text-[rgb(var(--text-300))]">
              Book someone you know or explore the full directory of hair experts.
            </p>
          </div>
          <Link href="/book/hair" className="btn-primary">
            Book Hair
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {therapists.map((therapist) => (
            <div key={therapist.id} className="card card-hover p-6">
              <div className="flex items-start gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
                  <Image
                    src={therapist.photo}
                    alt={therapist.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {therapist.name}
                      </h3>
                      <p className="text-sm text-[rgb(var(--text-300))]">
                        {therapist.role}
                      </p>
                    </div>
                    <span className="badge text-xs">{therapist.priceTier}</span>
                  </div>
                  <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
                    Best for {therapist.vibeTags[0] ?? "personalised care"}
                  </p>
                  <p className="mt-2 text-xs text-[rgb(var(--text-400))]">
                    {therapist.locations.join(" • ")}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {therapist.specialties.slice(0, 4).map((spec) => (
                  <span key={spec} className="chip text-xs">
                    {spec}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-sm text-[rgb(var(--text-300))]">
                Next available: {therapist.nextAvailable}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/explore/hair/therapists/${therapist.id}`}
                  className="btn-secondary"
                >
                  {viewProfileLabel}
                </Link>
                <Link
                  href={`/book/hair/choose-service?therapistId=${therapist.id}`}
                  className="btn-primary"
                >
                  Book with {therapist.name.split(" ")[0]}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
