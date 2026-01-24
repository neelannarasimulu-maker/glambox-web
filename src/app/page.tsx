import Image from "next/image";
import Link from "next/link";

const trustCues = [
  "Premium professionals",
  "Carefully curated products",
  "Personalised experiences",
];

const pillars = [
  {
    title: "Beauty",
    description:
      "Hair, nails, skin, and finishing touches delivered by skilled professionals who understand modern style and timeless elegance.",
    image: "/services/hair-1.jpg",
  },
  {
    title: "Wellness",
    description:
      "Moments of pause, recovery, and renewal—because looking good starts with feeling good.",
    image: "/services/wellness-1.jpg",
  },
  {
    title: "Experiences",
    description:
      "Curated pop-ups, themed days, collaborations, and limited-edition moments that turn routine appointments into something memorable.",
    image: "/gallery/g-2.jpg",
  },
];

const inclusivityHighlights = [
  "Thoughtfully curated options",
  "Clear, honest experiences",
  "Beauty that fits real lives",
];

const signatureExperiences = [
  {
    title: "The Glow Edit",
    description:
      "A curated combination of services designed to work together for a complete look.",
    image: "/gallery/g-1.jpg",
  },
  {
    title: "Pop-Up Weekends",
    description:
      "Limited-time themes, guest artists, and trend-forward beauty moments.",
    image: "/gallery/g-3.jpg",
  },
  {
    title: "Bridal & Celebration",
    description:
      "Calm, confident preparation for life’s most photographed days.",
    image: "/services/nails-1.jpg",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[rgb(var(--bg-900))] text-[rgb(var(--text-200))]">


      <section className="hero-bg relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero/landing-hero.jpg"
            alt="Diverse women in a premium beauty lounge"
            fill
            priority
            className="object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="container-glambox section-pad relative">
          <div className="max-w-2xl">
            <span className="badge text-sm">Beauty • Wellness • Experiences</span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-6xl">
              <span className="block">Glow up, show up.</span>
              <span className="headline-gradient block">Self-care, styled as an experience.</span>
            </h1>
            <p className="mt-6 text-lg text-[rgb(var(--text-300))]">
              Glambox brings together premium beauty, wellness, and curated pop-up experiences—designed for modern women who value confidence, care, and a little magic in the everyday.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book" className="btn-primary">
                Book Your Moment
              </Link>
              <Link href="/experiences" className="btn-secondary">
                Explore the Glambox World
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {trustCues.map((item) => (
                <span key={item} className="chip text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider-soft" />

      <section id="about" className="section-pad">
        <div className="container-glambox grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="badge text-sm">The Glambox Promise</p>
            <h2 className="mt-5 text-3xl font-semibold text-white md:text-4xl">
              More than beauty. A feeling.
            </h2>
            <p className="mt-4 text-[rgb(var(--text-300))]">
              Glambox is where beauty meets intention. Every detail—space, service, and experience—is designed to help you feel confident, seen, and restored. From everyday self-care to special-occasion glow, Glambox adapts to your rhythm and your lifestyle.
            </p>
            <p className="mt-6 text-lg font-semibold text-white">
              Luxury that feels welcoming. Quality that feels worth it.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[28px]">
            <Image
              src="/services/hair-1.jpg"
              alt="Close-up moments of hair texture and glow"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[rgb(var(--bg-900))] via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section id="experiences" className="section-pad">
        <div className="container-glambox">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold text-white md:text-4xl">Pillars of Glambox</h2>
            <p className="text-[rgb(var(--text-300))]">
              Signature care across beauty, wellness, and curated moments that feel like events.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="card card-hover overflow-hidden">
                <div className="relative h-48">
                  <Image src={pillar.image} alt={pillar.title} fill className="object-cover" />
                </div>
                <div className="space-y-3 p-6">
                  <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
                  <p className="text-sm text-[rgb(var(--text-300))]">{pillar.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-glambox grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative overflow-hidden rounded-[28px]">
            <Image
              src="/gallery/g-1.jpg"
              alt="Diverse women enjoying premium beauty experiences"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[rgb(var(--bg-900))] via-transparent to-transparent" />
          </div>
          <div>
            <p className="badge text-sm">Designed for Every Woman</p>
            <h2 className="mt-5 text-3xl font-semibold text-white md:text-4xl">
              Premium without pretence.
            </h2>
            <p className="mt-4 text-[rgb(var(--text-300))]">
              Glambox is intentionally inclusive. Whether you visit often or occasionally, for essentials or indulgence, you’ll find the same attention to detail, respect, and care. This is modern luxury—flexible, welcoming, and never intimidating.
            </p>
            <ul className="mt-6 space-y-3 text-[rgb(var(--text-200))]">
              {inclusivityHighlights.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[rgb(var(--accent-teal))]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="signature-experiences">
        <div className="container-glambox">
          <div className="flex flex-col gap-3">
            <h2 id="signature-experiences" className="text-3xl font-semibold text-white md:text-4xl">
              Moments worth making time for.
            </h2>
            <p className="text-[rgb(var(--text-300))]">
              Signature experiences curated to deliver polished, memorable glow-ups.
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {signatureExperiences.map((item) => (
              <article key={item.title} className="card card-hover overflow-hidden">
                <div className="relative h-56">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="space-y-3 p-6">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-[rgb(var(--text-300))]">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/experiences" className="btn-primary">
              Discover Experiences
            </Link>
          </div>
        </div>
      </section>

      <section id="locations" className="section-pad">
        <div className="container-glambox">
          <div className="card overflow-hidden">
            <div className="relative">
              <div className="absolute inset-0">
                <Image
                  src="/services/wellness-1.jpg"
                  alt="Soft editorial background"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-[rgb(var(--bg-900))] via-[rgb(var(--bg-900))/0.7] to-transparent" />
              </div>
              <div className="relative p-10 md:p-14">
                <h2 className="text-3xl font-semibold text-white md:text-4xl">Your moment starts here.</h2>
                <p className="mt-4 max-w-2xl text-[rgb(var(--text-300))]">
                  Step into the Glambox world and choose how you want to feel today.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/book" className="btn-primary">
                    Book Now
                  </Link>
                  <Link href="/locations" className="btn-secondary">
                    Explore Locations &amp; Experiences
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
