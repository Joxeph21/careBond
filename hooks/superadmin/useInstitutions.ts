import {
  createInstitution,
  createInstitutionAdmin,
  deleteInstitution,
  editInstitution,
  getInstitutionDashboard,
} from "@/services/superadmin.service";
import { getS_Admin_Institutions } from "@/services/superadmin.service";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useInfiniteQueryGetInstitutions(query?: string) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["institutions-infinite", query],
    queryFn: ({ pageParam = 1 }) =>
      getS_Admin_Institutions({ query, page: pageParam as number }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.next) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const institutions = data?.pages.flatMap((page) => page?.result ?? []) ?? [];
  const total_count = data?.pages[0]?.count ?? 0;

  return {
    institutions,
    total_count,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    refetch,
  };
}

export function useGetInstitutions(params?: Paginator) {
  const { data, isLoading, error, refetch, isRefetching, isFetched } = useQuery(
    {
      queryKey: ["institutions", params],
      queryFn: () => getS_Admin_Institutions(params),
    },
  );

  const total_count = data?.count;
  const institutions = data?.result;

  const nextPage = data?.next;
  const prevPage = data?.previous;

  return {
    total_count,
    institutions,
    nextPage,
    prevPage,
    isLoading,
    error,
    refetch,
    isRefetching,
    isFetched,
  };
}

export function useGetInstitutionDashboard() {
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["institution-dashboard"],
    queryFn: getInstitutionDashboard,
  });

  const charts = data?.charts;
  const activities = data?.recent_activities;
  const stats = data?.stats;

  return {
    charts,
    activities,
    stats,
    isLoading,
    error,
    refetch,
    isRefetching,
  };
}

export function useCreateInstitution() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending,
    error,
  } = useMutation({
    mutationFn: createInstitution,
    onSuccess: () => {
      toast.success("Institution created successfully");
      queryClient.invalidateQueries({
        queryKey: ["institutions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["institution-dashboard"],
      });
    },
    onError: () => {
      toast.error("Failed to create institution");
    },
  });
  return {
    create,
    isPending,
    error,
  };
}

export function useDeleteInstitution() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteInst,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteInstitution,
    onSuccess: (_, id) => {
      toast.success("Institution deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["institutions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["institution-dashboard"],
      });
      queryClient.invalidateQueries({
        queryKey: ["institution", id],
      });
    },
    onError: () => {
      toast.error("Failed to delete institution");
    },
  });
  return {
    deleteInst,
    isPending,
    error,
  };
}

export function useEditInstitution(type?: "suspend" | "edit" | "activate") {
  const queryClient = useQueryClient();
  const {
    mutate: edit,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Institution> }) =>
      editInstitution(id, data),
    onSuccess: (_, variables) => {
      toast.success(
        type === "suspend"
          ? "Institution suspended successfully"
          : type === "activate"
            ? "Institution activated successfully"
            : "Institution edited successfully",
      );
      queryClient.invalidateQueries({
        queryKey: ["institutions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["institution-dashboard"],
      });
      queryClient.invalidateQueries({
        queryKey: ["institution", variables.id],
      });
    },
    onError: () => {
      toast.error(`Failed to ${type} institution`);
    },
  });
  return {
    edit,
    isPending,
    error,
  };
}

export function useCreateIAdmin() {
  const queryClient = useQueryClient();
  const { mutate: create, isPending } = useMutation({
    mutationFn: createInstitutionAdmin,
    onSuccess: () => {
      toast.success("Institution admin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["institutions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["institution-dashboard"],
      });
      queryClient.invalidateQueries({
        queryKey: ["I-Users"],
      });
    },
    onError: () => {
      toast.error("Failed to create institution admin");
    },
  });

  return {
    create,
    isPending,
  };
}
