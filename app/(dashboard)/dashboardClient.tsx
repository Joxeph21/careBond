"use client";
import InstitutionDashboard from "@/components/institution/institutionDashboard";
import SuperadminDashboard from "@/components/superadmin/SuperadminDashboard";
import { useSession } from "@/context/UserContext";

export default function DashboardClient() {
const {isSuperAdmin} = useSession()

  if (isSuperAdmin) return <SuperadminDashboard />;

  return <InstitutionDashboard />;
}
