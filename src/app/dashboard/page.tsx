'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type AuthState = {
  isAuthed?: boolean;
  provider?: 'email' | 'google' | 'facebook';
  email?: string;
  verified?: boolean;
};

type ProfileState = {
  fullName?: string;
  preferredName?: string;
  phone?: string;
  city?: string;
  comms?: {
    whatsapp?: boolean;
    email?: boolean;
    sms?: boolean;
  };
};

type QuestionnaireState = {
  goals?: string[];
  visitFrequency?: string;
  feelings?: string[];
  environment?: string[];
  sensitivities?: string[];
  productPref?: string;
  style?: {
    hair?: string[];
    nails?: string[];
    skin?: string[];
  };
  inspoUrl?: string;
  consentPersonalisation?: boolean;
  consentMarketing?: boolean;
};

type FlagsState = {
  onboardingComplete?: boolean;
};

const readStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') {
    return fallback;
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch (error) {
    return fallback;
  }
};

export default function DashboardPage() {
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [profile, setProfile] = useState<ProfileState | null>(null);
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireState | null>(null);
  const [flags, setFlags] = useState<FlagsState | null>(null);

  useEffect(() => {
    setAuth(readStorage<AuthState>('glambox.auth', {}));
    setProfile(readStorage<ProfileState>('glambox.profile', {}));
    setQuestionnaire(readStorage<QuestionnaireState>('glambox.questionnaire', {}));
    setFlags(readStorage<FlagsState>('glambox.flags', {}));
  }, []);

  const displayName =
    profile?.preferredName ||
    profile?.fullName ||
    auth?.email?.split('@')[0] ||
    'Glow Seeker';

  const preferenceChips = useMemo(() => {
    const chips: string[] = [];
    if (questionnaire?.goals?.length) {
      chips.push(...questionnaire.goals);
    }
    if (questionnaire?.feelings?.length) {
      chips.push(...questionnaire.feelings);
    }
    if (questionnaire?.environment?.length) {
      chips.push(...questionnaire.environment);
    }
    if (questionnaire?.sensitivities?.length) {
      chips.push(...questionnaire.sensitivities.map((item) => `Sensitive to ${item}`));
    }
    if (questionnaire?.productPref) {
      chips.push(questionnaire.productPref);
    }
    if (questionnaire?.style?.hair?.length) {
      chips.push(...questionnaire.style.hair.map((item) => `Hair: ${item}`));
    }
    if (questionnaire?.style?.nails?.length) {
      chips.push(...questionnaire.style.nails.map((item) => `Nails: ${item}`));
    }
    if (questionnaire?.style?.skin?.length) {
      chips.push(...questionnaire.style.skin.map((item) => `Skin: ${item}`));
    }
    return chips.slice(0, 12);
  }, [questionnaire]);

  const completion = useMemo(() => {
    const checks = [
      profile?.preferredName || profile?.fullName,
      profile?.phone,
      profile?.city,
      questionnaire?.goals?.length,
      questionnaire?.visitFrequency,
      questionnaire?.feelings?.length,
      questionnaire?.style?.hair?.length || questionnaire?.style?.nails?.length || questionnaire?.style?.skin?.length,
      questionnaire?.consentPersonalisation,
    ];
    const total = checks.length;
    const filled = checks.filter(Boolean).length;
    return {
      total,
      filled,
      percent: Math.round((filled / total) * 100),
    };
  }, [profile, questionnaire]);

  const showFinishSetup =
    flags?.onboardingComplete === false || questionnaire?.consentPersonalisation !== true;

  const vibeToday =
    questionnaire?.feelings?.[0] || questionnaire?.environment?.[0] || 'Elevated & calm';

  return (
    <main className="hero-bg min-h-screen">
      <section className="section-pad">
        <div className="container-glambox space-y-10">
          {showFinishSetup && (
            <div className="glass flex flex-col gap-4 border border-white/10 p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-white/60">
                  Finish your Glambox ritual
                </p>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  Unlock personalised recommendations by completing setup.
                </h2>
              </div>
              <Link href="/onboarding/profile" className="btn-primary text-sm">
                Finish setup
              </Link>
            </div>
          )}

          <div className="glass p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Welcome back</p>
                <h1 className="headline-gradient mt-3 text-3xl font-semibold md:text-4xl">
                  {displayName}
                </h1>
                <p className="mt-3 max-w-xl text-sm text-white/70">
                  Your Glambox dashboard curates your next beauty ritual, based on your vibe and
                  preferences.
                </p>
              </div>
              <div className="card flex flex-col gap-3 p-6">
                <span className="badge">Profile completeness</span>
                <div>
                  <p className="text-3xl font-semibold text-white">
                    {Number.isNaN(completion.percent) ? 0 : completion.percent}%
                  </p>
                  <p className="text-xs text-white/60">
                    {completion.filled}/{completion.total} steps complete
                  </p>
                </div>
                {completion.percent < 100 && (
                  <Link href="/onboarding/profile" className="btn-secondary text-sm">
                    Complete setup
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="card card-hover p-6 md:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Preferences snapshot</h2>
                <Link href="/onboarding/questionnaire" className="text-sm text-white/60 hover:text-white">
                  Edit questionnaire
                </Link>
              </div>
              <div className="divider-soft my-6" />
              <div className="flex flex-wrap gap-3">
                {preferenceChips.length ? (
                  preferenceChips.map((chip, index) => (
                    <span key={`${chip}-${index}`} className="chip text-sm">
                      {chip}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-white/60">
                    Share your preferences to unlock personalised experiences.
                  </p>
                )}
              </div>
            </div>

            <div className="card card-hover p-6 md:p-8">
              <h2 className="text-xl font-semibold text-white">Quick actions</h2>
              <div className="divider-soft my-6" />
              <div className="grid gap-4">
                {[
                  {
                    title: 'Book your next ritual',
                    description: 'Reserve a Glambox appointment in seconds.',
                    href: '/booking',
                  },
                  {
                    title: 'Explore experiences',
                    description: 'Curated pop-ups crafted for your mood.',
                    href: '/experiences',
                  },
                  {
                    title: 'Discover microsites',
                    description: 'Dive into limited-edition beauty moments.',
                    href: '/microsites',
                  },
                ].map((action) => (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="glass flex flex-col gap-2 rounded-2xl border border-white/10 p-4 transition hover:border-white/30"
                  >
                    <p className="text-sm uppercase tracking-[0.22em] text-white/50">{action.title}</p>
                    <p className="text-sm text-white/80">{action.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="card card-hover p-6 md:p-8">
              <h2 className="text-xl font-semibold text-white">Personalisation</h2>
              <div className="divider-soft my-6" />
              <div className="space-y-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-white/50">Your vibe today</p>
                  <p className="mt-2 text-lg font-semibold text-white">{vibeToday}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-white/50">
                    Recommended next steps
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-white/80">
                    {questionnaire?.consentPersonalisation ? (
                      <>
                        <li>✨ Book a matching ritual that fits your {vibeToday.toLowerCase()} mood.</li>
                        <li>✨ Explore pop-ups tailored to your preferred environment.</li>
                        <li>✨ Save your signature look to speed up future bookings.</li>
                      </>
                    ) : (
                      <>
                        <li>Enable personalisation to unlock curated recommendations.</li>
                        <li>Complete your questionnaire for a more tailored dashboard.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/onboarding/profile" className="btn-secondary text-sm">
                  Edit profile
                </Link>
                <Link href="/onboarding/questionnaire" className="btn-primary text-sm">
                  Update questionnaire
                </Link>
              </div>
            </div>

            <div className="card card-hover p-6 md:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Upcoming pop-ups</h2>
                <span className="badge text-xs">VIP teasers</span>
              </div>
              <div className="divider-soft my-6" />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: 'Midnight Gloss Lab',
                    location: 'Soho · 12 Oct',
                    detail: 'After-hours shine treatments + luxe gifts.',
                  },
                  {
                    title: 'Sculpt & Glow Lounge',
                    location: 'Notting Hill · 20 Oct',
                    detail: 'Facial sculpting meets aura lighting.',
                  },
                  {
                    title: 'Velvet Nail Atelier',
                    location: 'Chelsea · 28 Oct',
                    detail: 'Custom chrome sets + signature cocktails.',
                  },
                  {
                    title: 'The Skin Reset',
                    location: 'Canary Wharf · 2 Nov',
                    detail: 'Barrier-boosting rituals + glow consults.',
                  },
                ].map((card) => (
                  <div key={card.title} className="glass rounded-2xl border border-white/10 p-4">
                    <p className="text-sm font-semibold text-white">{card.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50">
                      {card.location}
                    </p>
                    <p className="mt-3 text-sm text-white/70">{card.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
