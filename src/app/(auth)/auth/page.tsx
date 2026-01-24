"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/ui-glambox/AuthShell";
import Input from "@/components/ui-glambox/Input";
import Toast from "@/components/ui-glambox/Toast";
import { getPostAuthRoute, setAuthState } from "@/lib/glambox-store";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthEntryPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const handleContinue = () => {
    if (!emailRegex.test(email)) {
      setError("Enter a valid email to continue.");
      return;
    }
    setError("");
    router.push(`/auth/sign-in?email=${encodeURIComponent(email)}`);
  };

  const handleSocial = (provider: "google" | "facebook") => {
    const store = setAuthState({
      isAuthed: true,
      provider,
      email: `${provider}@glambox.social`,
      verified: true,
    });
    router.push(getPostAuthRoute(store));
    setToast(`Signed in with ${provider}.`);
  };

  return (
    <AuthShell
      title="Welcome back to Glambox"
      subtitle="Sign in to book, save your preferences, and personalise your glow."
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <button
            type="button"
            className="btn-primary w-full"
            onClick={() => handleSocial("google")}
          >
            Continue with Google
          </button>
          <button
            type="button"
            className="btn-secondary w-full"
            onClick={() => handleSocial("facebook")}
          >
            Continue with Facebook
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="divider-soft" />
          <span className="text-xs uppercase tracking-[0.3em] text-white/40">
            or
          </span>
          <div className="divider-soft" />
        </div>

        <Input
          label="Email address"
          placeholder="you@glambox.com"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={error}
        />
        <button type="button" className="btn-primary w-full" onClick={handleContinue}>
          Continue with email
        </button>

        <div className="flex flex-col items-center gap-3 text-sm text-white/70">
          <button
            type="button"
            className="text-white hover:text-white/90"
            onClick={() => router.push("/auth/sign-up")}
          >
            Create an account
          </button>
          <button
            type="button"
            className="text-white/70 hover:text-white"
            onClick={() => router.push("/auth/forgot")}
          >
            Forgot password?
          </button>
        </div>
      </div>
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </AuthShell>
  );
}
