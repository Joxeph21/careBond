import { getUsers } from "@/services/superadmin.service";
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

export default function useIUsers(isSuperAdmin: boolean, option?: Paginator) {
  const queryClient = useQueryClient();
  const { data, isLoading, isPlaceholderData, refetch, error } = useQuery({
    queryKey: ["I-Users", option, isSuperAdmin],
    queryFn: () => getUsers(option),
    enabled: !!isSuperAdmin,
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  const nextPage = data?.next;
  const prevPage = data?.previous;

  const nextOptions = useMemo(() => {
    if (!nextPage || !option?.page) return null;

    return {
      ...option,
      page: option?.page + 1,
    };
  }, [option, nextPage]);

  useEffect(() => {
    if (!isPlaceholderData && nextOptions && isSuperAdmin) {
      queryClient.prefetchQuery({
        queryKey: ["I-Users", nextOptions],
        queryFn: () => getUsers(nextOptions),
        staleTime: 5000,
      });
    }
  }, [isPlaceholderData, nextOptions, isSuperAdmin, queryClient]);

  return {
    total_count: data?.count,
    users: data?.results.filter(el => el.role !== "super_admin") ?? [],
    nextPage,
    prevPage,
    isLoading,
    isPlaceholderData,
    error,
    refetch,
  };
}


