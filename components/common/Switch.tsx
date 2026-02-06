"use client";
import { useTransition, useOptimistic } from "react";

interface SwitchProps {
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?:
    | ((checked: boolean) => void)
    | ((checked: boolean) => Promise<void | unknown>);
  type?: "default" | "optimistic";
}

export default function Switch(props: Partial<SwitchProps>) {
  const { className, disabled, checked, onChange, type } = props;
  const isOn = checked ?? false;

  const onToggle = () => {
    onChange?.(!isOn);
  };

  if (type === "optimistic") {
    return <OptimisticSwitch {...props} />;
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      onClick={onToggle}
      className={`
        w-11 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out disabled:cursor-not-allowed flex items-center
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${isOn ? "bg-primary" : "bg-[#E6E6E6]"}
        ${className ?? ""}
      `}
    >
      <span
        className={`
          bg-white w-4 h-4 rounded-full shadow-md transition-transform duration-300 ease-in-out
          ${isOn ? "translate-x-5" : "translate-x-0"}
          ${(disabled) && "cursor-not-allowed"}

        `}
      />
    </button>
  );
}

function OptimisticSwitch(props: Partial<SwitchProps>) {
  const { className, disabled, checked, onChange } = props;

  const [isPending, startTransition] = useTransition();

  const [optimisticChecked, setOptimisticChecked] = useOptimistic(
    checked,
    (_state, newValue: boolean) => newValue,
  );

  const handleToggle = () => {
    const nextValue = !optimisticChecked;

    startTransition(async () => {
      setOptimisticChecked(nextValue);
      try {
        await onChange?.(nextValue);
      } catch (error) {
        console.error("Optimistic update failed:", error);
      }
    });
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={optimisticChecked}
      disabled={disabled || isPending}
      onClick={handleToggle}
      className={`
        w-11 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out  flex items-center
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${optimisticChecked ? "bg-primary" : "bg-[#E6E6E6]"}
        ${className ?? ""}
      `}
    >
      <span
        className={`
          bg-white w-4 h-4 rounded-full shadow-md transition-transform duration-300 ease-in-out
          ${optimisticChecked ? "translate-x-5" : "translate-x-0"}
          ${(disabled || isPending) && "cursor-not-allowed"}
        `}
      />
    </button>
  );
}
