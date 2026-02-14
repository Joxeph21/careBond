import { getTransactions } from "@/services/transactions.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useTransactions(param?: Paginator) {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["transactions", param],
    queryFn: () => getTransactions(param),
  });

  const total_count = data?.count;
  const transactions = data?.results;

  const nextPage = data?.next !== null ? (param?.page || 1) + 1 : null;
  const prevPage = data?.previous !== null ? (param?.page || 1) - 1 : null;

  useEffect(() => {
    if (data?.next !== null) {
      const nextParams = { ...param, page: (param?.page || 1) + 1 };
      queryClient.prefetchQuery({
        queryKey: ["transactions", nextParams],
        queryFn: () => getTransactions(nextParams),
      });
    }
  }, [data?.next, param, queryClient]);

  return {
    total_count,
    transactions,
    nextPage,
    prevPage,
    isLoading,
    error,
    refetch,
  };
}
