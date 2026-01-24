"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/ui-glambox/AuthShell";
import Checkbox from "@/components/ui-glambox/Checkbox";
import Input from "@/components/ui-glambox/Input";
import MultiSelectChipGroup from "@/components/ui-glambox/MultiSelectChipGroup";
import Stepper from "@/components/ui-glambox/Stepper";
import ToggleChip from "@/components/ui-glambox/ToggleChip";
import { getStore, setQuestionnaire } from "@/lib/glambox-store";

const steps = [
  "Goals & Focus",
  "Wellness Basics",
  "Sensitivities",
  "Style Preferences",
  "Consent",
];

const goalsOptions = [
  "Hair refresh",
  "Protective styling",
  "Nails",
  "Skin glow",
  "Wellness reset",
  "Bridal/event",
  "Routine maintenance",
];

const visitFrequencyOptions = ["Monthly", "Quarterly", "Occasionally"];

const feelingsOptions = [
  "Relaxed",
  "Energised",
  "Confident",
  "Renewed",
  "Pampered",
];

const environmentOptions = [
  "Quiet",
  "Social",
  "Music",
  "Low-light",
  "Bright",
];

const sensitivitiesOptions = [
  "Fragrance sensitive",
  "Sensitive skin",
  "Scalp sensitivity",
  "Nail sensitivity",
  "Prefer gentle products",
  "Not sure",
];

const productPreferenceOptions = [
  "Unscented",
  "Natural",
  "Dermatologist-tested",
  "Salon-grade",
  "I’m flexible",
];

const hairStyleOptions = [
  "Natural",
  "Bold colour",
  "Sleek",
  "Curly definition",
  "Protective styles",
  "Minimal",
];

const nailStyleOptions = [
  "Nude",
  "French",
  "Bold colour",
  "Art",
  "Short & clean",
  "Long glam",
];

const skinStyleOptions = [
  "Hydrated",
  "Brightening",
  "Clear",
  "Even tone",
  "Glass-skin look",
];

export default function QuestionnairePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [goals, setGoals] = useState<string[]>([]);
  const [visitFrequency, setVisitFrequency] = useState("");
  const [feelings, setFeelings] = useState<string[]>([]);
  const [environment, setEnvironment] = useState<string[]>([]);
  const [sensitivities, setSensitivities] = useState<string[]>([]);
  const [productPref, setProductPref] = useState("");
  const [hairStyle, setHairStyle] = useState<string[]>([]);
  const [nailStyle, setNailStyle] = useState<string[]>([]);
  const [skinStyle, setSkinStyle] = useState<string[]>([]);
  const [inspoUrl, setInspoUrl] = useState("");
  const [consentPersonalisation, setConsentPersonalisation] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const store = getStore();
    setGoals(store.questionnaire.goals);
    setVisitFrequency(store.questionnaire.visitFrequency);
    setFeelings(store.questionnaire.feelings);
    setEnvironment(store.questionnaire.environment);
    setSensitivities(store.questionnaire.sensitivities);
    setProductPref(store.questionnaire.productPref);
    setHairStyle(store.questionnaire.style.hair);
    setNailStyle(store.questionnaire.style.nails);
    setSkinStyle(store.questionnaire.style.skin);
    setInspoUrl(store.questionnaire.inspoUrl);
    setConsentPersonalisation(store.questionnaire.consentPersonalisation);
    setConsentMarketing(store.questionnaire.consentMarketing);
  }, []);

  useEffect(() => {
    setQuestionnaire({
      goals,
      visitFrequency,
      feelings,
      environment,
      sensitivities,
      productPref,
      style: {
        hair: hairStyle,
        nails: nailStyle,
        skin: skinStyle,
      },
      inspoUrl,
      consentPersonalisation,
      consentMarketing,
    });
  }, [
    goals,
    visitFrequency,
    feelings,
    environment,
    sensitivities,
    productPref,
    hairStyle,
    nailStyle,
    skinStyle,
    inspoUrl,
    consentPersonalisation,
    consentMarketing,
  ]);

  const stepContent = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-medium text-white">
                What brings you to Glambox?
              </p>
              <MultiSelectChipGroup
                options={goalsOptions}
                values={goals}
                onChange={setGoals}
              />
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-white">
                How often do you plan to visit?
              </p>
              <div className="flex flex-wrap gap-2">
                {visitFrequencyOptions.map((option) => (
                  <ToggleChip
                    key={option}
                    label={option}
                    selected={visitFrequency === option}
                    onToggle={() => setVisitFrequency(option)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-medium text-white">
                How do you want to feel after your session?
              </p>
              <MultiSelectChipGroup
                options={feelingsOptions}
                values={feelings}
                onChange={setFeelings}
              />
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-white">
                Any preferences for your environment?
              </p>
              <MultiSelectChipGroup
                options={environmentOptions}
                values={environment}
                onChange={setEnvironment}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-medium text-white">
                Any sensitivities we should know about?
              </p>
              <MultiSelectChipGroup
                options={sensitivitiesOptions}
                values={sensitivities}
                onChange={setSensitivities}
              />
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-white">Product preference</p>
              <div className="flex flex-wrap gap-2">
                {productPreferenceOptions.map((option) => (
                  <ToggleChip
                    key={option}
                    label={option}
                    selected={productPref === option}
                    onToggle={() => setProductPref(option)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-medium text-white">Hair style vibe</p>
              <MultiSelectChipGroup
                options={hairStyleOptions}
                values={hairStyle}
                onChange={setHairStyle}
              />
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-white">Nails vibe</p>
              <MultiSelectChipGroup
                options={nailStyleOptions}
                values={nailStyle}
                onChange={setNailStyle}
              />
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-white">Skin vibe</p>
              <MultiSelectChipGroup
                options={skinStyleOptions}
                values={skinStyle}
                onChange={setSkinStyle}
              />
            </div>
            <Input
              label="Inspo link (optional)"
              placeholder="https://"
              value={inspoUrl}
              onChange={(event) => setInspoUrl(event.target.value)}
            />
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              We store your preferences to personalise recommendations and booking
              experiences. You can update these anytime.
            </div>
            <div className="space-y-4">
              <Checkbox
                checked={consentPersonalisation}
                onChange={(event) => setConsentPersonalisation(event.target.checked)}
                label="I consent to saving my preferences for personalisation."
              />
              <Checkbox
                checked={consentMarketing}
                onChange={(event) => setConsentMarketing(event.target.checked)}
                label="Send me updates about pop-ups and special drops."
              />
              {error ? <p className="text-xs text-rose-300">{error}</p> : null}
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [
    step,
    goals,
    visitFrequency,
    feelings,
    environment,
    sensitivities,
    productPref,
    hairStyle,
    nailStyle,
    skinStyle,
    inspoUrl,
    consentPersonalisation,
    consentMarketing,
    error,
  ]);

  const handleNext = () => {
    if (step === 5) {
      if (!consentPersonalisation) {
        setError("Consent is required to continue.");
        return;
      }
      setError("");
      router.push("/onboarding/review");
      return;
    }
    setError("");
    setStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    if (step === 1) {
      router.push("/onboarding/profile");
      return;
    }
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const primaryLabel = step === 5 ? "Finish" : "Continue";

  return (
    <AuthShell
      title="Tell us your preferences"
      subtitle="Short steps, tailored results. You can always edit later."
    >
      <div className="space-y-6">
        <Stepper steps={steps} currentStep={step} />
        {stepContent}
        <div className="flex flex-col gap-3">
          <button type="button" className="btn-primary w-full" onClick={handleNext}>
            {primaryLabel}
          </button>
          <button type="button" className="btn-secondary w-full" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    </AuthShell>
  );
}
