import { Pie, PieChart, Tooltip } from "recharts";
import React, { useMemo } from "react";
import Card from "../common/Card";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";
// import Select from "../common/Select";
import { useGetCameras } from "@/hooks/institution/usePatients";
import Skeleton from "../common/Skeleton";
import { useGetConsultationVolume } from "@/hooks/institution/useAnalytics";

export default function PatientsOverview({
  data,
}: {
  data?: Institution_dashboard_response["charts"];
}) {
  const {
    total_count = 0,
    active_cameras_count = 0,
    isLoading,
  } = useGetCameras();

  const chartData = useMemo(
    () => [
      { name: "Active", value: active_cameras_count, fill: "#0E9384" },
      {
        name: "Inactive",
        value: Math.max(0, total_count - active_cameras_count),
        fill: "#3f8ef3",
      },
    ],
    [active_cameras_count, total_count],
  );

  if (isLoading) return <PatientsOverview.Skeleton />;

  return (
    <Card className="max-w-[35%] h-full!">
      <Card.Header>
        <h3 className="font-bold flex items-center gap-2 text-lg text-[#212B36]">
          <span className="flex-center size-7.5 rounded-md bg-[#E7F0FF] text-primary">
            <Icon icon={ICON.INFO} fontSize={21} />
          </span>{" "}
          Overall Information
        </h3>
      </Card.Header>
      <Card.Content className="grid grid-cols-2 gap-5">
        <Card className="flex flex-col gap-2 justify-center items-center min-h-36 bg-[#F9FAFB]">
          <Icon
            icon={"tdesign:user-checked-1"}
            className="text-primary"
            fontSize={28}
          />
          <p className="text-base text-[#646B72]">Conversations</p>
          <p className="text-[#212B36] text-lg font-semibold">
            {data?.overall_info?.conversations ?? 0}
          </p>
        </Card>
        <Card className="flex flex-col gap-2 justify-center items-center min-h-36 bg-[#F9FAFB]">
          <Icon
            icon={"humbleicons:users"}
            fontSize={28}
            className="text-primary"
          />

          <p className="text-base text-[#646B72]">Families</p>
          <p className="text-[#212B36] text-lg font-semibold">
            {data?.overall_info?.families ?? 0}
          </p>
        </Card>
      </Card.Content>

      <Card.Footer className="p-0! border-t border-grey">
        <div className="p-3 flex flex-col gap-3 w-full">
          <Card.Header className="p-0! border-0!">
            <h3 className="font-bold flex items-center gap-2  text-[#212B36]">
              Usage Overview
            </h3>
            {/* <Select
              icon={ICON.CARET_DOWN3}
              variant="regular"
              data={[{ label: "Today", value: "today" }]}
            >
              <Icon icon={ICON.CALENDER} fontSize={18} />
            </Select> */}
          </Card.Header>
          <div className="w-full flex-between">
            <div className="size-28  rounded-full flex-center relative">
              <PieChart
                responsive
                style={{
                  height: "100%",
                  width: "100%",
                  // flex: "1 1 200px",
                  aspectRatio: 1,
                }}
              >
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius="80%"
                  innerRadius="60%"
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border border-grey rounded-lg shadow-md text-sm">
                          {payload.map(
                            (
                              entry: {
                                payload: { fill: string };
                                name: string;
                                value: number;
                              },
                              index: number,
                            ) => (
                              <div
                                key={index}
                                className="flex items-center w-max gap-2 mb-1"
                              >
                                <span
                                  className="size-2.5 rounded-full"
                                  style={{
                                    backgroundColor: entry.payload.fill,
                                  }}
                                />
                                <span className="text-secondary">
                                 {entry.name === "Inactive"
                              ? "All Cameras"
                              : "Active Cameras"}
                            :
                                </span>
                                <span className="font-medium">
                                  {entry.value}
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
              </PieChart>
            </div>
            <ul className="flex-center min-w-[60%] h-24 gap-6">
              <li className="flex flex-col justify-center items-center gap-2">
                <p className="text-[#212B36] text-lg font-bold">
                  {total_count}
                </p>
                <p className="text-primary text-sm font-medium">All Cameras</p>
              </li>
              <div className="w-px h-full bg-[#E6EAED]"></div>
              <li className="flex flex-col justify-center items-center gap-2">
                <p className="text-[#212B36] text-lg font-bold">
                  {active_cameras_count}
                </p>
                <p className="text-[#0E9384] text-sm font-medium">
                  Active Cameras
                </p>
              </li>
            </ul>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
}

PatientsOverview.Skeleton = function PatientsOverviewSkeleton() {
  return (
    <Card className="col-span-2">
      <Card.Header>
        <div className="flex items-center gap-2">
          <Skeleton className="size-7.5 rounded-md" />
          <Skeleton className="h-5 w-32" />
        </div>
      </Card.Header>
      <Card.Content className="grid grid-cols-2 gap-5">
        <Skeleton className="h-30 w-full rounded-md" />
        <Skeleton className="h-30 w-full rounded-md" />
      </Card.Content>

      <Card.Footer className="p-3 border-t border-grey">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="size-20 rounded-full" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-16" />
              <Skeleton className="h-12 w-16" />
            </div>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
};
