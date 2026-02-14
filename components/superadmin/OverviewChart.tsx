"use client";
import Select from "../common/Select";
import { useSearchParams } from "next/navigation";
import { useFilter } from "@/hooks/useFilter";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useGetUserGrowth } from "@/hooks/institution/useAnalytics";

export const sortOptions = [
  {
    label: "Monthly",
    value: "",
  },
  {
    label: "24 hours",
    value: "24h",
  },
  {
    label: "Week",
    value: "7d",
  },
  {
    label: "Year",
    value: "1y",
  },
];

export default function OverviewChart() {
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  const { userGrowth } = useGetUserGrowth({
    range: sortBy as "1y" | "24h" | "30d" | "7d",
  });
  const { options, handleFilter } = useFilter({
    filterOptions: sortOptions,
    paramKey: "sortBy",
    hasInitial: false,
  });

  return (
    <section className="w-full py-3 px-4 flex flex-col gap-5 bg-white rounded-lg min-h-96 ring ring-grey">
      <div className="flex-between w-full">
        <Select placeholder="New Users" variant="themed" />
        <Select
          onChange={(_, v) => handleFilter(v?.value ?? "")}
          data={options}
          defaultValue={sortBy}
          variant="regular"
          type="optimistic"
        />
      </div>

      <AreaChart
        data={userGrowth}
        style={{
          width: "100%",
          height: "100%",
          marginTop: "auto",
          aspectRatio: 3.4,
        }}
        responsive
      >
        <CartesianGrid
          strokeDasharray="3 0"
          stroke="#E8E8E8"
          vertical={false}
        />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} dataKey={"value"}  />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          strokeWidth={2}
          stroke="#3A6FF8"
          fill="#3A6FF81A"
        />
      </AreaChart>
    </section>
  );
}
