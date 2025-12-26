import InstitutionCard from "@/components/institution/Institution-card";
import InstitutionPlanBanner from "@/components/institution/InstitutionPlanBanner";
import Activities from "@/components/institution/activities";
import AlertBox from "@/components/institution/alert-box";
import PatientsChart from "@/components/institution/patients-chart";
import PatientsOverview from "@/components/institution/patients-overview";
import UsersTable from "@/components/institution/users-table";
import { ICON } from "@/utils/icon-exports";
import React from "react";

const stats: InstitutionStats[] = [
  {
    type: "total_patients",
    trend: "postive",
    trendValue: 99,
    value: 1092840,
    icon: ICON.USERS,
  },
  {
    type: "active_professionals",
    trend: "postive",
    trendValue: 20,
    value: 34200,
    icon: ICON.PROMPT,
  },
  {
    type: "pending_alerts",
    trend: "negative",
    trendValue: 22,
    value: 10000,
    icon: ICON.ALERT,
  },
  {
    type: "connected_devices",
    trend: "neutral",
    trendValue: 20,
    value: 10,
    icon: ICON.GIFT,
  },
];

export default function Page() {
  return (
    <section className="w-full px-6 py-5 gap-5 pb-5  section-container">
      <div className="w-full flex-between">
        <h3 className="text-[#212B36] font-bold text-2xl">Welcome, Admin</h3>
      </div>
      <InstitutionPlanBanner />
      <ul className="w-full flex-wrap flex-between">
        {stats.map((el) => (
          <InstitutionCard key={el.type} {...el} />
        ))}
      </ul>
      <section className="grid w-full   grid-cols-6 gap-5.5">
        <PatientsChart />
        <PatientsOverview />
        <Activities />
        <AlertBox />
      </section>

      <UsersTable />
    </section>
  );
}
