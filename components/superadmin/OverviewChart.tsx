"use client";
import { useState, useMemo } from "react";
import {
  RAW_INSTITUTIONS_DATA,
  RAW_MMR_DATA,
  RAW_USERS_DATA,
  RawMetricData,
} from "@/utils/dummy";
import Select from "../common/Select";
import { useSearchParams } from "next/navigation";
import { useFilter } from "@/hooks/useFilter";
import { useAmChart } from "@/hooks/useAMCharts";
import { filterMetricsData } from "@/utils/helper-functions";

const chartData: OptionsType<RawMetricData[]>[] = [
  {
    label: "Users",
    value: RAW_USERS_DATA,
  },
  {
    label: "Institutions",
    value: RAW_INSTITUTIONS_DATA,
  },
  {
    label: "MMR",
    value: RAW_MMR_DATA,
  },
];

const sortOptions = [
  {
    label: "Monthly",
    value: "",
  },
  {
    label: "Today",
    value: "today",
  },
  {
    label: "This Week",
    value: "week",
  },
  {
    label: "This Year",
    value: "year",
  },
  {
    label: "All Time",
    value: "allTime",
  },
];

export default function OverviewChart() {
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy");
  const [data, setData] = useState(chartData[0]);

  const { options, handleFilter } = useFilter({
    filterOptions: sortOptions,
    paramKey: "sortBy",
    hasInitial: false,
  });

  const processedData = useMemo(() => {
    if (Array.isArray(data.value)) {
      const filtered = filterMetricsData(data.value, sortBy);

      console.log(filtered)

      return filtered.map((item) => {
        const dateObj = new Date(item.date);

        return {
          ...item,
          name:
            item.name ??
            dateObj.toLocaleDateString("en-US", {
              month: "short",
              day:
                sortBy === "year" || sortBy === "allTime"
                  ? undefined
                  : "numeric",
            }),
        };
      });
    }
    return [];
  }, [data, sortBy]);

  useAmChart("overview-chart", "line", processedData);

  console.log(processedData, Array.isArray(data.value))

  return (
    <section className="w-full py-3 px-4 bg-white rounded-lg min-h-96 ring ring-grey">
      <div className="flex-between w-full">
        <Select
          data={chartData}
          onChange={(_, val) => val && setData(val)}
          variant="themed"
        />
        <Select
          onChange={(_, v) => handleFilter(v?.value ?? "")}
          data={options}
          variant="regular"
        />
      </div>

      <div id="overview-chart" className="w-full aspect-video h-[400px]"></div>
    </section>
  );
}
