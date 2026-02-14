import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActivities, getActivityById } from "@/services/activities.service";
import { useEffect } from "react";

export function useGetActivities(
  params?: Paginator & { institution_id?: string },
) {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["activities", params],
    queryFn: () => getActivities(params),
  });

  const nextPage = data?.next !== null ? (params?.page || 1) + 1 : null;
  const prevPage = data?.previous !== null ? (params?.page || 1) - 1 : null;

  useEffect(() => {
    // Prefetch next page
    if (data?.next !== null) {
      const nextParams = { ...params, page: (params?.page || 1) + 1 };
      queryClient.prefetchQuery({
        queryKey: ["activities", nextParams],
        queryFn: () => getActivities(nextParams),
      });
    }

    // Prefetch previous page
    if (data?.previous !== null && (params?.page || 1) > 1) {
      const prevParams = { ...params, page: (params?.page || 1) - 1 };
      queryClient.prefetchQuery({
        queryKey: ["activities", prevParams],
        queryFn: () => getActivities(prevParams),
      });
    }
  }, [data?.next, data?.previous, params, queryClient]);

  const total_count = data?.count;
  const activities = data?.result;

  return {
    total_count,
    activities,
    nextPage,
    prevPage,
    isLoading,
    error,
    refetch,
    isRefetching,
  };
}

export function useGetActivityById(id: string) {
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["activity", id],
    queryFn: () => getActivityById(id),
    enabled: !!id,
  });

  return { activity: data, isLoading, error, refetch, isRefetching };
}
