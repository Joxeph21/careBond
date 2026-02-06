import React from "react";
import Card from "../common/Card";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";
import Select from "../common/Select";


export default function PatientsOverview({
  data,
}: {
  data?: Institution_dashboard_response["charts"];
}) {



  return (
    <Card className="col-span-2">
      <Card.Header>
        <h3 className="font-bold flex items-center gap-2 text-lg text-[#212B36]">
          <span className="flex-center size-7.5 rounded-md bg-[#E7F0FF] text-primary">
            <Icon icon={ICON.INFO} fontSize={21} />
          </span>{" "}
          Overall Information
        </h3>
      </Card.Header>
      <Card.Content className="grid grid-cols-2 gap-5">
        <Card className="flex flex-col gap-2 justify-center items-center min-h-30 bg-[#F9FAFB]">
          <Icon
            icon={"tdesign:user-checked-1"}
            className="text-primary"
            fontSize={28}
          />
          <p className="text-xs text-[#646B72]">Conversations</p>
          <p className="text-[#212B36] text-base font-semibold">
            {data?.overall_info?.conversations ?? 0}
          </p>
        </Card>
        <Card className="flex flex-col gap-2 justify-center items-center min-h-30 bg-[#F9FAFB]">
          <Icon
            icon={"humbleicons:users"}
            fontSize={28}
            className="text-primary"
          />

          <p className="text-xs text-[#646B72]">Families</p>
          <p className="text-[#212B36] text-base font-semibold">
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
            <Select
              icon={ICON.CARET_DOWN3}
              variant="regular"
              data={[{ label: "Today", value: "today" }]}
            >
              <Icon icon={ICON.CALENDER} fontSize={18} />
            </Select>
          </Card.Header>
          <div className="w-full flex-between">
            <div className="size-25"></div>
            <ul className="flex-center min-w-[60%] h-24 gap-6">
              <li className="flex flex-col justify-center items-center gap-2">
                <p className="text-[#212B36] text-lg font-bold">55</p>
                <p className="text-primary">First Time</p>
                               <span className="p-1 rounded-md bg-[#3EB780] text-[10px] text-white">23%</span>

              </li>
              <div className="w-px h-full bg-[#E6EAED]"></div>
              <li className="flex flex-col justify-center items-center gap-2">
                <p className="text-[#212B36] text-lg font-bold">55</p>
                <p className="text-[#0E9384]">Return</p>
                <span className="p-1 rounded-md bg-[#3EB780] text-[10px] text-white">23%</span>
              </li>
            </ul>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
}
