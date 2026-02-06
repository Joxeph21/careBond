import { getTransactions } from "@/services/transactions.service";
import { useQuery } from "@tanstack/react-query";

export default function useTransactions(param?: Paginator) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["transactions", param],
    queryFn: () => getTransactions(param),
  });

  const total_count = data?.count;
  const transactions = data?.results;

  const nextPage = data?.next;
  const prevPage = data?.previous;

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
