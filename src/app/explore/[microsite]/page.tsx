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

  const servicesSection = config.sections.services;
  const therapistsSection = config.sections.therapists;
  const gallerySection = config.sections.gallery;
  const shopSection = config.sections.shop;
  const standardsSection = config.sections.standards;
  const isHairTheme = config.themeKey === "hair";

  const featuredServices = servicesSection.featuredServiceIds
    .map((id) => servicesData.services.find((service) => service.id === id))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  const featuredTherapists = therapistsSection.featuredTherapists.therapistIds
    .map((id) => getTherapistById(id))
    .filter((therapist): therapist is NonNullable<typeof therapist> => Boolean(therapist));

  const highlights = config.highlights ?? [];

  const galleryTeasers = gallerySection.teaserIds
    .map((id) => galleryData.items.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const shopTeasers = shopSection.teaserProductIds
    .map((id) => productsData.products.find((product) => product.id === id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <main className="ambient-bg">
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
            <span className="badge text-sm">{config.hero.badge}</span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight heading-accent md:text-6xl">
              {config.hero.headline}
            </h1>
            <p className="mt-5 text-lg text-[rgb(var(--text-300))]">
              {config.hero.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={config.hero.primaryCta.href} className="btn-accent">
                {config.hero.primaryCta.label}
              </Link>
              {config.hero.secondaryCta ? (
                <Link
                  href={config.hero.secondaryCta.href}
                  className="btn-secondary"
                >
                  {config.hero.secondaryCta.label}
                </Link>
              ) : null}
            </div>
            {config.hero.trustCues?.length ? (
              <div className="mt-8 flex flex-wrap gap-2 text-sm text-[rgb(var(--text-300))]">
                {config.hero.trustCues.map((cue) => (
                  <span key={cue} className="badge text-xs">
                    {cue}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="divider-soft" />

      <section className="section-pad">
        <div className="container-glambox grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <h2 className="mt-4 text-3xl font-semibold heading-accent">
              {config.about.headline}
            </h2>
            <p className="mt-4 text-[rgb(var(--text-300))]">
              {config.about.body}
            </p>
          </div>
          {highlights.length > 0 ? (
            <div className="grid gap-4">
              {highlights.map((highlight) => (
                <div key={highlight.title} className="card-nails p-6">
                  <h3 className="text-lg font-semibold heading-accent">
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
              <h2 className="text-3xl font-semibold heading-accent">
                {servicesSection.title}
              </h2>
              <p className="mt-3 text-[rgb(var(--text-300))]">
                {servicesSection.subtitle}
              </p>
            </div>
            <Link
              href={servicesSection.viewAllHref}
              className="btn-accent-outline"
            >
              {servicesSection.viewAllLabel}
            </Link>
          </div>
          {featuredServices.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredServices.map((service) => (
                <div
                  key={service.id}
                  className={`${isHairTheme ? "card-hair" : "card-nails"} card-hover p-6`}
                >
                  <div className="flex items-center justify-between">
                    <span className="pill-accent text-xs">{service.tier}</span>
                    <span className="text-sm text-[rgb(var(--text-300))]">
                      {service.durationMins} mins
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold heading-accent">
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
                    className="btn-accent mt-6 inline-flex"
                  >
                    {servicesSection.cardCtaLabel}
                  </Link>
                </div>
              ))}
            </div>
          ) : servicesSection.emptyState ? (
            <div className="mt-8">
              <div className="card-nails p-6 text-center">
                <h3 className="text-xl font-semibold heading-accent">
                  {servicesSection.emptyState.title}
                </h3>
                <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
                  {servicesSection.emptyState.body}
                </p>
                {servicesSection.emptyState.cta ? (
                  <Link
                    href={servicesSection.emptyState.cta.href}
                    className="btn-accent-outline mt-5 inline-flex"
                  >
                    {servicesSection.emptyState.cta.label}
                  </Link>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-glambox">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold heading-accent">
                {therapistsSection.title}
              </h2>
              <p className="mt-3 text-[rgb(var(--text-300))]">
                {therapistsSection.subtitle}
              </p>
            </div>
            <Link href={therapistsSection.viewAllHref} className="btn-accent-outline">
              {therapistsSection.viewAllLabel}
            </Link>
          </div>
          {featuredTherapists.length > 0 ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {featuredTherapists.map((therapist) => (
                <div
                  key={therapist.id}
                  className={`${isHairTheme ? "card-artist-hair" : "card-nails"} card-hover p-6`}
                >
                  <div className="image-frame relative h-56 w-full">
                    <Image
                      src={therapist.photo}
                      alt={therapist.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold heading-accent">
                        {therapist.name}
                      </h3>
                      <p className="text-sm text-[rgb(var(--text-300))]">
                        {therapist.roles.join(" • ")}
                      </p>
                    </div>
                    <span className="pill-accent text-xs">{therapist.rating}★</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {therapist.specialties.slice(0, 3).map((specialty) => (
                      <span key={specialty} className="pill-accent text-xs">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/therapists/${therapist.id}`}
                    className="btn-accent mt-5 inline-flex"
                  >
                    {therapistsSection.cardCtaLabel}
                  </Link>
                </div>
              ))}
            </div>
          ) : therapistsSection.emptyState ? (
            <div className="mt-8">
              <div className="card-nails p-6 text-center">
                <h3 className="text-xl font-semibold heading-accent">
                  {therapistsSection.emptyState.title}
                </h3>
                <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
                  {therapistsSection.emptyState.body}
                </p>
                {therapistsSection.emptyState.cta ? (
                  <Link
                    href={therapistsSection.emptyState.cta.href}
                    className="btn-accent-outline mt-5 inline-flex"
                  >
                    {therapistsSection.emptyState.cta.label}
                  </Link>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-glambox">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold heading-accent">
                {gallerySection.title}
              </h2>
              <p className="mt-3 text-[rgb(var(--text-300))]">
                {gallerySection.subtitle}
              </p>
            </div>
            <Link
              href={gallerySection.viewAllHref}
              className="btn-accent-outline"
            >
              {gallerySection.viewAllLabel}
            </Link>
          </div>
          {galleryTeasers.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {galleryTeasers.map((item) => (
                <div key={item.id} className="card-nails overflow-hidden">
                  <div className="image-frame relative h-56 w-full">
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
          ) : gallerySection.emptyState ? (
            <div className="mt-8">
              <div className="card-nails p-6 text-center">
                <h3 className="text-xl font-semibold heading-accent">
                  {gallerySection.emptyState.title}
                </h3>
                <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
                  {gallerySection.emptyState.body}
                </p>
                {gallerySection.emptyState.cta ? (
                  <Link
                    href={gallerySection.emptyState.cta.href}
                    className="btn-accent-outline mt-5 inline-flex"
                  >
                    {gallerySection.emptyState.cta.label}
                  </Link>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-glambox">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold heading-accent">
                {shopSection.title}
              </h2>
              <p className="mt-3 text-[rgb(var(--text-300))]">
                {shopSection.subtitle}
              </p>
            </div>
            <Link href={shopSection.viewAllHref} className="btn-accent-outline">
              {shopSection.viewAllLabel}
            </Link>
          </div>
          {shopTeasers.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {shopTeasers.map((product) => (
                <div
                  key={product.id}
                  className={`${isHairTheme ? "card-product-hair" : "card-nails"} card-hover p-6`}
                >
                  <div className="image-frame relative h-40 w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold heading-accent">
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
                    className="btn-accent mt-4 inline-flex"
                  >
                    {shopSection.cardCtaLabel}
                  </Link>
                </div>
              ))}
            </div>
          ) : shopSection.emptyState ? (
            <div className="mt-8">
              <div className="card-nails p-6 text-center">
                <h3 className="text-xl font-semibold heading-accent">
                  {shopSection.emptyState.title}
                </h3>
                <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
                  {shopSection.emptyState.body}
                </p>
                {shopSection.emptyState.cta ? (
                  <Link
                    href={shopSection.emptyState.cta.href}
                    className="btn-accent-outline mt-5 inline-flex"
                  >
                    {shopSection.emptyState.cta.label}
                  </Link>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {standardsSection?.items?.length ? (
        <section className="section-pad">
          <div className="container-glambox">
            <div>
              <h2 className="text-3xl font-semibold heading-accent">
                {standardsSection.title}
              </h2>
              <p className="mt-3 text-[rgb(var(--text-300))]">
                {standardsSection.subtitle}
              </p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {standardsSection.items.map((item) => (
                <div key={item.title} className="card-nails p-6">
                  <h3 className="text-lg font-semibold heading-accent">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-pad">
        <div className="container-glambox">
          <div className="card-nails p-8 text-center">
            <h2 className="text-3xl font-semibold heading-accent">
              {config.cta?.headline}
            </h2>
            <p className="mt-3 text-[rgb(var(--text-300))]">
              {config.cta?.body}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {config.cta?.primaryCta ? (
                <Link href={config.cta.primaryCta.href} className="btn-accent">
                  {config.cta.primaryCta.label}
                </Link>
              ) : null}
              {config.cta?.secondaryCta ? (
                <Link href={config.cta.secondaryCta.href} className="btn-accent-outline">
                  {config.cta.secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
