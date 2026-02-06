import { getCloudLogs, getCloudStats } from "@/services/superadmin.service";
import { useQuery } from "@tanstack/react-query";

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
  const {data, isLoading, refetch, error} = useQuery({
    queryFn: () => getCloudLogs(option),
    queryKey: ["cloud-logs", option],
  });

  const total_count = data?.count;
  const logs = data?.results;

  const nextPage = data?.next;
  const prevPage = data?.previous;

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

export function useCloudStats(){
const {data, isLoading, refetch, error} = useQuery({
  queryKey: ["cloud-stats"],
  queryFn: getCloudStats,
})

return {
  data,
  isLoading,
  refetch,
  error,
}
}