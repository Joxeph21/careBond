import Table from "@/ui/Table";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React from "react";

export default function DeviceList({
  device_name,
  device_status,
  handleRowSelect,
  id,
  isSelected,
}: { handleRowSelect: (id: string) => void; isSelected: boolean } & Devices) {
  return (
    <Table.Row isHighlighted={isSelected}>
      <div>
        <input
          type="checkbox"
          className="cursor-pointer"
          name="select-row"
          id="select-row"
          checked={isSelected}
          onChange={() => handleRowSelect(id)}
        />
      </div>
      <div className="flex items-center w-full gap-1">
        <div
          className={`rounded-full flex-center size-10 bg-[#EAF1FF] text-[#0051C3] relative overflow-hidden`}
        >
          <Icon icon={ICON.DEVICES} fontSize={21} />
        </div>
        <div>
          <h4 className="font-medium text-[#101828] capitalize">
            {device_name}
          </h4>
        </div>
      </div>
      <p className="p-1.5 rounded-full w-fit font-medium text-xs bg-[#F5F6F7] text-[#091E42]">
        {id}
      </p>
      <p
        className={`${
          device_status === "failed"
            ? "text-danger"
            : "text-[#42526D] capitalize"
        }`}
      >
        {device_status === "failed"
          ? "Failed to connect"
          : `Device ${device_status}`}
      </p>
      <div></div>
      <button className="cursor-pointer">
        <Icon icon={ICON.MENU} fontSize={21} />
      </button>
    </Table.Row>
  );
}
