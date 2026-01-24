"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function Switch({
  id,
  label,
  hint,
  className,
  defaultChecked = false,
  checked,
  onChange,
  disabled,
}: {
  id: string;
  label?: React.ReactNode;
  hint?: string;
  className?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}) {
  const isControlled = typeof checked === "boolean";
  const [internal, setInternal] = React.useState(defaultChecked);
  const value = isControlled ? checked : internal;

  function toggle() {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="flex flex-col">
        {label && (
          <button
            type="button"
            onClick={toggle}
            disabled={disabled}
            className={cn(
              "text-left text-sm font-medium text-text",
              "disabled:opacity-50"
            )}
          >
            {label}
          </button>
        )}
        {hint && <span className="text-sm text-muted">{hint}</span>}
      </div>

      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-pressed={value}
        aria-label={typeof label === "string" ? label : "Toggle switch"}
        className={cn(
          "relative mt-0.5 h-7 w-12 rounded-full",
          "border border-border bg-surface shadow-soft",
          "transition focus-visible:gb-focus",
          "hover:bg-surface-2",
          value && "bg-brand border-brand/60 shadow-glow",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {/* subtle sparkle highlight when ON */}
        {value && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(14px 10px at 25% 30%, rgba(255,255,255,0.45), transparent 60%)",
              opacity: 0.7,
            }}
          />
        )}

        {/* Thumb */}
        <span
          className={cn(
            "absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-soft",
            "transition-transform duration-200",
            value && "translate-x-5"
          )}
        />
      </button>

      <input id={id} type="checkbox" checked={value} readOnly className="hidden" />
    </div>
  );
}
