"use client";
import InstitutionDashboard from "@/components/institution/institutionDashboard";
import SuperadminDashboard from "@/components/superadmin/SuperadminDashboard";
import { useSession } from "@/context/UserContext";

export default function DashboardClient() {
const {isSuperAdmin, user} = useSession()

  if (isSuperAdmin) return <SuperadminDashboard />;

  return <InstitutionDashboard data={user} id={user?.institution_id || ""} />;
}
