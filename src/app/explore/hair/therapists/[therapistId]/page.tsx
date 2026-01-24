import Image from "next/image";
import Link from "next/link";
import {
  formatZar,
  getServicesByTherapist,
  getTherapistById,
} from "@/lib/hair-data";

export default function HairTherapistProfilePage({
  params,
}: {
  params: { therapistId: string };
}) {
  const therapist = getTherapistById(params.therapistId);

  if (!therapist) {
    return (
      <main className="section-pad">
        <div className="container-glambox">Therapist not found.</div>
      </main>
    );
  }

  const therapistServices = getServicesByTherapist(therapist.id);

  return (
    <main className="section-pad">
      <div className="container-glambox">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative h-[420px] overflow-hidden rounded-[32px]">
            <Image
              src={therapist.photo}
              alt={therapist.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="badge text-xs">{therapist.role}</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">
              {therapist.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[rgb(var(--text-300))]">
              <span>⭐ {therapist.rating} ({therapist.reviewsCount} reviews)</span>
              <span>•</span>
              <span>{therapist.priceTier} tier</span>
            </div>
            <p className="mt-5 text-[rgb(var(--text-300))]">{therapist.bio}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {therapist.specialties.map((spec) => (
                <span key={spec} className="chip text-xs">
                  {spec}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {therapist.vibeTags.map((tag) => (
                <span key={tag} className="badge text-xs">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/book/hair/choose-service?therapistId=${therapist.id}`}
                className="btn-primary"
              >
                Book with {therapist.name.split(" ")[0]}
              </Link>
              <Link href="/explore/hair/therapists" className="btn-secondary">
                View all therapists
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white">
            Services recommended by {therapist.name.split(" ")[0]}
          </h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {therapistServices.map((service) => (
              <div key={service.id} className="card card-hover p-6">
                <div className="flex items-center justify-between">
                  <span className="badge text-xs">{service.tier}</span>
                  <span className="text-sm text-[rgb(var(--text-400))]">
                    {service.durationMins} mins
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-[rgb(var(--text-300))]">
                  {service.outcome}
                </p>
                <div className="mt-4 text-lg font-semibold text-white">
                  From {formatZar(service.fromPriceZar)}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/explore/hair/services/${service.id}`}
                    className="btn-secondary"
                  >
                    View details
                  </Link>
                  <Link
                    href={`/book/hair/choose-time?serviceId=${service.id}&therapistId=${therapist.id}`}
                    className="btn-primary"
                  >
                    Book together
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
