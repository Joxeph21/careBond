import { EditPlan, createPlan, getPlans } from "@/services/superadmin.service";
import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useGetPlans(params?: Paginator) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    error,
    isFetched,
  } = useInfiniteQuery({
    queryKey: ["plans", params],
    queryFn: ({ pageParam = 1 }) =>
      getPlans({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage, allPages, lastPageParam) =>
      lastPage?.next ? (lastPageParam as number) + 1 : undefined,
    initialPageParam: 1,
  });

  const plans = data?.pages.flatMap((page) => page?.results ?? []) ?? [];
  const total_count = data?.pages[0]?.count ?? 0;

  return {
    total_count,
    plans,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    refetch,
    isFetched,
  };
}

export function useCreatePlan() {
  const queryClient = useQueryClient();
  const { mutate: create, isPending } = useMutation({
    mutationFn: createPlan,
    onSuccess: () => {
      toast.success("Subscription plan created successfully");
      queryClient.refetchQueries({ queryKey: ["plans"] });
    },
    onError: (err) => {
      toast.error(err?.message ?? "Failed to create subscription plan");
    },
  });
  return {
    create,
    isPending,
  };
}

export function useEditPlan(id: string) {
  const queryClient = useQueryClient();
  const { mutate: edit, isPending } = useMutation({
    mutationFn: (data: EditPlan) => EditPlan(id, data),
    onSuccess: () => {
      toast.success("Subscription plan edited successfully");
      queryClient.refetchQueries({ queryKey: ["plans"] });
    },
    onError: (err) => {
      toast.error(err?.message ?? "Failed to edit subscription plan");
    },
  });
  return {
    edit,
    isPending,
  };
}
