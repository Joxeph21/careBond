"use client";
import Popover from "@/ui/Popover";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React, { PropsWithChildren, useState } from "react";

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
  required?: boolean;
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
  required,
  themedClass,
  children
}: PropsWithChildren  & SelectProps<Z>) {
  const [selected, setSelected] = useState(data?.at(0)?.label ?? placeholder);

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
        <div className={`${sizes[size]} flex flex-col gap-2`}>
          {label && <p className="flex items-center gap-1">{label}
            {required && <span className="text-danger">*</span>}
            </p>}
          <Popover.Trigger>
            <button
              className={`${variants[variant]} py-2 group px-3 rounded-md  w-full flex-between gap-2 cursor-pointer`}
              type="button"
            >
              {children}
              {selected}
              <span className="shrink group-focus:rotate-180 ease-in transition-all duration-200">
                <Icon icon={icon ?? ICON.CARET_DOWN2} fontSize={20} />
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
