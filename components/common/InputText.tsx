"use client";

import { InputHTMLAttributes, useState, forwardRef } from "react";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";

type InputProps = {
  config?: InputHTMLAttributes<HTMLInputElement>;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  prefix?: string;
  suffix?: string;
};

const InputText = forwardRef<HTMLInputElement, InputProps>(
  ({ label, config = {}, error, errorMessage, prefix, suffix }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const baseClass = `w-full ring py-1.5 p-3 gap-2 rounded-md flex-between ${
      error ? "ring-danger" : "ring-grey"
    }
    ${config.className ?? ""}  
    `;

    const inputProps = {
      ref,
      ...config,
      className: `w-full placeholder:text-placeholder outline-none `,
      type:
        config.type === "password"
          ? isVisible
            ? "text"
            : "password"
          : config.type,
      placeholder:
        config?.type === "password" ? "********" : config.placeholder,
    };

    return (
      <div className="w-full flex flex-col gap-1">
        {label && <label className="flex items-center gap-1" htmlFor={config.name}>{label}
           {config?.required && <span className="text-danger">*</span>}
          </label>}

        <div className={baseClass}>
          {prefix && (
            <span className="size-4 flex-center">
              <Icon icon={prefix} fontSize={20} />
            </span>
          )}

          <input {...inputProps} />

          {config.type === "password" && (
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              role="switch"
              aria-checked={isVisible}
              className="size-4 cursor-pointer flex-center"
            >
              <Icon icon={isVisible ? ICON.EYE_OFF : ICON.EYE} fontSize={20} />
            </button>
          )}

          {suffix && config.type !== "password" && (
            <span className="size-4 flex-center">
              <Icon icon={suffix} fontSize={20} />
            </span>
          )}
        </div>

        {error && (
          <p className="font-medium text-xs text-danger">{errorMessage}</p>
        )}
      </div>
    );
  }
);

InputText.displayName = "InputText";

export default InputText;
