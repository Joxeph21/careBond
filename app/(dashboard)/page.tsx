"use client";
import InstitutionDashboard from "@/components/institution/institutionDashboard";
import SuperadminDashboard from "@/components/superadmin/SuperadminDashboard";
import useAdmin from "@/hooks/auth/useAdmin";

export default function Home() {
  const { isSuperAdmin } = useAdmin();

  if (isSuperAdmin) return <SuperadminDashboard />;

  return <InstitutionDashboard />;
}
