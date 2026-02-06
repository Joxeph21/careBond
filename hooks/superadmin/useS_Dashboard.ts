import { getAdminLogs, getS_Admin_Stats } from "@/services/superadmin.service";
import { useQuery } from "@tanstack/react-query";

export const useS_Dashboard = () => {
  const { data, isLoading, isFetched, refetch, error } = useQuery({
    queryKey: ["superadmin_d_stats"],
    queryFn: getS_Admin_Stats,
  });

  return {
    stats: data,
    isLoading,
    isFetched,
    refetch,
    error,
  };
};

export function useAdminLogs(params?: Paginator) {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["admin-logs", params],
    queryFn: () => getAdminLogs(params),
  });

  const logs = data?.results;
  const total_count = data?.count;

  const nextPage = data?.next;
  const prevPage = data?.previous;

  return {
    logs,
    total_count,
    nextPage,
    isLoading,
    refetch,
    error,
    prevPage,
  };
}
