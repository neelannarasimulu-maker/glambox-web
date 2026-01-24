"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <label className="flex items-start gap-3 text-sm text-white/80">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={cn(
            "mt-1 h-4 w-4 rounded border border-white/30 bg-white/10 text-pink-400",
            className,
          )}
          {...props}
        />
        {label ? <span>{label}</span> : null}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
