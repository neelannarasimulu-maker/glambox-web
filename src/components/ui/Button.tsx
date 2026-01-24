import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition " +
    "disabled:opacity-50 disabled:pointer-events-none " +
    "focus-visible:gb-focus";

  const variants: Record<Variant, string> = {
    primary:
      "text-brand-ink bg-brand shadow-glow hover:opacity-95 " +
      "active:scale-[0.99]",
    secondary:
      "bg-surface text-text border border-border shadow-soft hover:bg-surface-2 " +
      "active:scale-[0.99]",
    ghost:
      "bg-transparent text-text hover:bg-surface-2 " +
      "active:scale-[0.99]",
  };

  const sizes: Record<Size, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-5 text-base",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
