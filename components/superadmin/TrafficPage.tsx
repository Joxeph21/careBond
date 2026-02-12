"use client";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import { useMemo } from "react";
import Button from "../common/Button";
import Table from "@/ui/Table";
import Pagination from "../common/Pagination";
import useCloudLogs, { useCloudStats } from "@/hooks/superadmin/useLogs";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatFullDateTime, getRootDomain } from "@/utils/helper-functions";

export default function TrafficPage({ range }: { range: string }) {
  const { data, isLoading } = useCloudStats({ range });
  const {
    logs,
    total_count,
    nextPage,
    prevPage,
    isLoading: loadingLogs,
  } = useCloudLogs();

  const activity_head = useMemo(() => {
    return [
      {
        title: "Total",
        value: data?.total ?? 0,
      },
      {
        title: "Previous",
        value: data?.previous ?? 0,
      },
      {
        title: "Current",
        value: data?.current ?? 0,
      },
    ];
  }, [data]);

  return (
    <section className="section-container flex pb-8 flex-col gap-3">
      {/* <header className="w-full py-4 border-b-2 space-y-1 border-grey">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex focus:outline cursor-pointer text-lg items-center gap-2"
        >
          Suspicious activity
          <span className="rounded-full text-xs flex-center bg-[#F2F2F2] text-[#313131] size-6">
            {suspicious_activity.length}
          </span>
          <Icon
            icon={ICON.CARET_LEFT}
            fontSize={20}
            className={`${
              isOpen ? "rotate-270" : "rotate-180"
            } transition-all ease-in duration-150`}
          />
        </button>
        <Activity mode={isOpen ? "visible" : "hidden"}>
          <div className="w-full flex-center p-3">
            {suspicious_activity.length === 0 && (
              <p className="font-medium text-base">
                No Suspicious activity found
              </p>
            )}
          </div>
        </Activity>
      </header> */}

      {/* Chart */}
      <section className="w-full flex flex-col gap-3">
        <h3 className="text-lg text-[#313131]">Request activity</h3>
        <ul className="w-full grid grid-cols-3 gap-4">
          {activity_head.map((item, index) => (
            <li
              key={index}
              className="flex flex-col gap-1 border-grey border-r"
            >
              <p className="text-sm flex items-center gap-1 text-[#313131]">
                {index > 0 && (
                  <Icon
                    icon={ICON.DOT2}
                    fontSize={20}
                    className={index > 1 ? "text-[#104858]" : "text-[#E46E0A]"}
                  />
                )}
                {item.title}
              </p>
              <p className="text-[#0A0A0A] text-2xl">
                {isLoading ? "--:--" : item.value}
              </p>
            </li>
          ))}
        </ul>
        <div className="w-full h-96">
          <LineChart
            style={{
              width: "100%",

              height: "100%",

              aspectRatio: 1.618,
            }}
            responsive
            data={data?.graph}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 0"
              stroke="#E8E8E8"
              vertical={false}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff" }}
              cursor={false}
            />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} interval={0} />
            <YAxis tick={{ fontSize: 12 }} />
            <Line
              type="linear"
              dataKey="previous_value"
              name="Previous"
              stroke="#E46E0A"
            />
            <Line
              type="linear"
              dataKey="value"
              name="Current"
              stroke="#104858"
            />
          </LineChart>
        </div>
      </section>

      {/* Table */}
      <section className="w-full flex flex-col gap-5">
        <header className="w-full flex-between">
          <h3 className="text-lg text-[#313131]">Sampled logs</h3>

          <Button
            config={{
              className: "text-primary! ring-primary!",
            }}
            size="small"
            variants="outlined"
            icon={ICON.MENU2}
          />
        </header>

        <Table columns="1fr 1fr 1fr 1fr">
          <Table.Header>
            <p className="flex items-center gap-2">
              Time{" "}
              <span className="cursor-pointer">
                <Icon icon={ICON.QUESTION} />
              </span>
            </p>
            <p className="flex items-center gap-2">
              Source IP
              <span className="cursor-pointer">
                <Icon icon={ICON.QUESTION} />
              </span>
            </p>
            <p className="flex items-center gap-2">
              Host
              <span className="cursor-pointer">
                <Icon icon={ICON.QUESTION} />
              </span>
            </p>
            <p className="flex items-center gap-2">
              Path
              <span className="cursor-pointer">
                <Icon icon={ICON.QUESTION} />
              </span>
            </p>
          </Table.Header>

          <Table.Body
            isLoading={loadingLogs}
            data={logs ?? []}
            render={(log, i) => (
              <Table.Row key={i}>
                <p className="text-[#0051C3]">
                  {formatFullDateTime(log.timestamp)}
                </p>
                <p>{log.ip_address}</p>
                <p>{getRootDomain(window.location.hostname)}</p>
                <p className="text-truncate">{log.path}</p>
              </Table.Row>
            )}
          />

          <Table.Footer>
            <Pagination
              totalCount={total_count}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </Table.Footer>
        </Table>
      </section>
    </section>
  );
}
