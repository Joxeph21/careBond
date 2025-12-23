"use client";
import DashTitle from "@/components/common/DashTitle";
import StatCard, { DataProps } from "@/components/common/StatCard";
import BagIcon from "@/components/icons/BagIcon";
import MMRIcon from "@/components/icons/MMRIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import OverviewChart from "@/components/superadmin/OverviewChart";
import RecentPlanTransaction from "@/components/superadmin/RecentPlanTransaction";
import SuperAdminTab from "@/components/superadmin/SuperAdminTab";

const dashboardStats: DataProps[] = [
  {
    title: "MMR",
    icon: <MMRIcon />,
    type: "currency",
    value: 10000,
    trend: "positive",
    trendValue: 210,
  },
  {
    title: "Total Users",
    icon: <UsersIcon />,
    type: "number",
    value: 1700,
    trend: "positive",
    trendValue: 210,
  },
  {
    title: "Active Institutions",
    icon: <BagIcon />,
    type: "number",
    value: 100,
    trend: "positive",
    trendValue: 210,
  },
];

export default function Home() {
  return (
    <div className="flex-between mx-auto relative pl-4 w-full h-full  gap-3">
      <section className="section-container overflow-y-auto">
        <DashTitle title="Dashboard" />

        <ul className="flex-between w-full pt-8 px-4">
          {dashboardStats.map((el) => (
            <StatCard key={el.title} {...el} />
          ))}
        </ul>

        <section className="col-center w-full gap-8 px-4 pt-8">
          {/* Chart */}

          <OverviewChart />

          {/* Institution Tab */}
        <RecentPlanTransaction />
        </section>
      </section>

      <SuperAdminTab />
    </div>
  );
}
