import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActivities, getActivityById } from "@/services/activities.service";
import { useEffect } from "react";

export function useGetActivities(params?: Paginator & {institution_id?: string}) {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["activities", params],
    queryFn: () => getActivities(params),
  });

  useEffect(() => {
    // Prefetch next page
    if (data?.next) {
      const nextParams = { ...params, page: data.next };
      queryClient.prefetchQuery({
        queryKey: ["activities", nextParams],
        queryFn: () => getActivities(nextParams),
      });
    }

    // Prefetch previous page
    if (data?.previous) {
      const prevParams = { ...params, page: data.previous };
      queryClient.prefetchQuery({
        queryKey: ["activities", prevParams],
        queryFn: () => getActivities(prevParams),
      });
    }
  }, [data?.next, data?.previous, params, queryClient]);

  const total_count = data?.count;
  const activities = data?.result;

  const nextPage = data?.next;
  const prevPage = data?.previous;

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
