import Table from "@/ui/Table";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React from "react";

export default function FamilyList({
  handleRowSelect,
  isSelected,
  name,
  id,
  email,
  role,
}: { handleRowSelect: (id: string) => void; isSelected: boolean } & Family) {
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
          {name
            .split(" ")
            .map((el: string) => el[0])
            .join("")
            .toUpperCase()}
        </div>
        <div>
          <h4 className="font-medium text-[#101828] capitalize">{name}</h4>
          <p className="text-[#6B788E]">@{email}</p>
        </div>
      </div>
      <p className="p-1.5 rounded-full w-fit font-medium text-xs bg-[#F5F6F7] text-[#091E42]">
        {id}
      </p>
      <p className="text-[#42526D] capitalize">{role}</p>
      <div></div>
      <button className="cursor-pointer">
        <Icon icon={ICON.MENU} fontSize={21} />
      </button>
    </Table.Row>
  );
}
