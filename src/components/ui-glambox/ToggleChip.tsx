"use client";

import { cn } from "@/lib/cn";

export type ToggleChipProps = {
  label: string;
  selected?: boolean;
  onToggle?: () => void;
};

const ToggleChip = ({ label, selected, onToggle }: ToggleChipProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "chip text-sm transition",
        selected
          ? "border-white/60 bg-white/15 text-white"
          : "text-white/80 hover:border-white/40",
      )}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
};

export default ToggleChip;
