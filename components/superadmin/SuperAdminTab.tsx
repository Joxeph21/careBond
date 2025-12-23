"use client";
import { useAmChart } from "@/hooks/useAMCharts";
import {
  KFormatter,
  formatDuration,
  getStatusByColor,
} from "@/utils/helper-functions";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const stats = [
  {
    title: "Total Uptime",
    value: 949493,
    type: "duration",
  },
  {
    title: "Total Devices",
    value: 949493,
    type: "decimal",
  },
  {
    title: "Total Plans",
    value: 3,
  },
];

const data = [
  { name: "Group A", value: 200, fill: "#FF8E26" },
  { name: "Group B", value: 500, fill: "#3F8EF3" },
  { name: "Group C", value: 300, fill: "#14CC26" },
];

export default function SuperAdminTab() {
  const totalDuration = formatDuration(
    data.reduce((acc, el) => acc + el.value, 0)
  );



  useAmChart<(typeof data)[0]>("uptime-donut", "donut", data);
  const returnValue = (val: number, type?: "duration" | "decimal" | string) => {
    switch (type) {
      case "duration":
        return formatDuration(val);
      case "decimal":
        return KFormatter(val);
      default:
        return val;
    }
  };

  return (
    <aside className="p-4 border-l flex flex-col items-center gap-7 border-grey sticky top-0 overflow-y-scroll h-full py-8 max-w-96 w-full bg-white">
      {/* Header */}
      <header className="col-between gap-6 w-full">
        <div className="col-center gap-3">
          <figure className="bg-[#EEF3FF] rounded-full size-20 relative overflow-hidden">
            <Image
              src={"/user.png"}
              fill
              className="object-center object-cover"
              alt="Admin_profile_picture"
            />
          </figure>
          <h4 className="text-[#1C1C1C] font-medium text-lg">Super Admin</h4>
        </div>
        <ul className="w-full mt-1.5 px-2 flex-between">
          {stats.map((el, i) => {
            const isLastEl = i === stats.length - 1;

            return (
              <React.Fragment key={el.title}>
                <li key={el.title} className="col-center gap-4">
                  <p className="text-[#A9A9A9] text-xs capitalize">
                    {el.title}
                  </p>
                  <h5 className="text-[#1C1C1C] font-medium text-lg">
                    {returnValue(el.value, el?.type)}
                  </h5>
                </li>
                {!isLastEl && <div className="h-12 w-px bg-grey" />}
              </React.Fragment>
            );
          })}
        </ul>
      </header>

      {/* Sessions Table */}
      <div className="bg-[#E6EBF470] col-start relative min-h-96 p-3 w-full rounded-xl">
        <div className="flex-between w-full">
          <h4 className="text-[#333333] font-medium text-lg">System Health</h4>

          <button type="button">
            <Icon icon={ICON.ELIPSIS} fontSize={21} />
          </button>
        </div>

        <Link
          href={"/"}
          className="text-[#777777] font-medium absolute  bottom-3"
        >
          See more
        </Link>
      </div>

      {/* Chart Tab */}
      <footer className="col-start gap-5 w-full min-h-44 items-start!">
        <div className="space-y-1">
          <h4 className="text-lg font-medium text-[#4A4A4A]">Uptime History</h4>
          <p className="text-[#999999]">Last 90 days</p>
        </div>

        {/* Pie chart on the left label on the right */}
        <div className="flex items-center justify-between px-0  w-full pb-5">

          {/* Donut Chart */}
          <div className="relative w-[60%] aspect-square">
            <div id="uptime-donut" className="w-full cursor-pointer h-full" />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-[#676767]">Total</span>
              <span className="text-base font-medium text-primary">
                {totalDuration}
              </span>
            </div>
          </div>
         

         {/* Label */}
          <ul className="flex flex-col w-[35%] gap-3">
            {data.map((item) => (
              <li key={item.name} className="flex items-center gap-3">
                <span
                  className="size-2.5 rounded-sm"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-[#676767] text-sm ">
                  {getStatusByColor(item.fill)}
                </span>
              </li>
            ))}
          </ul>
          <div className="size-6"></div>
        </div>
      </footer>
    </aside>
  );
}
