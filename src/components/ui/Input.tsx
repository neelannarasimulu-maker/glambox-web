import * as React from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "success" | "error";

function toneClasses(tone: Tone) {
  if (tone === "success") return "border-emerald-300/60 focus:border-emerald-400";
  if (tone === "error") return "border-rose-300/70 focus:border-rose-400";
  return "border-border";
}

export function Input({
  className,
  label,
  hint,
  error,
  leftSlot,
  rightSlot,
  tone = error ? "error" : "default",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  tone?: Tone;
}) {
  const describedBy = error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label htmlFor={props.id} className="mb-1.5 block text-sm font-medium text-text">
          {label}
        </label>
      )}

      <div
        className={cn(
          "gb-glass flex items-center gap-2 rounded-2xl border px-3 py-2 shadow-soft transition",
          toneClasses(tone),
          "focus-within:shadow-glow"
        )}
      >
        {leftSlot && <span className="text-muted">{leftSlot}</span>}

        <input
          className={cn(
            "w-full bg-transparent text-sm text-text placeholder:text-muted/70",
            "outline-none"
          )}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        />

        {rightSlot && <span className="text-muted">{rightSlot}</span>}
      </div>

      {error ? (
        <p id={`${props.id}-error`} className="mt-2 text-sm text-rose-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${props.id}-hint`} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
