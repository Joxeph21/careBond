"use client";
import Table from "@/ui/Table";
import {
  downloadJsonFile,
  formatFullDateTime,
  getRootDomain,
} from "@/utils/helper-functions";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import { Activity, useState } from "react";
import Button from "../common/Button";

export default function EventList({
  timestamp,
  method,
  country,
  ip_address,
  path,
  user_agent,
  asn,
  as_organization,
  id,
}: SecurityEventLog) {
  const [isOpen, setIsOpen] = useState(false);

  const details = {
    "Log ID": id,
    Timestamp: timestamp,
    Method: method,
    Path: path,
    Host: window.location.hostname,
    "IP Address": ip_address,
    Country: country,
    ASN: asn,
    "AS Org": as_organization,
    "User Agent": user_agent,
  };

  return (
    <Table.Row onClick={() => setIsOpen(!isOpen)}>
      <button
        type="button"
        className={`text-[#0051C3] cursor-pointer ease-in transition-all duration-150 ${
          isOpen && "rotate-180"
        }`}
      >
        <Icon icon={ICON.CARET_DOWN} fontSize={20} />
      </button>
      <p
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        className="text-base cursor-pointer text-[#0051C3]"
      >
        {formatFullDateTime(timestamp)}
      </p>
      <p>{method}</p>
      <p>{country}</p>
      <p>{ip_address}</p>
      <p className="truncate">{getRootDomain(window.location.hostname)}</p>
      <Activity mode={isOpen ? "visible" : "hidden"}>
        <section className="w-full flex flex-col gap-3 col-span-6 py-3 px-4">
          <section className="w-full flex flex-col gap-3">
            <div className="w-full flex-between">
              <h2 className="text-[#191919] text-base">Request Details</h2>
              <Button
                config={{
                  className: "ring-0! gap-1! text-primary!",
                  onClick: (e) => {
                    e.stopPropagation();
                    downloadJsonFile(details, `${id}-carebond-event.json`);
                  },
                }}
                size="medium"
                variants="outlined"
                iconPlacement="left"
                icon={ICON.DOWNLOAD2}
              >
                Export event JSON
              </Button>
            </div>

            <ul className="w-full gap-3 grid grid-cols-2">
              {Object.entries(details).map(([label, value]) => (
                <li key={label} className="w-full flex items-start gap-2">
                  <h4 className="text-[#797979] w-[20%] capitalize">{label}</h4>
                  <p className="text-[#191919] w-[80%] wrap-break-word">
                    {label == "host" ? getRootDomain(value as string) : value}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </Activity>
    </Table.Row>
  );
}
