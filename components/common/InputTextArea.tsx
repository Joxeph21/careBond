import React, { TextareaHTMLAttributes, forwardRef } from "react";

type InputProps = {
  config?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  message?: string;
  className?: string;
};

const InputTextArea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ config = {}, label, error, errorMessage, message, className }, ref) => {
    return (
      <div className={`flex flex-col gap-1 w-full ${className}`}>
        {label && (
          <label className="flex items-center gap-1" htmlFor={config.name}>
            {label}
            {config?.required && <span className="text-danger">*</span>}
          </label>
        )}

        <textarea  ref={ref} {...config}
        placeholder={config.placeholder ?? "Type your message"}
        className="placeholder:text-placeholder w-full min-h-18 p-3 resize-none ring rounded-md ring-grey"
        />
        <div className="flex items-center gap-2">
          {message && (
            <p className="font-medium text-xs text-[#646B72]">{message}</p>
          )}
          {error && (
            <p className="font-medium text-xs text-danger">{errorMessage}</p>
          )}
        </div>
      </div>
    );
  }
);

InputTextArea.displayName = "InputTextArea";

export default InputTextArea;
