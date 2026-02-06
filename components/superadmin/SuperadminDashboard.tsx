"use client";
import DashTitle from "@/components/common/DashTitle";
import StatCard, { type DataProps } from "@/components/common/StatCard";
import BagIcon from "@/components/icons/BagIcon";
import MMRIcon from "@/components/icons/MMRIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import OverviewChart from "@/components/superadmin/OverviewChart";
import RecentPlanTransaction from "@/components/superadmin/RecentPlanTransaction";
import SuperAdminTab from "@/components/superadmin/SuperAdminTab";
import { useS_Dashboard } from "@/hooks/superadmin/useS_Dashboard";
import { useMemo } from "react";

export default function SuperadminDashboard() {
  const { stats, isLoading } = useS_Dashboard();
  const dashboardStats = useMemo(() => {
    const d_stats: DataProps[] = [
      {
        title: "MMR",
        icon: <MMRIcon />,
        type: "currency",
        value: stats?.stats?.mmr ?? 0,
        trend: "positive",
        trendValue: 0,
      },
      {
        title: "Total Users",
        icon: <UsersIcon />,
        type: "number",
        value: stats?.stats?.total_users ?? 0,
        trend: "positive",
        trendValue: 0,
      },
      {
        title: "Active Institutions",
        icon: <BagIcon />,
        type: "number",
        value: stats?.stats?.active_institutions ?? 0,
        trend: "positive",
        trendValue: 0,
      },
    ];

    return d_stats;
  }, [stats]);

  return (
    <div className="flex-between mx-auto relative pl-4 w-full h-full!  gap-3">
      <section className="section-container h-full overflow-y-auto">
        <DashTitle title="Dashboard" />

        <ul className="flex-between w-full pt-8 px-4">
          {dashboardStats.map((el) => (
            <StatCard key={el.title} {...el} isLoading={isLoading} />
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
