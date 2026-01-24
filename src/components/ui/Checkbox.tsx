"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function Checkbox({
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
    <div className={cn("flex items-start gap-3", className)}>
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-pressed={value}
        aria-label={typeof label === "string" ? label : "Toggle checkbox"}
        className={cn(
          "mt-0.5 grid h-6 w-6 place-items-center rounded-md",
          "border border-border bg-surface shadow-soft",
          "transition focus-visible:gb-focus",
          "hover:bg-surface-2",
          value && "bg-brand border-brand/60 shadow-glow",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {/* Always visible check area, but check only appears when on */}
        <span
          className={cn(
            "text-[12px] leading-none font-bold",
            value ? "text-brand-ink" : "text-transparent"
          )}
        >
          ✓
        </span>
      </button>

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

      {/* Hidden input for forms later */}
      <input id={id} type="checkbox" checked={value} readOnly className="hidden" />
    </div>
  );
}
