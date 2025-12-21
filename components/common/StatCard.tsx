import { formatValue } from "@/utils/helper-functions";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React from "react";

export type DataProps = {
  icon: React.ReactNode;
  title: string;
  value: number;
  type?: "currency" | "number";
  trend: "positive" | "negative";
  trendValue: number;
};

export default function StatCard({
  icon: IconNode,
  title,
  type = "number",
  value,
  trend,
  trendValue,
}: DataProps) {
  const isPositive = trend === "positive";
  return (
    <li className="w-full col-between items-start! max-w-56.5 h-39.5 ring ring-[#E8E8E8] bg-white p-5">
      <div className="space-y-3">
        {IconNode}
        <p className="capitalize text-[#676767]">{title}</p>
      </div>

      <div className="flex-between w-full">
        <h2 className="text-2xl font-medium text-[#1C1C1C]">
          {formatValue(value, { type })}
        </h2>
        <span
          className={`flex-center w-fit ${
            isPositive ? "text-[#14CC26]" : "text-danger"
          }`}
        >
          <Icon
            icon={isPositive ? ICON.CARET_UP : ICON.CARET_DOWN}
            fontSize={21}
          />
          <p>
            {isPositive ? "+" : "-"}
            {trendValue}
          </p>
        </span>
      </div>
    </li>
  );
}
