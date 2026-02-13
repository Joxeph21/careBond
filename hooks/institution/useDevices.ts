import { getDevices, deleteDevice } from "@/services/devices.service";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function useDevices(params?: Paginator) {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["devices", params],
    queryFn: () => getDevices(params),
  });

  useEffect(() => {
    if (data?.next) {
      const nextPage = (params?.page || 1) + 1;
      queryClient.prefetchQuery({
        queryKey: ["devices", { ...params, page: nextPage }],
        queryFn: () => getDevices({ ...params, page: nextPage }),
      });
    }
  }, [data, params, queryClient]);

  const devices = data?.results;
  const total_count = data?.count;
  const nextPage = data?.next;
  const prevPage = data?.previous;

  return {
    devices,
    isLoading,
    error,
    refetch,
    total_count,
    nextPage,
    prevPage,
  };
}

export function useDeleteDevice() {
  const queryClient = useQueryClient();
  const { mutate: delete_device, isPending } = useMutation({
    mutationFn: (id: string) => deleteDevice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
      toast.success("Device deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete device");
    },
  });

  return { delete_device, isPending };
}
