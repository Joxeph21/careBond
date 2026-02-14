import { getAdminLogs, getS_Admin_Stats } from "@/services/superadmin.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

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
  const queryClient = useQueryClient();
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["admin-logs", params],
    queryFn: () => getAdminLogs(params),
  });

  const logs = data?.results;
  const total_count = data?.count;

  const nextPage = data?.next !== null ? (params?.page || 1) + 1 : null;
  const prevPage = data?.previous !== null ? (params?.page || 1) - 1 : null;

  useEffect(() => {
    if (data?.next !== null) {
      const nextParams = { ...params, page: (params?.page || 1) + 1 };
      queryClient.prefetchQuery({
        queryKey: ["admin-logs", nextParams],
        queryFn: () => getAdminLogs(nextParams),
      });
    }
  }, [data?.next, params, queryClient]);

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
