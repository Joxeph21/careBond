"use client";
import Table from "@/ui/Table";
import { formatFullDateTime } from "@/utils/helper-functions";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React, { Activity, useState } from "react";
import Button from "../common/Button";

export default function EventList({
  summary,
  matchedService,
  requestDetails,
}: SecurityEventLog) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Table.Row>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`text-[#0051C3] cursor-pointer ease-in transition-all duration-150 ${
          isOpen && "rotate-180"
        }`}
      >
        <Icon icon={ICON.CARET_DOWN} fontSize={20} />
      </button>
      <p
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        className="text-base cursor-pointer text-[#0051C3]"
      >
        {formatFullDateTime(summary.date)}
      </p>
      <p>{summary.action}</p>
      <p>{summary.country}</p>
      <p>{summary.ipAddress}</p>
      <p>{summary.service}</p>
      <Activity mode={isOpen ? "visible" : "hidden"}>
        <section className="w-full flex flex-col gap-3 col-span-6 py-3 px-4     ">
          <section className="w-full flex flex-col gap-3">
            <div className="w-full flex-between">
              <h2 className="text-[#191919] text-base">Matched service</h2>
              <Button
                config={{
                  className: "ring-0! gap-1! text-primary!",
                }}
                size="medium"
                variants="outlined"
                iconPlacement="left"
                icon={ICON.DOWNLOAD2}
              >
                Export event JSON
              </Button>
            </div>

            <ul className="w-full gap-3 grid grid-cols-2">
              {renderObjectList(matchedService)}
            </ul>
          </section>

          <hr className="w-full border-t-2 border-t-grey" />

          <section className="w-full flex flex-col gap-3">
            <div className="w-full flex-between">
              <h2 className="text-[#191919] text-base">Request details</h2>
            </div>
            <ul className="w-full gap-3 grid grid-cols-2">
              {renderObjectList(requestDetails)}
            </ul>
          </section>
        </section>
      </Activity>
    </Table.Row>
  );
}
function renderObjectList(obj: Record<string, unknown>) {
  return Object.entries(obj).map(([key, value]) => {
    // Special handling for ruleset & rule
    if (
      (key === "ruleset" || key === "rule") &&
      typeof value === "object" &&
      value !== null
    ) {
      const v = value as { name?: string; id?: string };

      return (
        <li key={key} className="w-full flex items-start gap-2">
          <h4 className="text-[#797979] w-[20%] capitalize">{key}</h4>

          <div className="w-[80%] flex flex-col">
            <p className="text-[#0051C3]">{v.name}</p>
            {v.id && (
              <p className="text-[#797979] text-sm">…{v.id.slice(-8)}</p>
            )}
          </div>
        </li>
      );
    }

    // Generic nested objects (asn, http, url, etc.)
    if (typeof value === "object" && value !== null) {
      return Object.entries(value as Record<string, unknown>).map(
        ([nestedKey, nestedValue]) => (
          <li
            key={`${key}-${nestedKey}`}
            className="w-full flex items-start gap-2"
          >
            <h4 className="text-[#797979] w-[20%] capitalize">
              {nestedKey.replace(/([A-Z])/g, " $1")}
            </h4>
            <p className="text-[#191919] w-[80%] wrap-break-word">
              {String(nestedValue)}
            </p>
          </li>
        )
      );
    }

    // Primitive values
    return (
      <li key={key} className="w-full flex items-start gap-2">
        <h4 className="text-[#797979] w-[20%] capitalize">
          {key.replace(/([A-Z])/g, " $1")}
        </h4>
        <p className="text-[#191919] w-[80%] wrap-break-word">{String(value)}</p>
      </li>
    );
  });
}
