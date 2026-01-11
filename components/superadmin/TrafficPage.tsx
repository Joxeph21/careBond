"use client";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import  { Activity, useState } from "react";

export default function TrafficPage() {
  const [isOpen, setIsOpen] = useState(false);
  const suspicious_activity = [];

  return (
    <section className="section-container flex flex-col gap-3">
      <div className="w-full py-4 border-b-2 space-y-1 border-grey">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex focus:outline cursor-pointer text-lg items-center gap-2"
        >
          Suspicious activity
          <span className="rounded-full text-xs flex-center bg-[#F2F2F2] text-[#313131] size-6">
            {suspicious_activity.length}
          </span>
          <Icon icon={ICON.CARET_LEFT} fontSize={20} className={`${isOpen ? "rotate-270" : "rotate-180"} transition-all ease-in duration-150`} />
        </button>
        <Activity mode={isOpen ? "visible" : "hidden"}>
          <div className="w-full flex-center p-3">
            {suspicious_activity.length === 0 && (
              <p className="font-medium text-base">
                No Suspicious activity found
              </p>
            )}
          </div>
        </Activity>
      </div>
    </section>
  );
}
