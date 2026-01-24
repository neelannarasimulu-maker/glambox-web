"use client";

import { useState } from "react";
import Input, { type InputProps } from "./Input";

const PasswordInput = ({ label, ...props }: InputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        {label ? (
          <label
            htmlFor={props.id ?? props.name}
            className="text-sm font-medium text-white"
          >
            {label}
          </label>
        ) : null}
        <button
          type="button"
          className="text-xs font-medium text-white/60 hover:text-white"
          onClick={() => setVisible((prev) => !prev)}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      <Input
        {...props}
        label={undefined}
        type={visible ? "text" : "password"}
      />
    </div>
  );
};

export default PasswordInput;
