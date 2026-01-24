import * as React from "react";
import { cn } from "@/lib/cn";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";
type Tone = "default" | "muted" | "brand";

const levelStyles: Record<HeadingLevel, string> = {
  h1: "text-3xl md:text-4xl font-semibold tracking-tight",
  h2: "text-2xl md:text-3xl font-semibold tracking-tight",
  h3: "text-xl md:text-2xl font-semibold tracking-tight",
  h4: "text-lg md:text-xl font-semibold tracking-tight",
};

const toneStyles: Record<Tone, string> = {
  default: "text-text",
  muted: "text-muted",
  brand: "text-brand",
};

export function Heading({
  as = "h2",
  tone = "default",
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  as?: HeadingLevel;
  tone?: Tone;
}) {
  const Tag = as;
  return (
    <Tag
      className={cn("gb-display", levelStyles[as], toneStyles[tone], className)}
      {...props}
    />
  );
}

type TextSize = "sm" | "md" | "lg";
type TextWeight = "normal" | "medium";

const textSizeStyles: Record<TextSize, string> = {
  sm: "text-sm leading-6",
  md: "text-[0.95rem] leading-7",
  lg: "text-base leading-7",
};

const weightStyles: Record<TextWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
};

export function Text({
  size = "md",
  tone = "default",
  weight = "normal",
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
  size?: TextSize;
  tone?: Tone;
  weight?: TextWeight;
}) {
  return (
    <p
      className={cn(textSizeStyles[size], toneStyles[tone], weightStyles[weight], className)}
      {...props}
    />
  );
}
