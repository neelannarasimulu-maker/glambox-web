import Image from "next/image";
import Link from "next/link";
import {
  formatZar,
  getHairServiceById,
  getTherapistsForService,
  pricingNote,
  viewProfileLabel,
} from "@/lib/content/hair";

export default function HairServiceDetailPage({
  params,
}: {
  params: { serviceId: string };
}) {
  const service = getHairServiceById(params.serviceId);

  if (!service) {
    return (
      <main className="section-pad">
        <div className="container-glambox">Service not found.</div>
      </main>
    );
  }

  const therapists = getTherapistsForService(service.id);

  return (
    <main className="section-pad">
      <div className="container-glambox grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="badge text-xs">{service.category}</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">
            {service.name}
          </h1>
          <p className="mt-4 text-lg text-[rgb(var(--text-300))]">
            {service.outcome}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="card p-4">
              <p className="text-xs uppercase text-[rgb(var(--text-400))]">From</p>
              <p className="text-2xl font-semibold text-white">
                {formatZar(service.fromPriceZar)}
              </p>
              {service.priceRangeZar && (
                <p className="text-xs text-[rgb(var(--text-400))]">
                  Range {formatZar(service.priceRangeZar[0])}–
                  {formatZar(service.priceRangeZar[1])}
                </p>
              )}
              <p className="text-xs text-[rgb(var(--text-400))]">{pricingNote}</p>
            </div>
            <div className="card p-4">
              <p className="text-xs uppercase text-[rgb(var(--text-400))]">Duration</p>
              <p className="text-2xl font-semibold text-white">
                {service.durationMins} mins
              </p>
              <p className="text-xs text-[rgb(var(--text-400))]">
                Includes consult + styling.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white">What’s included</h2>
            <ul className="mt-4 space-y-2 text-sm text-[rgb(var(--text-300))]">
              {service.includes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          {service.prepNotes && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-white">Prep notes</h2>
              <ul className="mt-4 space-y-2 text-sm text-[rgb(var(--text-300))]">
                {service.prepNotes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          )}

          {service.afterCare && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-white">Aftercare</h2>
              <ul className="mt-4 space-y-2 text-sm text-[rgb(var(--text-300))]">
                {service.afterCare.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="relative h-72 overflow-hidden rounded-3xl">
            <Image src={service.image} alt={service.name} fill className="object-cover" />
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-white">Recommended therapists</h3>
            <div className="mt-4 space-y-4">
              {therapists.length > 0 ? (
                therapists.map((therapist) => (
                  <Link
                    key={therapist.id}
                    href={`/explore/hair/therapists/${therapist.id}`}
                    className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition hover:border-white/15"
                  >
                    <div className="relative h-14 w-14 overflow-hidden rounded-full">
                      <Image
                        src={therapist.photo}
                        alt={therapist.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">
                        {therapist.name}
                      </p>
                      <p className="text-xs text-[rgb(var(--text-400))]">
                        Best for {therapist.vibeTags[0] ?? \"thoughtful care\"}
                      </p>
                    </div>
                    <span className="btn-secondary text-sm">
                      {viewProfileLabel}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-[rgb(var(--text-400))]">
                  Therapist recommendations are coming soon.
                </p>
              )}
            </div>
          </div>
          <Link
            href={`/book/hair/choose-therapist?serviceId=${service.id}`}
            className="btn-primary"
          >
            Book this service
          </Link>
        </div>
      </div>
    </main>
  );
}
