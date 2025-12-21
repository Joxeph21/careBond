"use client";
import { KFormatter, formatDuration } from "@/utils/helper-functions";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Legend, Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts";

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
  { name: "Group A", value: 20, fill: "#FF8E26" },
  { name: "Group B", value: 50, fill: "#3F8EF3" },
  { name: "Group C", value: 30, fill: "#14CC26" },
];

export default function SuperAdminTab() {
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

        <div className="flex-between w-full pb-5">
          <ResponsiveContainer width={"100%"} height={250}>
            <PieChart>
              <Pie
                data={data}
                innerRadius="75%"
                outerRadius="100%"
                cornerRadius={10}
                paddingAngle={5}
                dataKey="value"
                isAnimationActive
              />

              <Tooltip />
              {/* <Legend
              
                verticalAlign="middle"
                align="right"
                width={160}
                iconSize={15}
                iconType="circle"
                layout="vertical"
              /> */}
            </PieChart>
          </ResponsiveContainer>


          <div className="size-6"></div>
        </div>
      </footer>
    </aside>
  );
}
