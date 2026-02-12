"use client";
import { Pie, PieChart, Tooltip } from "recharts";
import {
  KFormatter,
  formatDuration,
  getDeviceDetails,
} from "@/utils/helper-functions";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import {
  useGetActivities,
  useGetActivityById,
} from "@/hooks/institution/useActivities";
import { Modal } from "@/ui/Modal";
import usePaginatorParams from "@/hooks/usePaginatorParams";
import Pagination from "../common/Pagination";
import SearchBox from "../common/SearchBox";
import ActivityIndicator from "../common/ActivityIndicator";
import { useGetCameras } from "@/hooks/institution/usePatients";
import useAdmin from "@/hooks/auth/useAdmin";
import { useS_Dashboard } from "@/hooks/superadmin/useS_Dashboard";

export default function SuperAdminTab() {
  const {data: admin} = useAdmin()
  const { activities, isLoading } = useGetActivities();
  const [selected, setSelected] = useState<string | null>(null);
  const { activity, isLoading: activityLoading } = useGetActivityById(
    selected!,
  );
  const {stats: s} = useS_Dashboard()
  const {
    active_cameras_count,
    total_count,
  } = useGetCameras();

  const stats = useMemo(() => {
    return [
      {
        title: "Total Camera",
        value: total_count ?? 0,
        type: "decimal",
      },
      {
        title: "Total Devices",
        value: s?.stats?.total_devices ?? 0,
        type: "decimal",
      },
      {
        title: "Total Plans",
        value: s?.stats?.total_plans ?? 0,
        type: "decimal",
      },
    ];
  }, [total_count, s?.stats]);

  const data = useMemo(() => {
    return [
      {
        name: "Active Cameras",
        value: active_cameras_count ?? 0,
        fill: "#14CC26",
      },
      {
        name: "Inactive Cameras",
        value: (total_count ?? 0) - (active_cameras_count ?? 0),
        fill: "#3F8EF3",
      },
    ];
  }, [active_cameras_count, total_count]);

  const groupedActivities = useMemo(() => {
    if (!activities) return {};
    return activities.reduce(
      (acc, activity) => {
        const date = format(new Date(activity.timestamp), "MMM dd, yyyy");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(activity);
        return acc;
      },
      {} as Record<string, Activity[]>,
    );
  }, [activities]);

  // useAmChart<(typeof data)[0]>("uptime-donut", "donut", data);
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
              src={admin?.profile_image_url || "/profile.png"}
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
      <Modal>
        <section className="bg-[#E6EBF470] col-start relative min-h-96 p-3 w-full rounded-xl">
          <div className="flex-between w-full">
            <h4 className="text-[#333333] font-medium text-lg">
              System Health
            </h4>
          </div>

          <ul className="w-full flex flex-col gap-6 mt-6 pb-20 max-h-[480px] overflow-y-auto scrollbar-hide">
            {Object.entries(groupedActivities).map(([date, items]) => (
              <li key={date} className="w-full flex flex-col gap-4">
                <div className="flex items-center gap-3 w-full">
                  <span className="text-primary font-medium text-sm whitespace-nowrap">
                    {date}
                  </span>
                  <div className="h-px bg-primary flex-1" />
                </div>

                <ul className="flex flex-col gap-1 w-full">
                  {items.map((activity) => (
                    <Modal.Trigger
                      key={activity.id}
                      name="activity-details"
                      onClick={() => setSelected(activity.id)}
                    >
                      <li className="flex cursor-pointer items-start gap-3 w-full border-b border-[#E6EBF4] last:border-0 pb-3 last:pb-0 hover:bg-gray-50/50 transition-colors">
                        <div className="size-2.5 rounded-full bg-[#B4B4B4] mt-1.5 shrink-0" />
                        <div className="flex flex-col flex-1 gap-1">
                          <span className="text-[#646464] text-sm font-medium">
                            {format(new Date(activity.timestamp), "hh:mm a")}
                          </span>
                          <div className="flex flex-col">
                            <h5 className="text-[#1C1C1C] font-semibold text-sm">
                              {activity.user_name}
                            </h5>
                            <p className="text-[#646464] text-xs">
                              {activity.action ?? "Created an account "}
                            </p>
                          </div>
                        </div>
                        <Icon
                          icon={ICON.CARET_RIGHT}
                          className="text-[#B4B4B4] mt-1"
                          fontSize={18}
                        />
                      </li>
                    </Modal.Trigger>
                  ))}
                </ul>
              </li>
            ))}
            {isLoading && (
              <div className="w-full py-10 flex-center">
                <Icon
                  icon={"line-md:loading-twotone-loop"}
                  className="text-primary"
                  fontSize={30}
                />
              </div>
            )}
            {!isLoading && Object.keys(groupedActivities).length === 0 && (
              <div className="w-full py-10 flex-center text-gray text-sm">
                No activities found
              </div>
            )}
          </ul>

          {/* See More Link with Background */}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-linear-to-t from-[#f1f4f9] via-[#f1f4f9] to-transparent pointer-events-none rounded-b-xl" />
          <Modal.Trigger name="see-all">
            <button
              type="button"
              className="text-primary font-medium cursor-pointer absolute left-4 w-[calc(100%-32px)] text-center bottom-3 py-2 z-10"
            >
              See more
            </button>
          </Modal.Trigger>
        </section>

        {/* General Modal to see all */}

        <Modal.Window
          className="w-2xl! min-h-[60vh]"
          noClose
          hasClose
          name="see-all"
          title="System Health"
        >
          <GeneralSeeAllModal setSelected={setSelected} />
        </Modal.Window>

        <Modal.Window
          className="w-xl!"
          noClose
          hasClose
          name="activity-details"
          title={activity?.user_name || "Loading..."}
        >
          {activityLoading && (
            <div className="flex-center text-primary w-full py-14">
              <ActivityIndicator />
            </div>
          )}

          {activity && (
            <div className="flex flex-col w-full gap-6 p-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-[#999999] uppercase font-semibold">
                    User
                  </p>
                  <p className="text-[#1C1C1C] font-medium">
                    {activity.user_name}
                  </p>
                  <p className="text-sm text-[#646464]">
                    {activity.user_email}
                  </p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-xs text-[#999999] uppercase font-semibold">
                    Role
                  </p>
                  <span className="inline-block text-[10px] font-bold text-primary uppercase px-2 py-0.5 bg-[#EEF3FF] rounded border border-[#CBD5FF]">
                    {activity.role.split("_").join(" ")}
                  </span>
                </div>
              </div>

              <div className="h-px bg-[#E6EBF4]" />

              <div className="space-y-2">
                <p className="text-xs text-[#999999] uppercase font-semibold">
                  Action
                </p>
                <p className="text-[#1C1C1C] text-sm leading-relaxed">
                  {activity.action}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-[#999999] uppercase font-semibold">
                    IP Address
                  </p>
                  <p className="text-sm text-[#646464] font-mono">
                    {activity.ip_address}
                  </p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-xs text-[#999999] uppercase font-semibold">
                    Time
                  </p>
                  <p className="text-sm text-[#646464]">
                    {format(
                      new Date(activity.timestamp),
                      "MMM dd, yyyy • hh:mm a",
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-[#999999] uppercase font-semibold">
                  Device Info
                </p>
                <div className="bg-[#F9FAFB] p-3 rounded border border-[#E6EBF4] space-y-2">
                  <p className="text-sm font-medium text-[#1C1C1C]">
                    {getDeviceDetails(activity.user_agent)}
                  </p>
                  <p className="text-[10px] text-[#646464] font-mono break-all line-clamp-2">
                    {activity.user_agent}
                  </p>
                </div>
              </div>

              {activity.details && Object.keys(activity.details).length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs text-[#999999] uppercase font-semibold">
                    Activity Details
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(activity.details).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center p-2.5 bg-[#F9FAFB] rounded border border-[#E6EBF4]"
                      >
                        <span className="text-xs font-medium text-[#646464] capitalize">
                          {key.replace(/_/g, " ")}
                        </span>
                        <span className="text-xs font-semibold text-[#1C1C1C]">
                          {typeof value === "object"
                            ? JSON.stringify(value)
                            : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal.Window>
      </Modal>

      {/* Chart Tab */}
      <footer className="col-start gap-5 w-full min-h-44 items-start!">
        <div className="space-y-1">
          <h4 className="text-lg font-medium text-[#4A4A4A]">Cameras</h4>
          <p className="text-[#999999]">Current usage</p>
        </div>

        {/* Pie chart on the left label on the right */}
        <div className="flex items-center justify-between px-0  w-full pb-5">
          {/* Donut Chart */}
          <div className="relative w-[60%] aspect-square">
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-[#676767]">Total</span>
              <span className="text-base font-medium text-primary">
                {total_count ?? 0}
              </span>
            </div>
            <PieChart
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                aspectRatio: 1,
              }}
              responsive
            >
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                cornerRadius="50%"
                paddingAngle={5}
                dataKey="value"
              />
              <Tooltip />
              {/* <Label position="center"> */}

              {/* </Label> */}
              {/* <Label position="center">{totalDuration}</Label> */}
            </PieChart>
          </div>

          {/* Label */}
          <ul className="flex flex-col w-[35%] gap-3">
            {data.map((item) => (
              <li key={item.name} className="flex items-center gap-2">
                <span
                  className="size-2.5 rounded-sm shrink-0"
                  style={{ backgroundColor: item.fill }}
                />
                <div className="flex flex-col">
                  <span className="text-[#676767] text-xs">{item.name}</span>
                  <span className="text-[#1C1C1C] text-sm font-medium">
                    {item.value}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="size-6"></div>
        </div>
      </footer>
    </aside>
  );
}

// General See-all modal for activities
export function GeneralSeeAllModal({
  setSelected,
  institution_id,
}: {
  setSelected: (id: string) => void;
  institution_id?: string;
}) {
  const { query, page } = usePaginatorParams({
    searchKey: "act-query",
  });
  const { activities, isLoading, total_count, nextPage, prevPage } =
    useGetActivities({ query, page, institution_id });

  return (
    <>
      <section className="w-full h-full flex flex-col gap-6">
        <header className="flex-between w-full">
          <SearchBox
            placeholder="Search activities..."
            searchKey="act-query"
            className="max-w-md!"
          />
        </header>

        <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
          {isLoading ? (
            <div className="w-full py-20 flex-center">
              <Icon
                icon="line-md:loading-twotone-loop"
                className="text-primary"
                fontSize={40}
              />
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {activities?.map((activity) => (
                <Modal.Trigger
                  onClick={() => setSelected(activity.id)}
                  key={activity.id}
                  name="activity-details"
                >
                  <li
                    key={activity.id}
                    className="flex cursor-pointer items-start gap-4 p-4 bg-white rounded-xl border border-[#E6EBF4] shadow-xs hover:border-primary transition-colors"
                  >
                    <div className="size-10 flex-center bg-[#EEF3FF] rounded-full shrink-0">
                      <Icon
                        icon={ICON.PATIENT}
                        className="text-primary"
                        fontSize={20}
                      />
                    </div>
                    <div className="flex flex-col flex-1 gap-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h5 className="text-[#1C1C1C] font-semibold text-base leading-tight">
                          {activity.user_name}
                        </h5>
                        <span className="text-[#999999] text-[11px] font-medium uppercase tracking-wider bg-[#F9FAFB] px-2 py-0.5 rounded border border-[#E6EBF4]">
                          {format(
                            new Date(activity.timestamp),
                            "MMM dd, yyyy • hh:mm a",
                          )}
                        </span>
                      </div>
                      <p className="text-[#646464] text-sm leading-relaxed">
                        {activity.action}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-1.5">
                        <span className="text-[10px] font-bold text-primary uppercase px-2 py-0.5 bg-[#EEF3FF] rounded border border-[#CBD5FF]">
                          {activity.role.split("_").join(" ")}
                        </span>
                        <div className="size-1 bg-[#D1D5DB] rounded-full" />
                        <span className="text-[10px] text-[#646464] font-medium italic">
                          IP: {activity.ip_address}
                        </span>
                      </div>
                    </div>
                  </li>
                </Modal.Trigger>
              ))}
              {!isLoading && activities?.length === 0 && (
                <div className="w-full py-24 flex-center flex-col gap-4 text-gray-400">
                  <Icon
                    icon="line-md:search-off"
                    fontSize={56}
                    className="text-[#D1D5DB]"
                  />
                  <div className="text-center">
                    <h6 className="text-[#4B5563] font-medium text-lg">
                      No activities found
                    </h6>
                    <p className="text-sm">Try adjusting your search terms</p>
                  </div>
                </div>
              )}
            </ul>
          )}
        </div>

        <Pagination
          className="mt-auto border-t border-[#E6EBF4] pt-5"
          totalCount={total_count}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </section>
    </>
  );
}
