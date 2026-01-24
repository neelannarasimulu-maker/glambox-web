import Image from "next/image";
import Link from "next/link";
import {
  formatZar,
  getHairServiceById,
  getHairTherapists,
  pricingNote,
  viewDetailsLabel,
  viewProfileLabel,
} from "@/lib/content/hair";

const signatureServiceIds = [
  "wash-blow-dry",
  "wash-cut-blow",
  "silk-press",
  "root-tint",
  "balayage",
  "full-house-weave",
];

const signatureServices = signatureServiceIds
  .map((id) => getHairServiceById(id))
  .filter((service): service is NonNullable<typeof service> => Boolean(service));

const featuredTherapists = getHairTherapists().slice(0, 5);

export default function HairHomePage() {
  return (
    <main className="min-h-screen">
      <section className="hero-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--hero-bg)]" />
        <div className="container-glambox section-pad relative">
          <div className="max-w-2xl">
            <span className="badge text-sm">Hair Studio</span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-6xl">
              Hair Studio
            </h1>
            <p className="mt-5 text-lg text-[rgb(var(--text-300))]">
              Premium, inclusive hair care for every texture and every rhythm. Book
              a therapist you love or let us recommend the perfect match.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book/hair" className="btn-primary">
                Book Hair
              </Link>
              <Link href="/explore/hair/services" className="btn-secondary">
                Browse Services
              </Link>
            </div>
            <p className="mt-6 text-sm text-[rgb(var(--text-400))]">
              {pricingNote}
            </p>
          </div>
        </div>
      </section>

      <div className="divider-soft" />

      <section className="section-pad">
        <div className="container-glambox">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="badge text-xs">Signature Services</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                Tailored outcomes, beautifully priced.
              </h2>
            </div>
            <Link href="/explore/hair/services" className="btn-secondary">
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {signatureServices.map((service) => (
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
                  href={`/explore/hair/services/${service.id}`}
                  className="btn-primary mt-6 inline-flex"
                >
                  {viewDetailsLabel}
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
              <p className="badge text-xs">Meet the Hair Artists</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                Therapists with warmth, skill, and range.
              </h2>
            </div>
            <Link href="/explore/hair/therapists" className="btn-secondary">
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
                      {therapist.role}
                    </p>
                  </div>
                  <span className="badge text-xs">{therapist.priceTier}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {therapist.specialties.slice(0, 3).map((specialty) => (
                    <span key={specialty} className="chip text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-sm text-[rgb(var(--text-300))]">
                  Next available: {therapist.nextAvailable}
                </div>
                <Link
                  href={`/explore/hair/therapists/${therapist.id}`}
                  className="btn-primary mt-5 inline-flex"
                >
                  {viewProfileLabel}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-glambox grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="badge text-xs">Premium without pretence</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              Inclusive, thoughtful, and affordable at every tier.
            </h2>
            <p className="mt-4 text-[rgb(var(--text-300))]">
              Our Essential, Signature, and Luxe tiers give you options without
              compromising on care. Every appointment begins with consultation and
              ends with styling guidance you can take home.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-white">
              What you can expect
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[rgb(var(--text-300))]">
              <li>• Warm consultations that honour your texture and goals.</li>
              <li>• Professional-grade, gentle products chosen for you.</li>
              <li>• Transparent pricing with “from” ranges across locations.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="results" className="section-pad">
        <div className="container-glambox">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="badge text-xs">Results</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                Hair that looks as good as it feels.
              </h2>
            </div>
            <Link href="/gallery" className="btn-secondary">
              View gallery
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {["/gallery/g-1.jpg", "/gallery/g-2.jpg", "/gallery/g-3.jpg"].map(
              (image) => (
                <div key={image} className="relative h-64 overflow-hidden rounded-3xl">
                  <Image src={image} alt="Hair result" fill className="object-cover" />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section id="standards" className="section-pad">
        <div className="container-glambox grid gap-8 lg:grid-cols-3">
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-white">Hygiene first</h3>
            <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
              Tools sanitised between every guest, with a clean, calm environment.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-white">Consult-led care</h3>
            <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
              We listen first, then recommend the best service and therapist for you.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-white">Product quality</h3>
            <p className="mt-3 text-sm text-[rgb(var(--text-300))]">
              We use professional, inclusive formulas with gentle options available.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
