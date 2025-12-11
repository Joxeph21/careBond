import localFont from "next/font/local";

export const Utendo = localFont({
  src: [
    { path: "../app/fonts/Utendo-Thin.ttf", weight: "100", style: "normal" },
    {
      path: "../app/fonts/Utendo-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    { path: "../app/fonts/Utendo-Light.ttf", weight: "300", style: "normal" },
    { path: "../app/fonts/Utendo-Regular.ttf", weight: "400", style: "normal" },
    { path: "../app/fonts/Utendo-Medium.ttf", weight: "500", style: "normal" },
    {
      path: "../app/fonts/Utendo-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../app/fonts/Utendo-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    { path: "../app/fonts/Utendo-Black.ttf", weight: "900", style: "normal" },
  ],
  display: "swap",
  variable: "--font-utendo",
});
