import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMicrosite } from "@/lib/content/microsite";
import { getServicesByMicrosite } from "@/lib/content/services";
import { getTherapistById } from "@/lib/content/therapists";
import { getGalleryByMicrosite } from "@/lib/content/gallery";
import { getProductsByMicrosite } from "@/lib/content/products";

const formatZar = (value: number) => `R${value.toLocaleString("en-ZA")}`;

export default async function MicrositeHomePage({
  params,
}: {
  params: Promise<{ microsite: string }>;
}) {
  const { microsite } = await params;
  const config = getMicrosite(microsite);
  const servicesData = getServicesByMicrosite(microsite);
  const galleryData = getGalleryByMicrosite(microsite);
  const productsData = getProductsByMicrosite(microsite);

  if (!config || !servicesData || !galleryData || !productsData) {
    notFound();
  }

  const featuredServices = config.featuredServiceIds
    .map((id) => servicesData.services.find((service) => service.id === id))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  const featuredTherapists = config.featuredTherapistIds
    .map((id) => getTherapistById(id))
    .filter((therapist): therapist is NonNullable<typeof therapist> => Boolean(therapist));

  const highlights = config.highlights ?? [];

  const galleryTeasers = (
    config.galleryTeaserIds?.length
      ? config.galleryTeaserIds
          .map((id) => galleryData.items.find((item) => item.id === id))
          .filter((item): item is NonNullable<typeof item> => Boolean(item))
      : galleryData.items.slice(0, 3)
  ).slice(0, 3);

  const shopTeasers = (
    config.shopTeaserProductIds?.length
      ? config.shopTeaserProductIds
          .map((id) => productsData.products.find((product) => product.id === id))
          .filter((product): product is NonNullable<typeof product> => Boolean(product))
      : productsData.products.slice(0, 3)
  ).slice(0, 3);

  const cta = config.cta ?? {
    headline: "Ready when you are.",
    body: `Launch a booking journey tailored to ${config.name}.`,
    primaryCta: { label: `Book ${config.name}`, href: `/book/${config.id}` },
    secondaryCta: { label: "Browse Services", href: `/explore/${config.id}/services` },
  };

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={config.heroImage}
            alt={config.name}
            fill
            className="object-cover opacity-70"
            priority
          />
        </div>
        <div className="container-glambox section-pad relative">
          <div className="max-w-2xl">
            <span className="badge text-sm">{config.name}</span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-6xl">
              {config.tagline}
            </h1>
            <p className="mt-5 text-lg text-[rgb(var(--text-300))]">
              {config.about.headline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/book/${config.id}`} className="btn-primary">
                Book {config.name}
              </Link>
              <Link
                href={`/explore/${config.id}/services`}
                className="btn-secondary"
              >
                Browse Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-soft" />

      <section className="section-pad">
        <div className="container-glambox grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="badge text-xs">About</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              About {config.name}
            </h2>
            <p className="mt-4 text-[rgb(var(--text-300))]">
              {config.about.body}
            </p>
          </div>
          {highlights.length > 0 ? (
            <div className="grid gap-4">
              {highlights.map((highlight) => (
                <div key={highlight.title} className="card p-6">
                  <h3 className="text-lg font-semibold text-white">
                    {highlight.title}
                  </h3>
                  <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
                    {highlight.body}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-glambox">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="badge text-xs">Featured Services</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                Tailored outcomes, beautifully priced.
              </h2>
            </div>
            <Link
              href={`/explore/${config.id}/services`}
              className="btn-secondary"
            >
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredServices.map((service) => (
              <div key={service.id} className="card card-hover p-6">
                <div className="flex items-center justify-between">
                  <span className="badge text-xs">{service.tier}</span>
                  <span className="text-sm text-[rgb(var(--text-300))]">
                    {service.durationMins} mins
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {service.name}
                </h3>
                <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
                  {service.outcome}
                </p>
                <div className="mt-4 text-lg font-semibold text-white">
                  From {formatZar(service.fromPriceZar)}
                </div>
                <Link
                  href={`/explore/${config.id}/services/${service.id}`}
                  className="btn-primary mt-6 inline-flex"
                >
                  View details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-glambox">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="badge text-xs">Meet the Team</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                Therapists with warmth, skill, and range.
              </h2>
            </div>
            <Link href="/therapists" className="btn-secondary">
              Browse directory
            </Link>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {featuredTherapists.map((therapist) => (
              <div key={therapist.id} className="card card-hover p-6">
                <div className="relative h-56 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={therapist.photo}
                    alt={therapist.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {therapist.name}
                    </h3>
                    <p className="text-sm text-[rgb(var(--text-300))]">
                      {therapist.roles.join(" • ")}
                    </p>
                  </div>
                  <span className="badge text-xs">{therapist.rating}★</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {therapist.specialties.slice(0, 3).map((specialty) => (
                    <span key={specialty} className="chip text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-sm text-[rgb(var(--text-300))]">
                  Locations: {therapist.locations.join(", ")}
                </div>
                <Link
                  href={`/therapists/${therapist.id}`}
                  className="btn-primary mt-5 inline-flex"
                >
                  View profile
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-glambox">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="badge text-xs">Gallery</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                A peek at the latest results.
              </h2>
            </div>
            <Link
              href={`/explore/${config.id}/gallery`}
              className="btn-secondary"
            >
              View gallery
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {galleryTeasers.map((item) => (
              <div key={item.id} className="card overflow-hidden">
                <div className="relative h-56 w-full">
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-sm text-[rgb(var(--text-300))]">
                  {item.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-glambox">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="badge text-xs">Shop</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                Products curated for this microsite.
              </h2>
            </div>
            <Link href={`/explore/${config.id}/shop`} className="btn-secondary">
              Shop all
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {shopTeasers.map((product) => (
              <div key={product.id} className="card card-hover p-6">
                <div className="relative h-40 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {product.name}
                </h3>
                <p className="text-sm text-[rgb(var(--text-300))]">
                  {product.shortDesc}
                </p>
                <div className="mt-3 text-white">
                  {formatZar(product.priceZar)}
                </div>
                <Link
                  href={`/explore/${config.id}/shop/${product.id}`}
                  className="btn-primary mt-4 inline-flex"
                >
                  View product
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-glambox">
          <div className="card p-8 text-center">
            <h2 className="text-3xl font-semibold text-white">
              {cta.headline}
            </h2>
            <p className="mt-3 text-[rgb(var(--text-300))]">
              {cta.body}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href={cta.primaryCta.href} className="btn-primary">
                {cta.primaryCta.label}
              </Link>
              {cta.secondaryCta ? (
                <Link href={cta.secondaryCta.href} className="btn-secondary">
                  {cta.secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
