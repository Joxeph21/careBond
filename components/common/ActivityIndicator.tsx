import React from "react";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";

type IndicatorProps = {
  className?: string;
  size?: number;
};

export default function ActivityIndicator({className, size= 40}: IndicatorProps) {
  return <Icon icon={ICON.SPINNER} className={`animate-spin ${className}`} fontSize={size} />
}
