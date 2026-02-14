import {
  useGetPatientVitals,
  useGetPatientsChart,
  useGetPatientsHistory,
} from "@/hooks/institution/usePatients";
import { Icon } from "@iconify/react";
import React, { useMemo, useState } from "react";
import Skeleton from "../common/Skeleton";
import { format } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Select from "../common/Select";
import { useFilter } from "@/hooks/useFilter";
import { useSearchParams } from "next/navigation";
import { sortOptions } from "../superadmin/OverviewChart";

export default function VitalsOverview({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  const { options, handleFilter } = useFilter({
    filterOptions: sortOptions,
    paramKey: "sortBy",
    hasInitial: false,
  });
  const {
    history,
    isLoading: historyLoading,
    fetchNextPage: fetchNextHistory,
    hasNextPage: hasNextHistory,
    isFetchingNextPage: isFetchingNextHistory,
  } = useGetPatientsHistory({
    patient_id: id,
  });
  const { vitals, isLoading } = useGetPatientVitals(id);

  const [selected, setSelected] = useState<string>("heart_rate");

  const { data, isLoading: chartLoading } = useGetPatientsChart({
    patient_id: id,
    period: sortBy || "24H",
    vital_type: selected,
  });

  console.log(data);

  const VitalStats = useMemo(() => {
    return [
      {
        id: "heart_rate",
        title: "Heart Rate",
        value: vitals?.heart_rate ?? "--",
        unit: "bpm",
        icon: "system-uicons:heart-rate",
      },
      {
        id: "oxygen_saturation",
        title: "Oxygen Saturation",
        value: vitals?.oxygen_saturation ?? "--",
        unit: "%",
        icon: "material-symbols-light:oxygen-saturation-outline",
      },
      {
        id: "systolic_bp",
        title: "Systolic BP",
        value: vitals?.systolic_bp ?? "--",
        unit: "mmHg",
        icon: "material-symbols-light:blood-pressure-outline-rounded",
      },
      {
        id: "diastolic_bp",
        title: "Diastolic BP",
        value: vitals?.diastolic_bp ?? "--",
        unit: "mmHg",
        icon: "material-symbols-light:blood-pressure-outline-rounded",
      },
      {
        id: "temperature",
        title: "Temperature",
        value: vitals?.temperature ?? "--",
        unit: "°C",
        icon: "ph:fire",
      },
      {
        id: "respiratory_rate",
        title: "Respiratory Rate",
        value: vitals?.respiratory_rate ?? "--",
        unit: "breaths/min",
        icon: "material-symbols-light:air-outline",
      },
    ];
  }, [vitals]);

  // const chartData = useMemo(() => {
  //   const labels =
  //     sortBy === "24H"
  //       ? [
  //           "00-03",
  //           "03-06",
  //           "06-09",
  //           "09-12",
  //           "12-15",
  //           "15-18",
  //           "18-21",
  //           "21-00",
  //         ]
  //       : sortBy === "7D"
  //         ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  //         : sortBy === "1y"
  //           ? [
  //               "Jan",
  //               "Feb",
  //               "Mar",
  //               "Apr",
  //               "May",
  //               "Jun",
  //               "Jul",
  //               "Aug",
  //               "Sep",
  //               "Oct",
  //               "Nov",
  //               "Dec",
  //             ]
  //           : ["1-5", "6-10", "11-15", "16-20", "21-25", "26-31"];

  //   const getRange = (id: string) => {
  //     switch (id) {
  //       case "heart_rate":
  //         return [60, 100];
  //       case "oxygen_saturation":
  //         return [95, 100];
  //       case "systolic_bp":
  //         return [110, 140];
  //       case "diastolic_bp":
  //         return [70, 90];
  //       case "temperature":
  //         return [36.1, 37.5];
  //       case "respiratory_rate":
  //         return [12, 20];
  //       default:
  //         return [0, 100];
  //     }
  //   };

  //   const [min, max] = getRange(selected);

  //   // Deterministic pseudo-random for dummy data to satisfy React purity rules
  //   const seed = (str: string) => {
  //     let hash = 0;
  //     for (let i = 0; i < str.length; i++) {
  //       hash = (hash << 5) - hash + str.charCodeAt(i);
  //       hash |= 0;
  //     }
  //     return (Math.abs(hash) % 1000) / 1000;
  //   };

  //   return labels.map((label) => {
  //     const random = seed(label + selected + sortBy);
  //     return {
  //       date: label,
  //       value: Math.floor(random * (max - min + 1)) + min,
  //     };
  //   });
  // }, [selected, sortBy]);

  const groupedHistory = useMemo(() => {
    if (!history) return [];

    const vital = VitalStats.find((v) => v.id === selected);

    // Group by date
    const grouped: Record<string, Vitals[]> = {};
    history.forEach((item) => {
      const dateStr = format(new Date(item.recorded_at), "MMM dd, yyyy");
      if (!grouped[dateStr]) grouped[dateStr] = [];
      grouped[dateStr].push(item);
    });

    return Object.entries(grouped).map(([date, items]) => ({
      date,
      items: items.map((item) => {
        const val = item[selected as keyof Vitals];
        return {
          id: item.id,
          title: vital?.title,
          value: val,
          unit: vital?.unit,
          time: format(new Date(item.recorded_at), "hh:mm a"),
          recorded_by: item.recorded_by,
        };
      }),
    }));
  }, [selected, VitalStats, history]);

  console.log(history);

  return (
    <section className="grid max-w-[95%] mx-auto grid-cols-[65%_35%] w-full gap-5">
      <ul className="w-full flex items-center gap-4 justify-between col-span-2">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <li
                key={i}
                className="w-full flex flex-col justify-between p-4 h-30 rounded-3xl bg-[#EEF2FF]"
              >
                <header className="w-full flex-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </header>
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-10" />
              </li>
            ))
          : VitalStats.map((item, id) => {
              const isActiveTab = item.id === selected;

              return (
                <li
                  role="radio"
                  aria-checked={isActiveTab}
                  onClick={() => setSelected(item.id)}
                  key={id}
                  className={`w-full flex flex-col justify-between p-4 cursor-pointer h-30 rounded-3xl ${isActiveTab ? "bg-primary text-white" : "bg-[#EEF2FF]"}`}
                >
                  <header className="w-full flex-between">
                    <p className="font-medium text-xs">{item.title}</p>
                    <span>
                      <Icon icon={item.icon} fontSize={20} />
                    </span>
                  </header>
                  <h4 className="text-2xl font-bold">{item.value}</h4>
                  <p className="text-xs font-medium">{item.unit}</p>
                </li>
              );
            })}
      </ul>
      <section className="w-full flex flex-col gap-3 h-96 bg-white rounded-md">
        <Select
          onChange={(_, v) => handleFilter(v?.value ?? "")}
          data={options}
          defaultValue={sortBy}
          variant="regular"
          type="optimistic"
        />
        {chartLoading ? (
          <Skeleton className="w-full h-full rounded-md" />
        ) : (
          <AreaChart
            data={data}
            style={{
              width: "100%",
              height: "100%",
              marginTop: "auto",
              aspectRatio: 3.4,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 0"
              stroke="#E8E8E8"
              vertical={false}
            />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis width="auto" tick={{ fontSize: 12 }} dataKey={"value"} />
            <Tooltip
              cursor={false}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const vital = VitalStats.find((v) => v.id === selected);
                  return (
                    <div className="bg-white p-3 border border-grey rounded-lg shadow-md text-sm">
                      <p className="font-semibold mb-2">{label}</p>
                      {payload.map(
                        (
                          entry: { stroke: string; value: number },
                          index: number,
                        ) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 mb-1"
                          >
                            <span
                              className="size-2.5 rounded-full"
                              style={{ backgroundColor: entry.stroke }}
                            />
                            <span className="text-secondary">
                              {vital?.title}:
                            </span>
                            <span className="font-medium">
                              {entry.value} {vital?.unit}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              strokeWidth={2}
              stroke="#3A6FF8"
              fill="#3A6FF81A"
            />
          </AreaChart>
        )}
      </section>
      <ul className="w-full flex flex-col gap-6 max-h-96 overflow-y-auto p-4 bg-[#EEF2FF] rounded-md">
        {historyLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="w-full flex flex-col gap-3">
              <div className="flex items-center gap-2 w-full">
                <Skeleton className="h-4 w-20" />
                <div className="h-px bg-primary/20 flex-1" />
              </div>
              <Skeleton className="h-16 w-full rounded-xl" />
            </li>
          ))
        ) : groupedHistory.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No history available
          </p>
        ) : (
          <>
            {groupedHistory.map((group) => (
              <li key={group.date} className="w-full flex flex-col gap-3">
                <div className="flex items-center gap-2 w-full">
                  <span className="text-primary font-medium text-xs whitespace-nowrap">
                    {group.date}
                  </span>
                  <div className="h-px bg-primary/20 flex-1" />
                </div>

                <ul className="flex flex-col gap-2 w-full">
                  {group.items.map((item) => (
                    <li
                      key={item.id}
                      className="w-full p-3 text-[#0A1B39] rounded-xl flex-between bg-white shadow-sm"
                    >
                      <div className="space-y-1 w-[50%]">
                        <p className="font-semibold text-sm">{item.title}</p>
                        <p className="text-[10px] font-medium text-[#646464]">
                          {item.time}
                        </p>
                      </div>
                      <div className="space-y-1 w-[50%] text-right">
                        <p className="font-bold text-sm text-primary">
                          {item.value ?? "--"}{" "}
                          <span className="text-[10px] font-normal text-[#646464]">
                            {item.unit}
                          </span>
                        </p>
                        {/* {item.recorded_by && (
                          <p className="text-[10px] w-full truncate  font-medium text-[#646464]">
                            Recorded by: <span>{item.recorded_by}</span>
                          </p>
                        )} */}
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            {isFetchingNextHistory && (
              <li className="w-full py-2">
                <Skeleton className="h-16 w-full rounded-xl" />
              </li>
            )}
            {!isFetchingNextHistory && hasNextHistory && (
              <li className="w-full flex justify-center py-2">
                <button
                  onClick={() => fetchNextHistory()}
                  className="text-xs text-primary font-medium hover:underline cursor-pointer"
                >
                  Load More
                </button>
              </li>
            )}
          </>
        )}
      </ul>
    </section>
  );
}
