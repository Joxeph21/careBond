"use client";
import InstitutionCard from "@/components/institution/Institution-card";
import InstitutionPlanBanner from "@/components/institution/InstitutionPlanBanner";
import Activities from "@/components/institution/activities";
import AlertBox from "@/components/institution/alert-box";
import PatientsChart from "@/components/institution/patients-chart";
import PatientsOverview from "@/components/institution/patients-overview";
import UsersTable from "@/components/institution/users-table";
import { useSession } from "@/context/UserContext";
import { useGetActivities } from "@/hooks/institution/useActivities";
import { useGetIUsers } from "@/hooks/institution/useInstitutionsUsers";
import { useGetInstitutionDashboard } from "@/hooks/superadmin/useInstitutions";
import { ICON } from "@/utils/icon-exports";
import React, { useMemo } from "react";

export default function InstitutionDashboard({
  id,
  data,
}: {
  id?: string;
  data?: IUser | Institution;
}) {
  const { user } = useSession();
  const inst_id = id ?? user?.institution_id ?? ""; // Ensure inst_id is always a string
  const {
    users,
    isLoading: isPending,
    total_count,
    prevPage,
    nextPage,
  } = useGetIUsers(inst_id);
  const name = user?.full_name?.split(" ")?.[0] ?? "";

  const {} = useGetActivities();

  const {
    stats: dashboardStats,
    charts,
    isLoading,
    activities,
  } = useGetInstitutionDashboard();

  const stats = useMemo(() => {
    const stats: InstitutionStats[] = [
      {
        type: "total_patients",
        trend: "postive",
        trendValue: 99,
        value: dashboardStats?.total_patients ?? 0,
        icon: ICON.USERS,
      },
      {
        type: "active_professionals",
        trend: "postive",
        trendValue: 20,
        value: dashboardStats?.active_professionals ?? 0,
        icon: ICON.PROMPT,
      },
      {
        type: "pending_alerts",
        trend: "negative",
        trendValue: 22,
        value: dashboardStats?.pending_alerts ?? 0,
        icon: ICON.ALERT,
      },
      {
        type: "connected_devices",
        trend: "neutral",
        trendValue: 20,
        value: dashboardStats?.connected_devices ?? 0,
        icon: ICON.DEVICE,
      },
    ];

    return stats;
  }, [dashboardStats]);

  return (
    <section className="w-full px-6 bg-white py-5 gap-5 pb-5  section-container">
      <div className="w-full flex-between">
        <h3 className="text-[#212B36] font-bold capitalize text-2xl">
          Welcome, {name}
        </h3>
      </div>
      {/* <InstitutionPlanBanner  /> */}
      <ul className="w-full flex-wrap flex-between">
        {isLoading
          ? [1, 2, 3, 4].map((i) => <InstitutionCard.Skeleton key={i} />)
          : stats.map((el) => <InstitutionCard key={el.type} {...el} />)}
      </ul>
      <section className="grid w-full  grid-cols-6 gap-5.5">
        {isLoading ? (
          <>
            <PatientsChart.Skeleton />
            <PatientsOverview.Skeleton />
            <Activities.Skeleton />
            <AlertBox.Skeleton />
          </>
        ) : (
          <>
            <section className="w-full flex items-center gap-5 col-span-6">
              <PatientsChart id={id ?? user?.institution_id ?? ""} />
              <PatientsOverview data={charts} />
            </section>
            <Activities />
            <AlertBox />
          </>
        )}
      </section>

      <UsersTable
        users={users ?? []}
        isLoading={isPending}
        total_count={total_count ?? 0}
        nextPage={nextPage}
        prevPage={prevPage}
        institution_id={(id ?? user?.institution_id) || undefined}
      />
    </section>
  );
}
