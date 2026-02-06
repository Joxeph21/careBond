"use client";
import { useAdminLogs } from "@/hooks/superadmin/useS_Dashboard";
import { useAmChart } from "@/hooks/useAMCharts";
import {
  KFormatter,
  formatDuration,
  getStatusByColor,
} from "@/utils/helper-functions";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

const stats = [
  {
    title: "Total Uptime",
    value: 123231,
    type: "duration",
  },
  {
    title: "Total Devices",
    value: 12,
    type: "decimal",
  },
  {
    title: "Total Plans",
    value: 8,
  },
];

const data = [
  { name: "Group A", value: 200, fill: "#FF8E26" },
  { name: "Group B", value: 500, fill: "#3F8EF3" },
  { name: "Group C", value: 300, fill: "#14CC26" },
];

export default function SuperAdminTab() {
  const { logs, isLoading } = useAdminLogs();
  const totalDuration = formatDuration(
    data.reduce((acc, el) => acc + el.value, 0),
  );

  const groupedLogs = useMemo(() => {
    if (!logs) return {};
    return logs.reduce(
      (acc, log) => {
        const date = format(new Date(log.timestamp), "MMM dd, yyyy");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(log);
        return acc;
      },
      {} as Record<string, Log[]>,
    );
  }, [logs]);

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

        <ul className="w-full flex flex-col gap-6 mt-6 pb-20 max-h-[480px] overflow-y-auto scrollbar-hide">
          {Object.entries(groupedLogs).map(([date, items]) => (
            <li key={date} className="w-full flex flex-col gap-4">
              <div className="flex items-center gap-3 w-full">
                <span className="text-primary font-medium text-sm whitespace-nowrap">
                  {date}
                </span>
                <div className="h-px bg-primary flex-1" />
              </div>

              <ul className="flex flex-col gap-1 w-full">
                {items.map((log) => (
                  <li
                    key={log.id}
                    className="flex  items-start gap-3 w-full border-b border-[#E6EBF4] last:border-0 pb-3 last:pb-0"
                  >
                    <div className="size-2.5 rounded-full bg-[#B4B4B4] mt-1.5 shrink-0" />
                    <div className="flex flex-col flex-1 gap-1">
                      <span className="text-[#646464] text-sm font-medium">
                        {format(new Date(log.timestamp), "hh:mm a")}
                      </span>
                      <div className="flex flex-col">
                        <h5 className="text-[#1C1C1C] font-semibold text-sm">
                          {log.user_name}
                        </h5>
                        <p className="text-[#646464] text-xs">{log.details ?? "Created an account "}</p>
                      </div>
                    </div>
                    <Icon
                      icon={ICON.CARET_RIGHT}
                      className="text-[#B4B4B4] mt-1"
                      fontSize={18}
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))}
          {isLoading && (
            <div className="w-full py-10 flex-center">
              <Icon
                icon={"line-md:loading-twotone-loop"}
                className="text-primary"
                fontSize={30}
              />
            </div>
          )}
          {!isLoading && Object.keys(groupedLogs).length === 0 && (
            <div className="w-full py-10 flex-center text-gray text-sm">
              No logs found
            </div>
          )}
        </ul>

        {/* See More Link with Background */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#f1f4f9] via-[#f1f4f9] to-transparent pointer-events-none rounded-b-xl" />
        <Link
          href={"/"}
          className="text-primary font-medium absolute left-4 w-[calc(100%-32px)] text-center bottom-3 py-2 z-10"
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
