import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { PropsWithChildren } from "react";
import { type Metadata } from "next";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
      <main className="w-full h-screen overflow-hidden flex">
        <div className="w-[250px] h-full shrink-0 border-r border-grey">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <Header />
          <section
            id="dashboard-main"
            className="flex-1 w-full relative bg-[#F8F8F8] overflow-y-auto"
          >
            {children}
          </section>
        </div>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </UserProvider>
  );
}
