"use client";
import { useState, useMemo } from "react";
import {
  RAW_USERS_DATA_24H,
  RAW_USERS_DATA_7D,
  RAW_USERS_DATA_30D,
  RAW_USERS_DATA_1Y,
  RawMetricData,
} from "@/utils/dummy";
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

const sortOptions = [
  {
    label: "Monthly",
    value: "",
  },
  {
    label: "Today",
    value: "24H",
  },
  {
    label: "This Week",
    value: "7D",
  },
  {
    label: "This Year",
    value: "1Y",
  },
];

export default function OverviewChart() {
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  const { options, handleFilter } = useFilter({
    filterOptions: sortOptions,
    paramKey: "sortBy",
    hasInitial: false,
  });

  const chartData = useMemo(() => {
    switch (sortBy) {
      case "24H":
        return RAW_USERS_DATA_24H;
      case "7D":
        return RAW_USERS_DATA_7D;
      case "":
        return RAW_USERS_DATA_30D;
      case "1Y":
      default:
        return RAW_USERS_DATA_1Y;
    }
  }, [sortBy]);

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
        data={chartData}
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
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis width="auto" tick={{ fontSize: 12 }} dataKey={"value"} />
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
