"use client";
import React from "react";
import Card from "../common/Card";
import { useFilter } from "@/hooks/useFilter";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";

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

export default function PatientsChart() {
  const { handleFilter, currentFilterValue } = useFilter({
    filterOptions: filters,
    hasInitial: false,
    paramKey: "sortBy",
  });


  return (
    <Card className="col-span-4">
      <Card.Header>
        <h3 className="font-bold flex items-center gap-2 text-lg text-[#212B36]">
            <span className="flex-center size-6.5 rounded-md bg-[#EEEEEE]">
                <Icon icon={ICON.PATIENT} fontSize={21} />
                </span> Patients attended to</h3>

        <ul className="flex items-center border-r border-grey overflow-hidden bg-[#F9FAFB] rounded-lg">
          {filters.map((el, i) => (
            <li
              key={el.value}
              className={`px-3 py-1.5 ${i < filters.length - 1 && "border-r border-grey"} cursor-pointer ${currentFilterValue === el.value && "bg-primary text-white"}`}
              onClick={() => handleFilter(el.value)}
            >
              {el.label}
            </li>
          ))}
        </ul>
      </Card.Header>
      <Card.Content></Card.Content>
    </Card>
  );
}
