import {
  createInstitutionUser,
  deleteInstitutionUser,
  editInstitutionUser,
  getInstitutionUserById,
  getInstitutionUsers,
} from "@/services/institutions.service";
import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect, useMemo } from "react";

export function useGetIUsers(
  id: string | null | undefined,
  option?: Paginator & { role?: USER_ROLE },
) {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    error,
    refetch,
    isRefetching,
    isFetched,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["institution-users", id, option],
    queryFn: () => getInstitutionUsers(id!, option),
    placeholderData: keepPreviousData,
    staleTime: 5000,
    enabled: !!id,
  });

  const total_count = data?.count;
  const users = data?.result;

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
    if (!isPlaceholderData && nextOptions && id) {
      queryClient.prefetchQuery({
        queryKey: ["institution-users", id, nextOptions],
        queryFn: () => getInstitutionUsers(id, nextOptions),
        staleTime: 5000,
      });
    }
  }, [id, isPlaceholderData, nextOptions, queryClient]);

  return {
    total_count,
    users:
      users?.filter(
        (el) => el.role !== "super_admin" && el.role !== "institution_admin",
      ) ?? [],
    nextPage,
    prevPage,
    isLoading,
    error,
    refetch,
    isRefetching,
    isFetched,
    isPlaceholderData,
  };
}

export function useEditIUser(institution_id: string) {
  const queryClient = useQueryClient();
  const { mutate: editUser, isPending: isEditing } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      editInstitutionUser(institution_id, id, data),
    onSuccess: (_, variables) => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["institution-users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["I-Users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["institution-user", variables.id],
      });
    },
    onError: () => {
      toast.error("Failed to update user");
    },
  });

  return { editUser, isEditing };
}

export function useDeleteIUser(institution_id: string) {
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteInstitutionUser(institution_id, id),
    onSuccess: (_, id) => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["institution-users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["I-Users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["institution-user", id],
      });
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  return { deleteUser, isDeleting };
}

export function useGetIUserById(id: string) {
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["institution-user", id],
    queryFn: async () => {
      const res = await getInstitutionUserById(id);
      return res?.data;
    },
    enabled: !!id,
  });

  return { user: data, isLoading, error, refetch, isRefetching };
}

export function useCreateIUser() {
  const queryClient = useQueryClient();
  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: createInstitutionUser,
    onSuccess: (_, variables) => {
      toast.success("User created successfully");
      queryClient.invalidateQueries({
        queryKey: ["institution-users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["I-Users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["I-Users", variables],
      });
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to create user");
    },
  });

  return { createUser, isCreating };
}
