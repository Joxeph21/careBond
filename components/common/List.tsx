import { formatDateTime } from "@/utils/helper-functions";
import { Icon } from "@iconify/react";
import React from "react";

export function ActivityList({ activity, createdAt, title }: Activity) {
  return (
    <li className="w-full ring-1 flex  gap-3 ring-[#0059FF40] rounded-lg py-5 px-2">
      <span className="rounded-full relative mt-1 size-9 bg-primary flex-center text-white">
        <Icon icon={"si:info-fill"} fontSize={20} />
      </span>
      <div className="flex flex-col gap-3">
        <div>
          <h4 className="text-base text-[#474747] font-bold">{title}</h4>
          <p className="text-[#646B72] text-xs">{formatDateTime(createdAt)}</p>
        </div>
        <p className="text-[#191919]">{activity}</p>
      </div>
    </li>
  );
}

export function AlertList({ createdAt, description, title, type }: Alert) {
  const renderIconStyle = () => {
    switch (type) {
      case "warning":
        return "text-[#E04F16] bg-[#FE9F4359]";
      case "error":
        return "text-[#FF0000] bg-[#D9343475]";
      case "success":
        return "text-[#08A960] bg-[#34D98775]";
      default:
        return "text-[#08A960] bg-[#34D98775]";
    }
  };

  return (
    <li className="w-full ring-1 flex  relative gap-3 ring-[#FFC70040] rounded-lg py-5 px-2">
      <span className={`rounded-full relative mt-1 size-9  flex-center ${renderIconStyle()}`}>
        <Icon icon={type === "success" ? "tabler:check" : "si:warning-fill"} fontSize={20} />
      </span>
      <div className="flex flex-col gap-3">
        <div>
          <h4 className="text-base text-[#474747] font-bold">{title}</h4>
          <p className="text-[#646B72] text-xs">{formatDateTime(createdAt)}</p>
        </div>
        <p className="text-[#191919]">{description}</p>
      </div>
    </li>
  );
}
