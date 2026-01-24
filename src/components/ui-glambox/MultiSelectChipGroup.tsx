"use client";

import ToggleChip from "./ToggleChip";

export type MultiSelectChipGroupProps = {
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
};

const MultiSelectChipGroup = ({
  options,
  values,
  onChange,
}: MultiSelectChipGroupProps) => {
  const toggle = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((value) => value !== option));
    } else {
      onChange([...values, option]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <ToggleChip
          key={option}
          label={option}
          selected={values.includes(option)}
          onToggle={() => toggle(option)}
        />
      ))}
    </div>
  );
};

export default MultiSelectChipGroup;
