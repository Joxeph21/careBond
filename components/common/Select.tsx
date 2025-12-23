"use client";
import Popover from "@/ui/Popover";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

type SIZE = "small" | "regular" | "full";

type VARIANT = "regular" | "themed" | "secondary";

type SelectProps<Z> = {
  data: OptionsType<Z>[];
  placeholder?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  size?: SIZE;
  icon?: string;
  variant: VARIANT;
  onChange?: (val?: Z | string, obj?: OptionsType<Z>) => void;
  themedClass?: string;
};

export default function Select<Z>({
  data,
  placeholder = "Select",
  label,
  error,
  errorMessage,
  size = "regular",
  onChange,
  icon,
  variant,
  themedClass,
}: SelectProps<Z>) {
  const [selected, setSelected] = useState(data[0].label ?? placeholder);

  const sizes: Record<NonNullable<SIZE>, string> = {
    small: "w-32",
    regular: "w-fit",
    full: "w-full",
  };

  const variants: Record<NonNullable<VARIANT>, string> = {
    regular: "text-[#676767] bg-white ring ring-grey",
    secondary: "",
    themed: themedClass ?? "text-[#4A4A4A] bg-[#F4F6FA]",
  };

  const handleSelect = (val: OptionsType<Z>) => {
    setSelected(val.label);

    if (val.value !== undefined && val.value !== null) {
      onChange?.(val.value, val);
    }
  };

  return (
    <Popover>
      <Popover.Menu>
        <div className={`${sizes[size]} flex flex-col gap-3`}>
          {label && <p>{label}</p>}
          <Popover.Trigger>
            <button
              className={`${variants[variant]} py-2 group px-3 rounded-md  w-fit flex-center gap-2 cursor-pointer`}
              type="button"
            >
              {selected}
              <span className="shrink group-focus:rotate-180 ease-in transition-all duration-200">
                <Icon icon={icon ?? ICON.CARER_DOWN2} fontSize={20} />
              </span>
            </button>
          </Popover.Trigger>

          {error && <p className="font-medium text-danger">{errorMessage}</p>}
        </div>

        <Popover.Content className="shadow-xl!">
          {(closepopover) => (
            <ul className="flex flex-col items-start gap-3 min-w-20">
              {data.map((el) => (
                <li
                  onClick={() => {
                    handleSelect(el);
                    closepopover();
                  }}
                  className="cursor-pointer p-1 w-full hover:bg-gray-100"
                  key={el.label}
                >
                  {el.label}
                </li>
              ))}
            </ul>
          )}
        </Popover.Content>
      </Popover.Menu>
    </Popover>
  );
}
