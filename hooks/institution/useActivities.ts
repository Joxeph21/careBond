import { useQuery } from "@tanstack/react-query";
import { getActivities, getActivityById } from "@/services/activities.service";

export function useGetActivities(params?: Paginator) {
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["activities", params],
    queryFn: () => getActivities(params),
  });

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
    queryFn: async () => {
      const res = await getActivityById(id);
      return res?.data;
    },
    enabled: !!id,
  });

  return { activity: data, isLoading, error, refetch, isRefetching };
}
