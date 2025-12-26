import { formatValue } from "@/utils/helper-functions";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";

export default function InstitutionCard({
  icon,
  trend,
  trendValue,
  value,
  type,
}: InstitutionStats) {
  const getStatusColor = () => {
    switch (type) {
      case "total_patients":
        return {
          bgColor: "bg-primary",
          iconColor: "#3f8ef3",
        };
      case "active_professionals":
        return {
          bgColor: "bg-[#092C4C]",
          iconColor: "#092C4C",
        };
      case "pending_alerts":
        return {
          bgColor: "bg-[#8C4D16]",
          iconColor: "#8C4D16",
        };
      case "connected_devices":
        return {
          bgColor: "bg-[#0E9384]",
          iconColor: "#0E9384",
        };
    }
  };

  return (
    <li
      className={`w-66.5 text-white rounded-[6px] p-5 flex items-center gap-2 ${
        getStatusColor().bgColor
      }`}
    >
      <span className="size-11.5 rounded-md bg-white  flex-center">
        <Icon fontSize={26} icon={icon} color={getStatusColor().iconColor} />
      </span>
      <div className="space-y-1">
        <h3 className="capitalize">{type.split("_").join(" ")}</h3>
        <div className="flex items-center gap-3">
          <p className="text-lg font-medium">{formatValue(value, {type: "number"})}</p>
          <span
            className={`text-[10px] flex-center gap-1 bg-white py-1 px-1.5 rounded-sm ${
              trend === "postive"
                ? "text-[#3EB780]"
                : trend === "negative"
                ? "text-danger"
                : "text-dark"
            }`}
          >
            <Icon
              icon={
                trend === "postive"
                  ? ICON.ARROW_UP
                  : trend === "negative"
                  ? ICON.ARROW_DOWN
                  : ICON.ARROW_NEUTRAL
              }
            />
            <span className="font-medium">
              {trend === "postive" ? "+" : trend === "negative" ? "-" : "~"}
              {trendValue}%
            </span>
          </span>
        </div>
      </div>
    </li>
  );
}
