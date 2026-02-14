import {
  getNotifications,
  markAllAsRead,
  markAsRead,
} from "@/services/notifications.service";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export default function useNotifications(
  params?: Paginator & { institution_id?: string; level?: NotificationLevel },
) {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    error,
  } = useInfiniteQuery({
    queryKey: ["notifications", params],
    queryFn: ({ pageParam = 1 }) =>
      getNotifications({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages, lastPageParam) =>
      lastPage?.next ? lastPageParam + 1 : undefined,
    initialPageParam: 1,
  });

  const { mutateAsync: read } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { is_read: boolean } }) =>
      markAsRead({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      // queryClient.invalidateQueries({ queryKey: ["notifications", variables] });
    },
  });

  const notifications =
    data?.pages.flatMap((page) => page?.results ?? []) ?? [];
  const total_count = data?.pages[0]?.count ?? 0;

  return {
    notifications,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    error,
    total_count,
    read,
  };
}

export function useReadAll(id?: string) {
  const queryClient = useQueryClient();
  const { mutate: readAll, isPending } = useMutation({
    mutationFn: () => markAllAsRead({ institution_id: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return {
    readAll,
    isPending,
  };
}
