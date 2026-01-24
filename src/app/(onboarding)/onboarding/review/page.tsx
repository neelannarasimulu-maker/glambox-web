"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/ui-glambox/AuthShell";
import { getStore, isOnboardingComplete, setFlags } from "@/lib/glambox-store";

export default function ReviewPage() {
  const router = useRouter();
  const [storeSnapshot, setStoreSnapshot] = useState(getStore());

  useEffect(() => {
    setStoreSnapshot(getStore());
  }, []);

  const { profile, questionnaire } = storeSnapshot;

  const handleComplete = () => {
    const completed = isOnboardingComplete(storeSnapshot);
    setFlags({ onboardingComplete: completed });
    router.push("/onboarding/done");
  };

  return (
    <AuthShell
      title="Review & confirm"
      subtitle="Make sure everything looks right before we personalise your experience."
    >
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-sm font-semibold text-white">Profile basics</h2>
          <div className="mt-3 space-y-2 text-sm text-white/70">
            <p>Preferred name: {profile.preferredName || "—"}</p>
            <p>Mobile: {profile.phone || "—"}</p>
            <p>City: {profile.city || "—"}</p>
            <p>Age range: {profile.ageRange || "—"}</p>
            <p>
              Comms: {[
                profile.comms.whatsapp && "WhatsApp",
                profile.comms.email && "Email",
                profile.comms.sms && "SMS",
              ]
                .filter(Boolean)
                .join(", ") || "—"}
            </p>
          </div>
          <button
            type="button"
            className="btn-secondary mt-4 w-full"
            onClick={() => router.push("/onboarding/profile")}
          >
            Edit profile
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-sm font-semibold text-white">Questionnaire</h2>
          <div className="mt-3 space-y-2 text-sm text-white/70">
            <p>Goals: {questionnaire.goals.join(", ") || "—"}</p>
            <p>Visit frequency: {questionnaire.visitFrequency || "—"}</p>
            <p>Feelings: {questionnaire.feelings.join(", ") || "—"}</p>
            <p>Environment: {questionnaire.environment.join(", ") || "—"}</p>
            <p>Sensitivities: {questionnaire.sensitivities.join(", ") || "—"}</p>
            <p>Product preference: {questionnaire.productPref || "—"}</p>
            <p>Hair vibe: {questionnaire.style.hair.join(", ") || "—"}</p>
            <p>Nails vibe: {questionnaire.style.nails.join(", ") || "—"}</p>
            <p>Skin vibe: {questionnaire.style.skin.join(", ") || "—"}</p>
            <p>Inspo link: {questionnaire.inspoUrl || "—"}</p>
            <p>
              Consent: {questionnaire.consentPersonalisation ? "Yes" : "Pending"}
            </p>
          </div>
          <button
            type="button"
            className="btn-secondary mt-4 w-full"
            onClick={() => router.push("/onboarding/questionnaire")}
          >
            Edit questionnaire
          </button>
        </div>

        <button type="button" className="btn-primary w-full" onClick={handleComplete}>
          Complete setup
        </button>
      </div>
    </AuthShell>
  );
}
