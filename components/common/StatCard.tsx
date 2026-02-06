import { formatValue } from "@/utils/helper-functions";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React from "react";

export type DataProps = {
  icon?: React.ReactNode;
  title?: string;
  value?: number;
  type?: "currency" | "number";
  trend?: "positive" | "negative";
  trendValue?: number;
};

export default function StatCard({
  icon: IconNode,
  title,
  type = "number",
  value,
  trend,
  trendValue,
  isLoading,
}: { isLoading?: boolean } & DataProps) {
  if (isLoading) {
    return (
      <li className="w-full col-between items-start! max-w-56.5 h-39.5 ring ring-[#E8E8E8] bg-white p-5 animate-shimmer">
        <div className="space-y-3 w-full">
          <div className="w-10 h-10 rounded-lg bg-grey/50" />
          <div className="h-4 w-24 bg-grey/50 rounded" />
        </div>

        <div className="flex-between w-full">
          <div className="h-8 w-20 bg-grey/50 rounded" />
          <div className="h-6 w-12 bg-grey/50 rounded" />
        </div>
      </li>
    );
  }

  const isPositive = trend === "positive";

  return (
    <li className="w-full col-between items-start! max-w-56.5 h-39.5 ring ring-[#E8E8E8] bg-white p-5">
      <div className="space-y-3">
        {IconNode}
        <p className="capitalize text-[#676767] font-medium">{title}</p>
      </div>

      <div className="flex-between w-full">
        <h2 className="text-2xl font-bold text-[#1C1C1C]">
          {formatValue(value ?? 0, { type })}
        </h2>

        {trendValue !== undefined && (
          <span
            className={`flex-center w-fit gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-semibold ${
              isPositive
                ? "bg-success/10 text-[#14CC26]"
                : "bg-danger/10 text-danger"
            }`}
          >
            <Icon
              icon={isPositive ? ICON.CARET_UP : ICON.CARET_DOWN}
              fontSize={14}
            />
            <span>{trendValue}%</span>
          </span>
        )}
      </div>
    </li>
  );
}
