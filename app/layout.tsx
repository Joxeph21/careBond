import type { Metadata } from "next";
import "./globals.css";
import { Utendo } from "./fonts";
import { Outfit } from "next/font/google";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

const outfit = Outfit({
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Carebond | Advanced Healthcare Management System",
  description:
    "Efficiently manage healthcare institutions, patients, and staff with Carebond's comprehensive management platform.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`text-pretty ${Utendo.variable} ${outfit.variable} antialiased`}
      >
        <NextTopLoader color="#3f8ef3" showSpinner={false} />
        <QueryProvider>
          {children}
          <Toaster
            gutter={12}
            containerStyle={{ margin: "2px" }}
            toastOptions={{
              success: {
                duration: 3000,
                style: {
                  background: "#4caf50",
                  color: "white",
                },
              },
              error: {
                duration: 5000,
                style: {
                  background: "#ef4444",
                  color: "white",
                },
              },
              style: {
                fontSize: "12px",
                maxWidth: "500px",
                padding: "16px 24px",
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
