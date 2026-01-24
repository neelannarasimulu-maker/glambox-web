import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMicrosite } from "@/lib/content/microsite";
import { getServiceById, getServicesByMicrosite } from "@/lib/content/services";
import { getTherapistsForService } from "@/lib/content/therapists";

const formatZar = (value: number) => `R${value.toLocaleString("en-ZA")}`;

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ microsite: string; serviceId: string }>;
}) {
  const { microsite, serviceId } = await params;
  const config = getMicrosite(microsite);
  const servicesData = getServicesByMicrosite(microsite);
  const service = getServiceById(microsite, serviceId);

  if (!config || !servicesData || !service) {
    notFound();
  }

  const therapists = getTherapistsForService(config.id, service.id);

  return (
    <main className="container-glambox section-pad">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="badge text-xs">{service.category}</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">
            {service.name}
          </h1>
          <p className="mt-4 text-[rgb(var(--text-300))]">{service.outcome}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-[rgb(var(--text-300))]">
            <span className="badge text-xs">{service.tier}</span>
            <span>{service.durationMins} mins</span>
            <span>From {formatZar(service.fromPriceZar)}</span>
          </div>
          <p className="mt-4 text-sm text-[rgb(var(--text-400))]">
            {servicesData.pricingNote}
          </p>

          <div className="mt-8 grid gap-6">
            <div>
              <h2 className="text-xl font-semibold text-white">What’s included</h2>
              <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--text-300))]">
                {service.includes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Prep notes</h2>
              <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--text-300))]">
                {service.prepNotes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">After care</h2>
              <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--text-300))]">
                {service.afterCare.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card overflow-hidden">
            <div className="relative h-56 w-full">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-white">Book this service</h2>
              <p className="mt-2 text-sm text-[rgb(var(--text-300))]">
                Choose a therapist and time that works for you.
              </p>
              <Link
                href={`/book/${config.id}/choose-therapist?serviceId=${service.id}`}
                className="btn-primary mt-4"
              >
                Book this service
              </Link>
            </div>
          </div>
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-white">Available with</h2>
            <div className="mt-4 space-y-3 text-sm text-[rgb(var(--text-300))]">
              {therapists.length > 0 ? (
                therapists.map((therapist) => (
                  <div key={therapist.id} className="flex items-center justify-between">
                    <span>{therapist.name}</span>
                    <Link
                      href={`/therapists/${therapist.id}`}
                      className="text-white underline"
                    >
                      View profile
                    </Link>
                  </div>
                ))
              ) : (
                <p>No therapists assigned yet.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
