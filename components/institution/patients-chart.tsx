"use client";
import React, { useMemo } from "react";
import Card from "../common/Card";
import { useFilter } from "@/hooks/useFilter";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";
import Skeleton from "../common/Skeleton";
import { useGetConsultationVolume } from "@/hooks/institution/useAnalytics";
import usePaginatorParams from "@/hooks/usePaginatorParams";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import { KFormatter } from "@/utils/helper-functions";

const filters = [
  {
    label: "1D",
    value: "24H",
  },
  {
    label: "1W",
    value: "7D",
  },
  {
    label: "1M",
    value: "",
  },
  {
    label: "1Y",
    value: "year",
  },
];

export default function PatientsChart({ id }: { id: string }) {
  const { query } = usePaginatorParams({ searchKey: "sortBy" });
  const { consultationVolume, isLoading } = useGetConsultationVolume({
    institution_id: id,
    range: query as "30d" | "24h" | "7d" | "1y",
  });
  const { handleFilter, currentFilterValue } = useFilter({
    filterOptions: filters,
    hasInitial: false,
    paramKey: "sortBy",
  });

  const data = useMemo(() => {
    switch (currentFilterValue) {
      case "24H":
        return [
          { month: "00-03", value: 10, previous_value: 8 },
          { month: "03-06", value: 5, previous_value: 12 },
          { month: "06-09", value: 20, previous_value: 15 },
          { month: "09-12", value: 45, previous_value: 30 },
          { month: "12-15", value: 30, previous_value: 25 },
          { month: "15-18", value: 55, previous_value: 40 },
          { month: "18-21", value: 40, previous_value: 35 },
          { month: "21-00", value: 15, previous_value: 10 },
        ];
      case "7D":
        return [
          { month: "Sun", value: 150, previous_value: 120 },
          { month: "Mon", value: 230, previous_value: 180 },
          { month: "Tue", value: 180, previous_value: 200 },
          { month: "Wed", value: 290, previous_value: 240 },
          { month: "Thu", value: 250, previous_value: 210 },
          { month: "Fri", value: 320, previous_value: 280 },
          { month: "Sat", value: 210, previous_value: 190 },
        ];
      case "year":
        return [
          { month: "Jan", value: 400, previous_value: 240 },
          { month: "Feb", value: 300, previous_value: 139 },
          { month: "Mar", value: 500, previous_value: 980 },
          { month: "Apr", value: 278, previous_value: 390 },
          { month: "May", value: 189, previous_value: 480 },
          { month: "Jun", value: 239, previous_value: 380 },
          { month: "Jul", value: 349, previous_value: 430 },
          { month: "Aug", value: 400, previous_value: 240 },
          { month: "Sep", value: 300, previous_value: 139 },
          { month: "Oct", value: 200, previous_value: 980 },
          { month: "Nov", value: 278, previous_value: 390 },
          { month: "Dec", value: 189, previous_value: 480 },
        ];
      case "":
      default:
        return [
          { month: "1-5", value: 500, previous_value: 450 },
          { month: "6-10", value: 750, previous_value: 600 },
          { month: "11-15", value: 600, previous_value: 700 },
          { month: "16-20", value: 900, previous_value: 800 },
          { month: "21-25", value: 850, previous_value: 750 },
          { month: "26-31", value: 1100, previous_value: 950 },
        ];
    }
  }, [currentFilterValue]);

  return (
    <Card className="max-w-[65%] shrink-0 min-h-96">
      <Card.Header>
        <h3 className="font-bold flex items-center gap-2 text-lg text-[#212B36]">
          <span className="flex-center size-6.5 rounded-md bg-[#EEEEEE]">
            <Icon icon={ICON.PATIENT} fontSize={21} />
          </span>{" "}
          Patients attended to
        </h3>

        <ul className="flex items-center border-r border-grey overflow-hidden bg-[#F9FAFB] rounded-lg">
          {filters.map((el, i) => (
            <li
              key={el.value}
              className={`px-3 py-1.5 ${
                i < filters.length - 1 && "border-r border-grey"
              } cursor-pointer ${
                currentFilterValue === el.value && "bg-primary text-white"
              }`}
              onClick={() => handleFilter(el.value)}
            >
              {el.label}
            </li>
          ))}
        </ul>
      </Card.Header>
      <Card.Content className="w-full p-3!">
        <ul className="w-full flex items-center gap-4">
          <li className="h-20 p-3 w-40 text-[#646B72] flex gap-2 flex-col rounded-lg ring ring-grey">
            <h4 className="flex  items-center gap-1">
              {" "}
              <span className="size-3 rounded-full bg-[#CBD5FF]"></span>Previous
              Period
            </h4>
            <p className="text-[#212B36] font-bold text-xl">
              {KFormatter(
                data.reduce((acc, curr) => acc + curr.previous_value, 0),
              )}
            </p>
          </li>
          <li className="h-20 p-3 w-40 text-[#646B72] flex gap-2 flex-col rounded-lg ring ring-grey">
            <h4 className="flex  items-center gap-1">
              {" "}
              <span className="size-3 rounded-full bg-primary"></span>Current
              Period
            </h4>
            <p className="text-[#212B36] font-bold text-xl">
              {KFormatter(data.reduce((acc, curr) => acc + curr.value, 0))}
            </p>
          </li>
        </ul>
        <BarChart
          style={{
            width: "100%",
            height: "270px",
            aspectRatio: 1.618,
          }}
          responsive
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 1,
          }}
        >
          <Tooltip contentStyle={{ backgroundColor: "#fff" }} cursor={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} interval={0} />
          <YAxis tick={{ fontSize: 12 }} />
          <Bar
            dataKey="value"
            stackId="a"
            radius={[0, 0, 8, 8]}
            fill="#3F8EF3"
            className="cursor-pointer"
          />
          <Bar
            dataKey="previous_value"
            stackId="a"
            radius={[8, 8, 0, 0]}
            fill="#CBD5FF"
            className="cursor-pointer"
          />
        </BarChart>
      </Card.Content>
    </Card>
  );
}

PatientsChart.Skeleton = function PatientsChartSkeleton() {
  return (
    <Card className="col-span-4 overflow-hidden">
      <Card.Header>
        <div className="flex items-center gap-2">
          <Skeleton className="size-6.5 rounded-md" />
          <Skeleton className="h-5 w-40" />
        </div>
        <Skeleton className="h-8 w-48 rounded-lg" />
      </Card.Header>
      <Card.Content className="h-80 px-4 py-2">
        <Skeleton className="w-full h-full rounded-lg" />
      </Card.Content>
    </Card>
  );
};
