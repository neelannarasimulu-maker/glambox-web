"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type TabItem = {
  value: string;
  label: React.ReactNode;
  badge?: React.ReactNode;
};

export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
}: {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}) {
  const isControlled = typeof value === "string";
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.value ?? "");
  const active = isControlled ? (value as string) : internal;

  function setActive(v: string) {
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
  }

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "gb-glass inline-flex w-full flex-wrap items-center gap-1 rounded-2xl border border-border p-1 shadow-soft",
          "supports-[backdrop-filter]:bg-surface/70"
        )}
        role="tablist"
        aria-label="Tabs"
      >
        {items.map((t) => {
          const isActive = t.value === active;
          return (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.value)}
              className={cn(
                "relative inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition",
                "focus-visible:gb-focus",
                isActive
                  ? "bg-brand text-brand-ink shadow-glow"
                  : "text-muted hover:bg-surface-2 hover:text-text"
              )}
            >
              <span>{t.label}</span>
              {t.badge ? (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px]",
                    isActive ? "bg-white/20 text-brand-ink" : "bg-surface text-muted border border-border"
                  )}
                >
                  {t.badge}
                </span>
              ) : null}

              {/* tiny quirky underline sparkle */}
              {isActive ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-1 left-3 right-3 h-[2px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.85), rgba(255,255,255,0))",
                    opacity: 0.65,
                  }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Content slotting handled by parent; Tabs controls active state */}
    </div>
  );
}