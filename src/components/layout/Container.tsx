import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export default function Container({
  children,
  className,
  size = "xl",
}: {
  children: ReactNode;
  className?: string;
  size?: "md" | "lg" | "xl";
}) {
  const widths = {
    md: "max-w-3xl",
    lg: "max-w-5xl",
    xl: "max-w-6xl",
  };

  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6", widths[size], className)}>
      {children}
    </div>
  );
}
