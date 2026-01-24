import * as React from "react";
import { cn } from "@/lib/cn";

export function Select({
  className,
  label,
  hint,
  error,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
  error?: string;
}) {
  const describedBy = error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label htmlFor={props.id} className="mb-1.5 block text-sm font-medium text-text">
          {label}
        </label>
      )}

      <div className="gb-glass rounded-2xl border border-border px-3 py-2 shadow-soft focus-within:shadow-glow">
        <select
          className={cn(
            "w-full bg-transparent text-sm text-text outline-none",
            "appearance-none"
          )}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        >
          {children}
        </select>

        {/* Down chevron */}
        <div className="pointer-events-none -mt-6 flex justify-end pr-1 text-muted">
          <span aria-hidden>▾</span>
        </div>
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
