"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="space-y-2">
        {label ? (
          <label htmlFor={inputId} className="text-sm font-medium text-white">
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40",
            "focus:border-white/40 focus:outline-none",
            error ? "border-rose-400/70" : "",
            className,
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-rose-300">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-white/50">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
