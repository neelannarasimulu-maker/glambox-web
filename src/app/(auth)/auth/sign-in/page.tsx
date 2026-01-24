"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthShell from "@/components/ui-glambox/AuthShell";
import Input from "@/components/ui-glambox/Input";
import PasswordInput from "@/components/ui-glambox/PasswordInput";
import { getPostAuthRoute, setAuthState } from "@/lib/glambox-store";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = useMemo(
    () => searchParams.get("email") ?? "",
    [searchParams],
  );
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = () => {
    const nextErrors: { email?: string; password?: string } = {};
    if (!emailRegex.test(email)) {
      nextErrors.email = "Enter a valid email.";
    }
    if (password.trim().length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const store = setAuthState({
      isAuthed: true,
      provider: "email",
      email,
      verified: true,
    });
    router.push(getPostAuthRoute(store));
  };

  return (
    <AuthShell
      title="Sign in"
      subtitle="Welcome back. Let’s get you glowing again."
    >
      <div className="space-y-6">
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
        <button type="button" className="btn-primary w-full" onClick={handleSubmit}>
          Sign in
        </button>
        <button
          type="button"
          className="btn-secondary w-full"
          onClick={() => router.push("/auth")}
        >
          Back
        </button>
        <div className="flex items-center justify-between text-sm text-white/70">
          <button
            type="button"
            className="hover:text-white"
            onClick={() => router.push("/auth/forgot")}
          >
            Forgot password?
          </button>
          <button
            type="button"
            className="hover:text-white"
            onClick={() => router.push("/auth/sign-up")}
          >
            Create an account
          </button>
        </div>
      </div>
    </AuthShell>
  );
}
