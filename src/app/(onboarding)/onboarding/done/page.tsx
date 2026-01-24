"use client";

import { useRouter } from "next/navigation";
import AuthShell from "@/components/ui-glambox/AuthShell";

export default function DonePage() {
  const router = useRouter();

  return (
    <AuthShell
      title="You’re in ✨"
      subtitle="We’ll use your preferences to tailor your Glambox experience."
    >
      <div className="space-y-4">
        <button
          type="button"
          className="btn-primary w-full"
          onClick={() => router.push("/dashboard")}
        >
          Go to dashboard
        </button>
        <button
          type="button"
          className="btn-secondary w-full"
          onClick={() => router.push("/services")}
        >
          Explore experiences
        </button>
      </div>
    </AuthShell>
  );
}
