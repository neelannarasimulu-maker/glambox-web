import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMicrosite, getMicrosites } from "@/lib/content/microsite";
import { getServicesByMicrosite } from "@/lib/content/services";
import {
  getServiceIdsForTherapistMicrosite,
  getTherapistById,
  getMicrositesForTherapist,
} from "@/lib/content/therapists";

const formatMicrositeName = (micrositeId: string) =>
  getMicrosite(micrositeId)?.name ?? micrositeId;

export default async function TherapistProfilePage({
  params,
}: {
  params: Promise<{ therapistId: string }>;
}) {
  const { therapistId } = await params;
  const therapist = getTherapistById(therapistId);

  if (!therapist) {
    notFound();
  }

  const microsites = getMicrositesForTherapist(therapist.id);

  return (
    <main className="container-glambox section-pad">
      <div className="card p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="image-frame relative h-64 w-full md:h-64 md:w-64">
            <Image
              src={therapist.photo}
              alt={therapist.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex-1">
            <p className="badge text-xs">Therapist Profile</p>
            <h1 className="mt-4 text-3xl font-semibold text-white">
              {therapist.name}
            </h1>
            <p className="mt-2 text-sm text-[rgb(var(--text-300))]">
              {therapist.roles.join(" • ")}
            </p>
            <p className="mt-4 text-[rgb(var(--text-300))]">{therapist.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {therapist.vibeTags.map((tag) => (
                <span key={tag} className="chip text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Services offered</h2>
          <Link
            href={`/book/${microsites[0] ?? getMicrosites()[0]?.id ?? "hair"}/choose-service?therapistId=${therapist.id}`}
            className="btn-primary"
          >
            Book with {therapist.name}
          </Link>
        </div>

        <div className="mt-6 space-y-8">
          {microsites.map((micrositeId) => {
            const serviceIds = getServiceIdsForTherapistMicrosite(
              therapist.id,
              micrositeId,
            );
            const servicesData = getServicesByMicrosite(micrositeId);
            const services = servicesData?.services.filter((service) =>
              serviceIds.includes(service.id),
            );

            if (!servicesData || !services || services.length === 0) {
              return null;
            }

            return (
              <div key={micrositeId}>
                <h3 className="text-xl font-semibold text-white">
                  {formatMicrositeName(micrositeId)} services
                </h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {services.map((service) => (
                    <div key={service.id} className="card p-5">
                      <p className="text-sm text-[rgb(var(--text-300))]">
                        {service.category}
                      </p>
                      <h4 className="mt-2 text-lg font-semibold text-white">
                        {service.name}
                      </h4>
                      <p className="mt-2 text-sm text-[rgb(var(--text-300))]">
                        {service.outcome}
                      </p>
                      <Link
                        href={`/explore/${micrositeId}/services/${service.id}`}
                        className="btn-secondary mt-4 inline-flex"
                      >
                        View service
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
