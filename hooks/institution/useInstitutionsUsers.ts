import {
  deleteInstitutionUser,
  editInstitutionUser,
  getInstitutionUserById,
  getInstitutionUsers,
} from "@/services/institutions.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useGetIUsers(id: string) {
  const { data, isLoading, error, refetch, isRefetching, isFetched } = useQuery(
    {
      queryKey: ["institution-users", id],
      queryFn: () => getInstitutionUsers(id),
      enabled: !!id,
    },
  );

  const total_count = data?.count;
  const users = data?.result;

  const nextPage = data?.next;
  const prevPage = data?.previous;

  return {
    total_count,
    users,
    nextPage,
    prevPage,
    isLoading,
    error,
    refetch,
    isRefetching,
    isFetched,
  };
}

export function useEditIUser(institution_id: string) {
  const queryClient = useQueryClient();
  const { mutate: editUser, isPending: isEditing } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      editInstitutionUser(institution_id, id, data),
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["institution-users", institution_id],
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
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["institution-users", institution_id],
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
