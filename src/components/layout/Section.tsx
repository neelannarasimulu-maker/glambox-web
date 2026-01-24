import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import Container from "./Container";

export default function Section({
  children,
  className,
  containerClassName,
  size = "xl",
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  size?: "md" | "lg" | "xl";
  variant?: "default" | "bg";
}) {
  return (
    <section className={cn("py-10 md:py-14", variant === "bg" && "gb-bg", className)}>
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
