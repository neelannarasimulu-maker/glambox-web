"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthShell from "@/components/ui-glambox/AuthShell";
import Toast from "@/components/ui-glambox/Toast";
import { getStore, setAuthState } from "@/lib/glambox-store";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storedEmail = getStore().auth.email;
  const email = useMemo(
    () => searchParams.get("email") ?? storedEmail,
    [searchParams, storedEmail],
  );
  const [toast, setToast] = useState("");

  const handleVerified = () => {
    setAuthState({ verified: true });
    router.push("/onboarding/profile");
  };

  return (
    <AuthShell
      title="Check your inbox"
      subtitle={`We sent a verification link to ${email || "your email"}.`}
    >
      <div className="space-y-6 text-center">
        <p className="text-sm text-white/70">
          Once you click the link, we’ll finish setting up your Glambox profile.
        </p>
        <button type="button" className="btn-primary w-full" onClick={handleVerified}>
          I’ve verified
        </button>
        <button
          type="button"
          className="btn-secondary w-full"
          onClick={() => setToast("Verification email resent.")}
        >
          Resend email
        </button>
      </div>
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </AuthShell>
  );
}
