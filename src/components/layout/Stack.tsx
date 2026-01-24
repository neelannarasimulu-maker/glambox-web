import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export default function Stack({
  children,
  className,
  gap = "md",
}: {
  children: ReactNode;
  className?: string;
  gap?: "sm" | "md" | "lg";
}) {
  const gaps = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  return <div className={cn("flex flex-col", gaps[gap], className)}>{children}</div>;
}
