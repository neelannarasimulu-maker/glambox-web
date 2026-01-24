"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/ui-glambox/AuthShell";
import Checkbox from "@/components/ui-glambox/Checkbox";
import Input from "@/components/ui-glambox/Input";
import PasswordInput from "@/components/ui-glambox/PasswordInput";
import { setAuthState, setProfile } from "@/lib/glambox-store";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = () => {
    const nextErrors: { [key: string]: string } = {};
    if (fullName.trim().length < 2) {
      nextErrors.fullName = "Tell us your name.";
    }
    if (!emailRegex.test(email)) {
      nextErrors.email = "Enter a valid email.";
    }
    if (password.trim().length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }
    if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }
    if (!agreed) {
      nextErrors.agreed = "You must agree to continue.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setAuthState({
      isAuthed: true,
      provider: "email",
      email,
      verified: false,
    });
    setProfile({
      fullName,
      createdAt: new Date().toISOString(),
    });
    router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join Glambox for personalised booking and glow-ready rituals."
    >
      <div className="space-y-5">
        <Input
          label="Full name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          error={errors.fullName}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
        />
        <PasswordInput
          label="Confirm password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={errors.confirmPassword}
        />
        <div className="space-y-2">
          <Checkbox
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            label="I agree to the Terms & Privacy."
          />
          {errors.agreed ? (
            <p className="text-xs text-rose-300">{errors.agreed}</p>
          ) : null}
        </div>
        <button type="button" className="btn-primary w-full" onClick={handleSubmit}>
          Create account
        </button>
        <button
          type="button"
          className="btn-secondary w-full"
          onClick={() => router.push("/auth")}
        >
          Back
        </button>
      </div>
    </AuthShell>
  );
}
