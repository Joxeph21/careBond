import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { PropsWithChildren } from "react";
import { type Metadata } from "next";
import { UserProvider } from "@/context/UserContext";
export const metadata: Metadata = {
  title: {
    template: "%s - Carebond",
    default: "Carebond",
  },
  description:
    "Experience a more connected care ecosystem with CareBond. Our platform empowers healthcare professionals with real-time patient health data from IoT devices while keeping families informed and reassured through instant updates and wellness insights. Deliver better care, together",
};

export default function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <UserProvider>

      <main className="w-full h-screen overflow-hidden grid grid-cols-[250px_1fr] grid-rows-[80px_1fr]">
        <Sidebar />
        <Header />
        <section
          id="dashboard-main"
          className="w-full relative h-[calc(100vh-80px)] bg-[#F8F8F8] overflow-y-auto row-span-2"
        >
          {children}
        </section>
      </main>
    </UserProvider>
  );
}
