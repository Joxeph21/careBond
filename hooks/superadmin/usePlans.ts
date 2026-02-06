import { EditPlan, createPlan, getPlans } from "@/services/superadmin.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useGetPlans(query?: string) {
  const { data, isLoading, error, refetch, isFetched } = useQuery({
    queryKey: ["plans", query],
    queryFn: () => getPlans(query),
  });

  const total_count = data?.count;
  const plans = data?.results;

  const nextPage = data?.next;
  const prevPage = data?.previous;

  return {
    total_count,
    plans,
    nextPage,
    prevPage,
    isLoading,
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
