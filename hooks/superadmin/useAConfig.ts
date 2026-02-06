import { getAdminConfigurations } from "@/services/superadmin.service";
import { useQuery } from "@tanstack/react-query";

export default function useAdminConfig() {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["admin-config"],
    queryFn: getAdminConfigurations,
  });

  return {
    config: data,
    isLoading,
    refetch,
    error,
  };
}
