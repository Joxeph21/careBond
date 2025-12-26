"use client"
import React, { useState } from "react";

interface SwitchProps {
  className?: string;
  disabled?: boolean;
}

export default function Switch({ className, disabled }: Partial<SwitchProps>) {
  const [isOn, setIsOn] = useState(false);

  const onToggle = () => {
    setIsOn((curr) => !curr);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      onClick={onToggle}
      className={`
        w-11 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out cursor-pointer flex items-center
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${isOn ? "bg-primary" : "bg-[#E6E6E6]"}
        ${className ?? ""}
      `}
    >
      <span
        className={`
          bg-white w-4 h-4 rounded-full shadow-md transition-transform duration-300 ease-in-out
          ${isOn ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </button>
  );
}
