"use client";
import { useState, useEffect, useRef } from "react";
import DashTitle from "@/components/common/DashTitle";
import Button from "@/components/common/Button";
import Select from "@/components/common/Select";
import { ICON } from "@/utils/icon-exports";
import TrafficPage from "@/components/superadmin/TrafficPage";
import EventsPage from "@/components/superadmin/EventsPage";
import { useFilter } from "@/hooks/useFilter";
import { sortOptions } from "@/components/superadmin/OverviewChart";
import { useSearchParams } from "next/navigation";

const tabs = ["Traffic", "Events"];

export default function Page() {
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  const [tab, setTab] = useState(tabs[0]);
  const containerRef = useRef(null);
  const tabRef = useRef(null);

  const newOptions = sortOptions.map((el) => {
    if (el.label === "Today") return { ...el, value: "" };
    if (el.label === "Monthly") return { ...el, value: "30D" };
    return el;
  });

  const { options, handleFilter } = useFilter({
    filterOptions: newOptions,
    paramKey: "sortBy",
    hasInitial: false,
  });

  const [tabWidth, setTabWidth] = useState({
    width: 0,
    left: 0,
  });
  useEffect(() => {
    if (tabRef.current && containerRef.current) {
      const tabRect = (
        tabRef.current as HTMLButtonElement
      ).getBoundingClientRect();
      const containerRect = (
        containerRef.current as HTMLDivElement
      ).getBoundingClientRect();

      setTabWidth({
        width: tabRect.width,
        left: tabRect.left - containerRect.left,
      });
    }
  }, [tab]);

  const renderTab = () => {
    switch (tab) {
      case "Traffic":
        return <TrafficPage range={sortBy} />;
      case "Events":
        return <EventsPage  />;
      default:
        return <TrafficPage range={sortBy} />;
    }
  };

  return (
    <section className="section-container min-h-full bg-white px-6 col-center gap-8 ">
      <div className="w-full">
        <DashTitle title="Platform Logs" />
        <p className="text-base px-4 self-start text-[#4A4A4A]">
          We analyze incoming HTTP requests for your domain and learn how
          website traffic by using Cloudflare.
        </p>
      </div>
      <header className="w-full flex flex-col gap-1">
        <div className="w-full flex items-center gap-3">
          {tabs.map((el, i) => (
            <button
              ref={tab === el ? tabRef : null}
              onClick={() => setTab(el)}
              key={i}
              className={`px-5 py-2 cursor-pointer capitalize transition-colors ${
                tab === el ? "text-primary font-medium" : "text-gray-500"
              }`}
            >
              {el.split("-").join(" ")}
            </button>
          ))}
        </div>
        <div
          ref={containerRef}
          className="relative w-full bg-[#E5E5E5] h-[2px]"
        >
          <span
            style={{
              width: tabWidth.width,
              left: tabWidth.left,
            }}
            className="absolute bg-primary rounded-full h-full transition-all duration-300 ease-out"
          />
        </div>
      </header>

      <div className="pb-4 border-b-[1.5px] w-full flex-between  border-grey">
        {/* <Button
          config={{
            className: "ring-primary! gap-1! text-primary",
          }}
          size="medium"
          icon={ICON.PLUS_CIRCLE}
          iconPlacement="left"
          variants="outlined"
        >
          Add filter
        </Button> */}
        <Select
          onChange={(_, v) => handleFilter(v?.value ?? "")}
          data={options}
          defaultValue={sortBy}
          variant="regular"
          type="optimistic"
        />
      </div>

      {renderTab()}
    </section>
  );
}
