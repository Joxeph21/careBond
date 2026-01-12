import InstitutionSettings from "@/components/institution/institution-settings";
import SuperAdminSettings from "@/components/superadmin/SuperadminSettings";
import useAdmin from "@/hooks/auth/useAdmin";

export default function Page() {
  const { isSuperAdmin } = useAdmin();

  if (isSuperAdmin) return <SuperAdminSettings />;

  return <InstitutionSettings />;
}
