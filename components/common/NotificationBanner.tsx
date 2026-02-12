"use client";

import { useBrowserNotification } from "@/hooks/useBrowserNotification";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React, { useMemo, useState } from "react";

export default function NotificationBanner() {
  const { permission, requestPermission } = useBrowserNotification();
  const [dismissed, setDismissed] = useState(false);

  const isVisible = useMemo(() => {
    if (dismissed) return false;
    const isDismissedInSession = sessionStorage.getItem(
      "notif-banner-dismissed",
    );
    return permission === "default" && !isDismissedInSession;
  }, [permission, dismissed]);

  const handleEnable = async () => {
    const result = await requestPermission();
    if (result === "granted" || result === "denied") {
      setDismissed(true);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("notif-banner-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="bg-primary/5 border-b border-primary/10 px-6 py-2 flex items-center justify-between animate-in fade-in slide-in-from-top duration-500">
      <div className="flex items-center gap-3">
        <span className="flex-center size-8 rounded-full bg-primary/10 text-primary">
          <Icon icon={ICON.BELL} fontSize={18} />
        </span>
        <p className="text-sm font-medium text-[#212B36]">
          Stay updated! Enable browser notifications to receive real-time
          alerts.
        </p>
        <button
          onClick={handleEnable}
          className="ml-4 text-xs font-bold text-white bg-primary px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
        >
          Enable Notifications
        </button>
      </div>
      <button
        onClick={handleDismiss}
        className="p-1 hover:bg-black/5 rounded-full transition-colors cursor-pointer text-grey-dark"
        aria-label="Dismiss"
      >
        <Icon icon={ICON.CANCEL} fontSize={18} />
      </button>
    </div>
  );
}
