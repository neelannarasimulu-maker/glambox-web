import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "default" | "brand" | "muted" | "outline";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: Variant;
}) {
  const variants: Record<Variant, string> = {
    default: "bg-surface text-text border border-border",
    brand: "bg-brand text-brand-ink border border-transparent shadow-glow",
    muted: "bg-surface-2 text-muted border border-border",
    outline: "bg-transparent text-text border border-border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
