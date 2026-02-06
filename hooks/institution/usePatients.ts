import {
  createFamilyMember,
  getPatients,
  assignFamilyMember,
} from "@/services/patient.service";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function usePatients(params?: Paginator) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    error,
  } = useInfiniteQuery({
    queryKey: ["patients", params],
    queryFn: ({ pageParam = 1 }) => getPatients({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage?.next ?? undefined,
    initialPageParam: 1,
  });

  const total_count = data?.pages[0]?.count;
  const patients = data?.pages.flatMap((page) => page?.results ?? []);

  return {
    total_count,
    patients,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    refetch,
  };
}

export function useCreateFamilyMember() {
  const queryClient = useQueryClient();
  const { mutate: create_family, isPending } = useMutation({
    mutationFn: createFamilyMember,
    onSuccess: (_, variables) => {
      toast.success("Family member created successfully");
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
      queryClient.invalidateQueries({
        queryKey: ["I-Users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["I-Users", variables],
      });
    },
    onError: () => {
      toast.error("Failed to create family member");
    },
  });

  return { create_family, isPending };
}

export function useAssignFamilyMember(id: string) {
  const queryClient = useQueryClient();
  const {
    mutate: assign_family,
    mutateAsync: assign_family_async,
    isPending,
  } = useMutation({
    mutationFn: (data: { family_member_id: string }) =>
      assignFamilyMember({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
      queryClient.invalidateQueries({
        queryKey: ["I-Users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["institution-user", id],
      });
    },
    onError: () => {
      toast.error("Failed to assign family member");
    },
  });

  return { assign_family, assign_family_async, isPending };
}
