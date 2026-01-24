"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/ui-glambox/AuthShell";
import Input from "@/components/ui-glambox/Input";
import ToggleChip from "@/components/ui-glambox/ToggleChip";
import { getStore, setProfile } from "@/lib/glambox-store";

const ageRanges = [
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  "55+",
  "Prefer not to say",
];

export default function ProfileOnboardingPage() {
  const router = useRouter();
  const [preferredName, setPreferredName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [comms, setComms] = useState({
    whatsapp: false,
    email: true,
    sms: false,
  });

  useEffect(() => {
    const store = getStore();
    setPreferredName(store.profile.preferredName);
    setPhone(store.profile.phone);
    setCity(store.profile.city);
    setAgeRange(store.profile.ageRange);
    setComms(store.profile.comms);
  }, []);

  const persistProfile = () => {
    setProfile({
      preferredName,
      phone,
      city,
      ageRange,
      comms,
      createdAt: new Date().toISOString(),
    });
  };

  const handleContinue = () => {
    persistProfile();
    router.push("/onboarding/questionnaire");
  };

  const handleSkip = () => {
    persistProfile();
    router.push("/onboarding/questionnaire");
  };

  return (
    <AuthShell
      title="Let’s personalise your Glambox"
      subtitle="A few details help us tailor your experience."
    >
      <div className="space-y-6">
        <Input
          label="Preferred name (optional)"
          value={preferredName}
          onChange={(event) => setPreferredName(event.target.value)}
        />
        <Input
          label="Mobile number (optional)"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <Input
          label="City / area"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          helperText="Helps us recommend the closest pop-ups."
        />
        <div className="space-y-3">
          <p className="text-sm font-medium text-white">Age range</p>
          <div className="flex flex-wrap gap-2">
            {ageRanges.map((range) => (
              <ToggleChip
                key={range}
                label={range}
                selected={ageRange === range}
                onToggle={() => setAgeRange(range)}
              />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-medium text-white">Communication preferences</p>
          <div className="flex flex-wrap gap-2">
            <ToggleChip
              label="WhatsApp"
              selected={comms.whatsapp}
              onToggle={() =>
                setComms((prev) => ({ ...prev, whatsapp: !prev.whatsapp }))
              }
            />
            <ToggleChip
              label="Email"
              selected={comms.email}
              onToggle={() => setComms((prev) => ({ ...prev, email: !prev.email }))}
            />
            <ToggleChip
              label="SMS"
              selected={comms.sms}
              onToggle={() => setComms((prev) => ({ ...prev, sms: !prev.sms }))}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button type="button" className="btn-primary w-full" onClick={handleContinue}>
            Continue
          </button>
          <button type="button" className="btn-secondary w-full" onClick={handleSkip}>
            Skip for now
          </button>
        </div>
      </div>
    </AuthShell>
  );
}
