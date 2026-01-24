"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/ui-glambox/AuthShell";
import Input from "@/components/ui-glambox/Input";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!emailRegex.test(email)) {
      setError("Enter a valid email.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <AuthShell
      title="Forgot your password?"
      subtitle="We’ll send a reset link so you can return to your glow plan."
    >
      <div className="space-y-6">
        {submitted ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
            Reset link sent to <span className="text-white">{email}</span>. Please
            check your inbox.
          </div>
        ) : (
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={error}
          />
        )}
        {submitted ? (
          <button
            type="button"
            className="btn-primary w-full"
            onClick={() => router.push("/auth/sign-in")}
          >
            Back to sign in
          </button>
        ) : (
          <button type="button" className="btn-primary w-full" onClick={handleSubmit}>
            Send reset link
          </button>
        )}
        <button
          type="button"
          className="btn-secondary w-full"
          onClick={() => router.push("/auth/sign-in")}
        >
          Back to sign in
        </button>
      </div>
    </AuthShell>
  );
}
