import { format, parseISO, formatDistanceToNow } from "date-fns";
import { RawMetricData } from "./dummy";
import { parse } from "psl";
import toast from "react-hot-toast";

export const filterMetricsData = (data: RawMetricData[]): RawMetricData[] => {
  return [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
};

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

// export function formatValue(
//   amount: number,
//   {
//     locale = "en-US",
//     maxDecimals = 2,
//     type = "currency",
//     currency = "USD",
//   }: FormatOptions = {}
// ): string {
//   const factor = Math.pow(10, maxDecimals);
//   const flooredAmount = Math.floor(amount * factor) / factor;

//   const options: Intl.NumberFormatOptions = {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: maxDecimals,
//     useGrouping: true,
//   };

//   if (type === "currency") {
//     options.style = "currency";
//     options.currency = currency;
//   } else {
//     options.style = "decimal";
//   }

//   return new Intl.NumberFormat(locale, options).format(flooredAmount);
// }

export function formatValue(
  amount: number,
  {
    locale = "en-US",
    maxDecimals = 2,
    type = "currency",
    currency = "USD",
  }: FormatOptions = {},
): string {
  if (!Number.isFinite(amount)) return "0";

  const options: Intl.NumberFormatOptions = {
    style: type === "currency" ? "currency" : "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
    useGrouping: true,
    ...(type === "currency" && { currency }),
  };

  return new Intl.NumberFormat(locale, options).format(amount);
}

export const formatDate = (isoString?: string, dateFormat = "M/d/yy") => {
  if (!isoString) return "--";

  const date = parseISO(isoString);
  return format(date, dateFormat);
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

export const getStatusByColor = (hex: string): string => {
  const colorMap: Record<string, string> = {
    "#3F8EF3": "Excellent",
    "#FF8E26": "Good",
    "#14CC26": "Offline",
  };

  return colorMap[hex.toUpperCase()] || "Unknown";
};

export function formatDateTime(isoString: string): string {
  if (!isoString) return "--";
  return format(parseISO(isoString), "yyyy-MM-dd hh:mm a");
}

export function formatFullDateTime(isoString: string): string {
  if (!isoString) return "--";
  try {
    return format(parseISO(isoString), "MMM d, yyyy h:mm:ss a");
  } catch {
    return isoString;
  }
}

export const getRandomHexColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
};

export const capitalize = (str?: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export function getRootDomain(hostname: string) {
  const parsed = parse(hostname);

  if ("error" in parsed) {
    return null;
  }
  return parsed.domain;
}

export function downloadJsonFile<T>(data: T, filename: string = "data.json") {
  const toString = JSON.stringify(data);
  toast.loading("Download should start soon");
  const blob = new Blob([toString], { type: "application/json" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  setTimeout(() => {
    toast.dismiss();
  }, 2000);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const getDeviceDetails = (userAgent: string) => {
  if (!userAgent) return "Unknown Device";

  // 1. Check for common API tools first
  if (userAgent.includes("PostmanRuntime")) {
    const version = userAgent.split("/")[1] || "";
    return `Postman ${version}`.trim();
  }

  // 2. Identify the Operating System
  let os = "Unknown OS";
  if (userAgent.includes("Windows NT 10.0")) os = "Windows 10/11";
  else if (userAgent.includes("Windows NT 6.1")) os = "Windows 7";
  else if (userAgent.includes("Linux")) os = "Linux";
  else if (userAgent.includes("iPhone")) os = "iPhone";
  else if (userAgent.includes("iPad")) os = "iPad";
  else if (userAgent.includes("Macintosh")) os = "macOS";
  else if (userAgent.includes("Android")) os = "Android";

  // 3. Identify the Browser
  let browser = "Unknown Browser";
  if (userAgent.includes("Firefox")) browser = "Firefox";
  else if (userAgent.includes("SamsungBrowser")) browser = "Samsung Browser";
  else if (userAgent.includes("Opera") || userAgent.includes("OPR"))
    browser = "Opera";
  else if (userAgent.includes("Edge") || userAgent.includes("Edg"))
    browser = "Edge";
  else if (userAgent.includes("Chrome")) browser = "Chrome";
  else if (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
    browser = "Safari";

  return `${browser} on ${os}`;
};


export function formatRelativeTime(date: string | Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true, // "5 minutes ago"
  });
}