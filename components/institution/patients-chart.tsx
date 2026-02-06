"use client";
import React from "react";
import Card from "../common/Card";
import { useFilter } from "@/hooks/useFilter";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";
import { useAmChart } from "@/hooks/useAMCharts";
import Skeleton from "../common/Skeleton";

const filters = [
  {
    label: "1D",
    value: "",
  },
  {
    label: "1W",
    value: "week",
  },
  {
    label: "1M",
    value: "month",
  },
  {
    label: "2M",
    value: "2month",
  },
  {
    label: "3M",
    value: "3month",
  },
  {
    label: "1Y",
    value: "year",
  },
];

const chartData = [
  {
    date: new Date(2025, 0, 1).getTime(),
    visits: 450,
    conversions: 120,
    clicks: 1200,
  }, // Jan
  {
    date: new Date(2025, 1, 1).getTime(),
    visits: 620,
    conversions: 150,
    clicks: 1450,
  }, // Feb
  {
    date: new Date(2025, 2, 1).getTime(),
    visits: 580,
    conversions: 140,
    clicks: 1300,
  }, // Mar
  {
    date: new Date(2025, 3, 1).getTime(),
    visits: 700,
    conversions: 200,
    clicks: 1800,
  }, // Apr
  {
    date: new Date(2025, 4, 1).getTime(),
    visits: 850,
    conversions: 210,
    clicks: 2100,
  }, // May
  {
    date: new Date(2025, 5, 1).getTime(),
    visits: 920,
    conversions: 250,
    clicks: 2400,
  }, // Jun
  {
    date: new Date(2025, 6, 1).getTime(),
    visits: 800,
    conversions: 190,
    clicks: 1900,
  }, // Jul
  {
    date: new Date(2025, 7, 1).getTime(),
    visits: 950,
    conversions: 230,
    clicks: 2200,
  }, // Aug
  {
    date: new Date(2025, 8, 1).getTime(),
    visits: 1100,
    conversions: 300,
    clicks: 2800,
  }, // Sep
  {
    date: new Date(2025, 9, 1).getTime(),
    visits: 1050,
    conversions: 280,
    clicks: 2600,
  }, // Oct
  {
    date: new Date(2025, 10, 1).getTime(),
    visits: 1200,
    conversions: 350,
    clicks: 3100,
  }, // Nov
  {
    date: new Date(2025, 11, 1).getTime(),
    visits: 1400,
    conversions: 400,
    clicks: 3500,
  }, // Dec
];

export default function PatientsChart({
  data,
}: {
  data?: Institution_dashboard_response["charts"]["patients_attended"];
}) {
  const { handleFilter, currentFilterValue } = useFilter({
    filterOptions: filters,
    hasInitial: false,
    paramKey: "sortBy",
  });

  useAmChart("patient-chart", "bar", chartData);

  return (
    <Card className="col-span-4 min-h-96">
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
      <Card.Content className="w-full">
        <div id="patient-chart" className="w-full h-80"></div>
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
