"use client";
import { ICON } from "@/utils/icon-exports";
import { KEY } from "@/utils/keys";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

export default function InstitutionPlanBanner() {
  const [showBanner, setShowBanner] = useState(() => {
    if (typeof window === "undefined") {
      const has_closed_banner = localStorage?.getItem(KEY.hasClosedPlanBanner);
      return !!has_closed_banner;
    }
    return true;
  });

  const handleClose = () => {
    setShowBanner(false);
    localStorage.setItem(KEY.hasClosedPlanBanner, "true");
  };

  if (!showBanner) return null;
  return (
    <div className="p-4 w-full flex-between rounded-md bg-[#FCEFEA]">
      <div className="flex items-center gap-2">
        <Icon color="#E04F16" icon={ICON.INFO} />
        <p className="text-[#646B72]">
          Institution is currently running on the{" "}
          <span className="text-[#E04F16]"> Enterprise Plan.</span>
        </p>
      </div>
      <button className="cursor-pointer" onClick={handleClose}>
        <Icon icon={ICON.CLOSE} />
      </button>
    </div>
  );
}
