import Link from "next/link";
import {
  formatZar,
  getHairServices,
  getHairTherapistById,
  pricingNote,
} from "@/lib/content/hair";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function HairServicesPage() {
  const services = getHairServices();

  return (
    <main className="section-pad">
      <div className="container-glambox">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="badge text-xs">Hair Services</p>
            <h1 className="mt-4 text-3xl font-semibold text-white">Service catalogue</h1>
            <p className="mt-3 text-[rgb(var(--text-300))]">{pricingNote}</p>
          </div>
          <Link href="/book/hair" className="btn-primary">
            Book Hair
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {services.map((service) => {
            const recommendedTherapists = service.recommendedTherapistIds
              .map((id) => getHairTherapistById(id))
              .filter((therapist): therapist is NonNullable<typeof therapist> =>
                Boolean(therapist)
              )
              .slice(0, 2);

            return (
              <div key={service.id} className="card card-hover p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="badge text-xs">{service.tier}</span>
                  <span className="text-xs text-[rgb(var(--text-400))]">
                    {service.durationMins} mins
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm text-[rgb(var(--text-300))]">
                      {service.outcome}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-white">
                      From {formatZar(service.fromPriceZar)}
                    </div>
                    {service.priceRangeZar && (
                      <div className="text-xs text-[rgb(var(--text-400))]">
                        {formatZar(service.priceRangeZar[0])}–
                        {formatZar(service.priceRangeZar[1])}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  {recommendedTherapists.map((therapist) => (
                    <div
                      key={therapist.id}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white"
                      aria-label={`Recommended therapist ${therapist.name}`}
                    >
                      {getInitials(therapist.name)}
                    </div>
                  ))}
                  {recommendedTherapists.length > 0 ? (
                    <span className="text-xs text-[rgb(var(--text-400))]">
                      Recommended therapists
                    </span>
                  ) : (
                    <span className="text-xs text-[rgb(var(--text-400))]">
                      Recommended therapists to be announced
                    </span>
                  )}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/explore/hair/services/${service.id}`}
                    className="btn-secondary"
                  >
                    View details
                  </Link>
                  <Link
                    href={`/book/hair/choose-therapist?serviceId=${service.id}`}
                    className="btn-primary"
                  >
                    Book
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
