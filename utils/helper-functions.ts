import { format, parseISO } from "date-fns";

export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} Secs`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} Min`;
  }

  const hours = Math.floor(minutes / 60);
  return `${hours} Hrs`;
}

export function KFormatter(value: number): string {
  if (value < 1000) {
    return value.toString();
  }

  const kValue = value / 1000;

  const floored = Math.floor(kValue * 10) / 10;

  return `${floored % 1 === 0 ? Math.floor(floored) : floored}K`;
}

type FormatOptions = {
  locale?: string;
  maxDecimals?: number;
  type?: "currency" | "number";
  currency?: string;
};

export function formatValue(
  amount: number,
  {
    locale = "en-US",
    maxDecimals = 2,
    type = "currency",
    currency = "USD",
  }: FormatOptions = {}
): string {
  const factor = Math.pow(10, maxDecimals);
  const flooredAmount = Math.floor(amount * factor) / factor;

  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  };

  if (type === "currency") {
    options.style = "currency";
    options.currency = currency;
  } else {
    options.style = "decimal";
  }

  return new Intl.NumberFormat(locale, options).format(flooredAmount);
}

export const formatDate = (isoString?: string) => {
  if (!isoString) return "--";

  const date = parseISO(isoString);
  return format(date, "M/d/yy");
};

export const formatTime24h = (isoString: string) => {
  if (!isoString) return "--:--";

  try {
    const date = parseISO(isoString);
    return format(date, "HH:mm");
  } catch (error) {
    console.error("Invalid date passed to formatTime24h", error);
    return "--:--";
  }
};

export const getStatusStyle = (status: STATUS_TYPE) => {
  switch (status.toLowerCase()) {
    case "active":
      return "text-[#409261] bg-[#E9FFEF]";
    case "inactive":
      return "text-[#D98634] bg-[#FFF2DD]";
    case "closed":
      return "text-[#474747] bg-[#E4E4E4]";
    case "suspended":
      return "text-[#D93434] bg-[#FFDDDD]";
    case "reopened":
      return "text-[#D93434] bg-[#FFDDDD]";
    default:
      return "text-blue-500";
  }
};
