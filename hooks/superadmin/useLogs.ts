import { getCloudLogs, getCloudStats } from "@/services/superadmin.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useCloudLogs(
  option?: Paginator &
    Partial<{
      country: string;
      ip_address: string;
      host: string;
      method: string;
      ordering: string;
    }>,
) {
  const queryClient = useQueryClient();
  const { data, isLoading, refetch, error } = useQuery({
    queryFn: () => getCloudLogs(option),
    queryKey: ["cloud-logs", option],
  });

  const total_count = data?.count;
  const logs = data?.results;

  const nextPage = data?.next !== null ? (option?.page || 1) + 1 : null;
  const prevPage = data?.previous !== null ? (option?.page || 1) - 1 : null;

  useEffect(() => {
    if (data?.next !== null) {
      const nextParams = { ...option, page: (option?.page || 1) + 1 };
      queryClient.prefetchQuery({
        queryKey: ["cloud-logs", nextParams],
        queryFn: () => getCloudLogs(nextParams),
      });
    }
  }, [data?.next, option, queryClient]);

  return {
    logs,
    total_count,
    nextPage,
    prevPage,
    isLoading,
    refetch,
    error,
  };
}

export function useCloudStats(params?: { range?: string }) {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["cloud-stats", params],
    queryFn: () => getCloudStats(params),
  });

  return {
    data,
    isLoading,
    refetch,
    error,
  };
}
