import { Icon } from "@iconify/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function CopyBtn({
  label,
  value,
  size = 22,
  className,
}: {
  label?: string;
  value: string;
  size?: number;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy");
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`text-primary mx-px disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed transition-opacity hover:opacity-80 ${className}`}
      aria-label={label ? `Copy ${label}` : "Copy to clipboard"}
      title={label ? `Copy ${label}` : "Copy to clipboard"}
    >
      <Icon
        icon={copied ? "tabler:check" : "tabler:copy"}
        fontSize={size}
        className={copied ? "text-green-500" : ""}
      />
    </button>
  );
}
