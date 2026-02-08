import { useQuery } from "@tanstack/react-query";
import {
  getConsultationVolume,
  getUserGrowth,
  AnalyticsParams,
} from "@/services/analytics.service";

export function useGetConsultationVolume(params: AnalyticsParams) {
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["consultation-volume", params],
    queryFn: () => getConsultationVolume(params),
    enabled: !!params.institution_id,
    staleTime: 1000 * 30,
  });

  return { consultationVolume: data, isLoading, error, refetch, isRefetching };
}

export function useGetUserGrowth(params: AnalyticsParams) {
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["user-growth", params],
    queryFn: () => getUserGrowth(params),
    enabled: !!params.institution_id,
    staleTime: 1000 * 30,
  });

  return { userGrowth: data, isLoading, error, refetch, isRefetching };
}
