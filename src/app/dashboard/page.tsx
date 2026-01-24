"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type AuthState = {
  isAuthed: boolean;
  provider: "email" | "google" | "facebook";
  email: string;
  verified: boolean;
};

type Profile = {
  fullName?: string;
  preferredName?: string;
  phone?: string;
  city?: string;
  comms?: {
    whatsapp: boolean;
    email: boolean;
    sms: boolean;
  };
};

type Questionnaire = {
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

type Flags = {
  onboardingComplete?: boolean;
};

const safeParse = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") {
    return fallback;
  }
  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }
  try {
    return { ...fallback, ...JSON.parse(raw) } as T;
  } catch {
    return fallback;
  }
};

const defaultAuth: AuthState = {
  isAuthed: false,
  provider: "email",
  email: "",
  verified: false,
};

const defaultProfile: Profile = {
  fullName: "",
  preferredName: "",
  phone: "",
  city: "",
  comms: {
    whatsapp: false,
    email: false,
    sms: false,
  },
};

const defaultQuestionnaire: Questionnaire = {
  goals: [],
  visitFrequency: "",
  feelings: [],
  environment: [],
  sensitivities: [],
  productPref: "",
  style: {
    hair: [],
    nails: [],
    skin: [],
  },
  inspoUrl: "",
  consentPersonalisation: false,
  consentMarketing: false,
};

const defaultFlags: Flags = {
  onboardingComplete: false,
};

export default function DashboardPage() {
  const [auth, setAuth] = useState(defaultAuth);
  const [profile, setProfile] = useState(defaultProfile);
  const [questionnaire, setQuestionnaire] = useState(defaultQuestionnaire);
  const [flags, setFlags] = useState(defaultFlags);

  useEffect(() => {
    setAuth(safeParse("glambox.auth", defaultAuth));
    setProfile(safeParse("glambox.profile", defaultProfile));
    setQuestionnaire(safeParse("glambox.questionnaire", defaultQuestionnaire));
    setFlags(safeParse("glambox.flags", defaultFlags));
  }, []);

  const displayName = useMemo(() => {
    return (
      profile.preferredName ||
      profile.fullName ||
      auth.email?.split("@")[0] ||
      "Glow friend"
    );
  }, [auth.email, profile.fullName, profile.preferredName]);

  const chips = useMemo(() => {
    const style = questionnaire.style ?? {};
    return [
      ...(questionnaire.goals ?? []),
      ...(questionnaire.feelings ?? []),
      ...(questionnaire.environment ?? []),
      ...(style.hair ?? []),
      ...(style.nails ?? []),
      ...(style.skin ?? []),
    ].slice(0, 10);
  }, [questionnaire]);

  const onboardingIncomplete =
    !flags.onboardingComplete || !questionnaire.consentPersonalisation;

  const profileCompleteness = useMemo(() => {
    const total = 4;
    let completed = 0;
    if (profile.fullName || profile.preferredName) completed += 1;
    if (profile.city) completed += 1;
    if (questionnaire.goals?.length) completed += 1;
    if (questionnaire.consentPersonalisation) completed += 1;
    return Math.round((completed / total) * 100);
  }, [profile, questionnaire]);

  return (
    <main className="hero-bg min-h-screen px-4 py-12">
      <div className="container-glambox space-y-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="badge w-fit">Glambox dashboard</p>
            <h1 className="headline-gradient mt-3 text-3xl font-semibold md:text-4xl">
              Welcome back, {displayName}
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Your glow journey is set. Let’s keep it personalised and effortless.
            </p>
          </div>
          <div className="glass flex flex-col gap-2 rounded-3xl px-5 py-4 text-sm text-white/70">
            <span>Profile completeness</span>
            <div className="h-2 w-40 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-300"
                style={{ width: `${profileCompleteness}%` }}
              />
            </div>
            <span className="text-xs">{profileCompleteness}% complete</span>
          </div>
        </header>

        {onboardingIncomplete ? (
          <div className="card flex flex-col gap-4 border border-pink-400/30 bg-white/5 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Finish setup for the best recommendations
              </h2>
              <p className="mt-2 text-sm text-white/70">
                Complete your preferences to unlock personalised booking and vibe
                matching.
              </p>
            </div>
            <Link className="btn-primary w-full text-center md:w-auto" href="/onboarding/profile">
              Complete setup
            </Link>
          </div>
        ) : null}

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="card card-hover p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Your preferences</h2>
                <div className="flex gap-2 text-sm">
                  <Link className="btn-secondary px-4 py-2" href="/onboarding/profile">
                    Edit profile
                  </Link>
                  <Link
                    className="btn-secondary px-4 py-2"
                    href="/onboarding/questionnaire"
                  >
                    Edit questionnaire
                  </Link>
                </div>
              </div>
              <p className="mt-2 text-sm text-white/60">
                {questionnaire.visitFrequency
                  ? `Visit frequency: ${questionnaire.visitFrequency}.`
                  : "Tell us how often you'd like to visit for tailored reminders."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {chips.length ? (
                  chips.map((chip) => (
                    <span key={chip} className="chip text-xs">
                      {chip}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-white/50">
                    Add preferences to see personalised chips here.
                  </span>
                )}
              </div>
            </div>

            <div className="card card-hover p-6">
              <h2 className="text-lg font-semibold text-white">Quick actions</h2>
              <p className="mt-2 text-sm text-white/60">
                Jump into what matters most right now.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Link className="btn-primary text-center" href="/book">
                  Book
                </Link>
                <Link className="btn-secondary text-center" href="/services">
                  Explore experiences
                </Link>
                <Link className="btn-secondary text-center" href="/ui">
                  Explore microsites
                </Link>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="glass p-5">
                <h3 className="text-base font-semibold text-white">Your vibe today</h3>
                <p className="mt-2 text-sm text-white/70">
                  {questionnaire.feelings?.length
                    ? `You’re leaning toward ${questionnaire.feelings
                        ?.slice(0, 2)
                        .join(" & ")} energy.`
                    : "Select how you want to feel, and we’ll tune the vibe."}
                </p>
                <p className="mt-3 text-xs text-white/50">
                  Preferred environment:{" "}
                  {questionnaire.environment?.length
                    ? questionnaire.environment?.slice(0, 2).join(", ")
                    : "Not set yet"}
                </p>
              </div>
              <div className="glass p-5">
                <h3 className="text-base font-semibold text-white">
                  Recommended next steps
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li>• Book a refresh session this month.</li>
                  <li>• Explore curated glow bundles.</li>
                  <li>• Save an inspo link for your stylist.</li>
                </ul>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-white">Personalisation</h2>
              <div className="mt-4 space-y-3 text-sm text-white/70">
                <p>
                  City: <span className="text-white">{profile.city || "—"}</span>
                </p>
                <p>
                  Contact:{" "}
                  <span className="text-white">
                    {profile.phone || auth.email || "—"}
                  </span>
                </p>
                <p>
                  Consent:{" "}
                  <span className="text-white">
                    {questionnaire.consentPersonalisation ? "Yes" : "Pending"}
                  </span>
                </p>
              </div>
            </div>

            <div className="card card-hover p-6">
              <h2 className="text-lg font-semibold text-white">Upcoming pop-up</h2>
              <p className="mt-2 text-sm text-white/70">
                Shoreditch Glow Lab — 28 Oct · Limited slots
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                <span className="badge">Hair · Nails · Skin</span>
                <Link className="text-white hover:text-white/80" href="/services">
                  View details →
                </Link>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
