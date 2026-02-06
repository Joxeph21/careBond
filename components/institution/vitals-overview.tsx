import { Icon } from "@iconify/react";
import React, { useMemo, useState } from "react";

export default function VitalsOverview() {
  const VitalStats = useMemo(() => {
    return [
      {
        id: "",
        title: "Heart Rate",
        value: 0,
        unit: "bpm",
        icon: "system-uicons:heart-rate",
      },
      {
        id: "3",
        title: "Oxygen Saturation",
        value: 0,
        unit: "mmol/L",
        icon: "material-symbols-light:oxygen-saturation-outline",
      },
      {
        id: "4",
        title: "Blood Pressure",
        value: 0,
        unit: "mmHg",
        icon: "material-symbols-light:blood-pressure-outline-rounded",
      },
      {
        id: "5",
        title: "Temperature",
        value: 0,
        unit: "°C",
        icon: "ph:fire",
      },
      {
        id: "5t",
        title: "Temperature",
        value: 0,
        unit: "°C",
        icon: "ph:fire",
      },
      {
        id: "5t4",
        title: "Temperature",
        value: 0,
        unit: "°C",
        icon: "ph:fire",
      },
    ];
  }, []);

  const [selected, setSelected] = useState<string>(VitalStats?.at(0)?.id ?? "");

  return (
    <section className="grid max-w-[95%] mx-auto grid-cols-[65%_35%] w-full gap-5">
      <ul className="w-full flex items-center gap-4 justify-between col-span-2">
        {VitalStats.map((item) => {
          const isActiveTab = item.id === selected;

          return (
            <li
              role="radio"
              aria-checked={isActiveTab}
              onClick={() => setSelected(item.id)}
              key={item.id}
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
      <section className="w-full h-80 bg-blue-400 rounded-md"></section>
      <ul className="w-full flex flex-col gap-3 items-center max-h-80 overflow-y-auto p-4 bg-[#EEF2FF] rounded-md">
        <li className="w-full p-2 text-[#0A1B39] rounded-md flex-between bg-white">
          <div className="space-y-2">
            <p>Bilbuin Totals</p>
            <p className="text-xs font-light text-[#444444]">12 Dec 3035</p>
          </div>
          <div className="space-y-2">
            <p>227, mmlolH</p>
            <p className="text-xs font-light text-[#444444]">High</p>
          </div>
        </li>
      </ul>
    </section>
  );
}
