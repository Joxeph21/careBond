"use client";
import SubscriptionCard from "@/components/common/SubscriptionCard";
import { PLANS } from "@/utils/constants";
import React, { useEffect, useRef, useState } from "react";

const tabs = ["yearly", "monthly"];

export default function PlansContent() {
  const [activeTab, setActiveTab] = useState<"yearly" | "monthly">("yearly");
  const activeRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (!activeRef.current || !containerRef.current) return;

    const activeEl = activeRef.current;
    const containerEl = containerRef.current;

    const activeRect = activeEl.getBoundingClientRect();
    const containerRect = containerEl.getBoundingClientRect();

    setIndicatorStyle({
      left: activeRect.left - containerRect.left,
      width: activeRect.width,
    });
  }, [activeTab]);

  const handleTabChange = (tab: "yearly" | "monthly") => {
    setActiveTab(tab);
  };

  return (
    <section className="w-full col-center gap-7  bg-white">
      <div
        ref={containerRef}
        className="p-2  bg-[#F4F6F8] relative rounded-full flex-center gap-5"
      >
        <span
          className="absolute top-1/2 -translate-y-1/2 h-6 rounded-full bg-white transition-all duration-300 ease-out shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
        />
        {tabs.map((tab) => (
          <button
            ref={activeTab === tab ? activeRef : null}
            key={tab}
            onClick={() => handleTabChange(tab as "yearly" | "monthly")}
            className={`capitalize py-1 px-3 font-semibold text-xs cursor-pointer z-1 ${
              activeTab === tab ? "text-primary" : "text-[#1C1B25]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <ul className="w-full flex-center min-h-96 gap-6">
        {PLANS.map((el, i) => <SubscriptionCard activeTab={activeTab} key={i} {...el}/>)}
      </ul>
    </section>
  );
}
