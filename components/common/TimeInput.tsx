"use client";
import React from "react";
import { Clock } from "@gravity-ui/icons";
import { CalendarDateTime } from "@internationalized/date";
import { DateInputGroup, TimeField } from "@heroui/react";
type props = {
  value?: CalendarDateTime | null;
  label?: string;
  onChange?: (val: CalendarDateTime | null) => void;
  isInvalid?: boolean;
  errorMessage?: string;
};

export default function TimeInput({
  value,
  label,
  onChange,
  isInvalid,
  errorMessage,
}: props) {
  return (
    <li className="w-full flex flex-col gap-2">
      {label && (
        <h3 className="pb-2 text-[#353B45] border-b border-primary">{label}</h3>
      )}
      <TimeField
        className="w-full"
        value={value}
        name="time"
        isInvalid={isInvalid}
        onChange={(val) => onChange?.(val)}
      >
        <DateInputGroup
          className={`w-full ring rounded-lg
          ${
            isInvalid ? "ring-danger" : "ring-primary focus-within:ring-primary"
          }
          `}
        >
          <DateInputGroup.Prefix>
            <Clock className="size-4 text-muted" />
          </DateInputGroup.Prefix>
          <DateInputGroup.Input className={"w-full"}>
            {(segment) => (
              <DateInputGroup.Segment
                className="focus:bg-primary/20 focus:text-primary"
                segment={segment}
              />
            )}
          </DateInputGroup.Input>
        </DateInputGroup>
      </TimeField>
      {isInvalid && (
        <p className="font-medium text-xs text-danger">{errorMessage}</p>
      )}
    </li>
  );
}
