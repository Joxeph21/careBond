import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPaymentMethod,
  cancelSubscription,
  createSubscription,
  deletePaymentMethod,
  getBillingHistory,
  getBillingOverview,
  getPaymentMethods,
  getStripeSecretKey,
  setActivePaymentMethod,
  upgradePlan,
} from "@/services/billing.service";
import { useEffect } from "react";

export default function useBillingOverview() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["billing-overview"],
    queryFn: () => getBillingOverview(),
  });

  return { data, isLoading, error };
}

export function useBillingHistory(
  param?: Paginator & { institution_id: string },
) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["billing-history", param],
    queryFn: () => getBillingHistory(param),
  });

  const total_count = data?.count;
  const history = data?.results;

  const nextPage = data?.next;
  const prevPage = data?.previous;

  useEffect(() => {
    if (nextPage && param?.institution_id) {
      const nextParams = {
        ...param,
        page: nextPage,
        institution_id: param.institution_id,
      };
      queryClient.prefetchQuery({
        queryKey: ["billing-history", nextParams],
        queryFn: () => getBillingHistory(nextParams),
      });
    }
  }, [nextPage, param, queryClient]);

  return {
    history,
    isLoading,
    error,
    nextPage,
    prevPage,
    total_count,
  };
}

export function useStripeKey() {
  const {
    mutate,
    mutateAsync,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: () => getStripeSecretKey(),
  });

  return { mutateAsync, mutate, isLoading, error };
}

export function useSetDefaultPaymentMethod() {
  const queryClient = useQueryClient();
  const {
    mutate,
    mutateAsync,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (id: string) => setActivePaymentMethod(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
      queryClient.invalidateQueries({ queryKey: ["payment-methods", variables] });
    },
  });

  return { mutate, mutateAsync, isLoading, error };
}

export function useAddPaymentMethod() {
  const queryClient = useQueryClient();
  const {
    mutate,
    mutateAsync,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (data: {
      payment_method_id: string;
      institution_id: string;
      set_as_default?: boolean;
    }) => addPaymentMethod(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
      queryClient.invalidateQueries({ queryKey: ["payment-methods", variables] });
    },
  });

  return { mutate, mutateAsync, isLoading, error };
}

export function useCancelSubscription() {
  const queryClient = useQueryClient();
  const {
    mutate,
    mutateAsync,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: () => cancelSubscription(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billing-overview"] });
    },
  });

  return { mutate, mutateAsync, isLoading, error };
}

export function useCreateSubscription() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: {
      plan_id: string;
      payment_method_id: string;
      institution_id: string;
    }) => createSubscription(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billing-overview"] });
    },
  });

  return { mutate, mutateAsync, isPending, error };
}

export function usePaymentMethods() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["payment-methods"],
    queryFn: getPaymentMethods,
  });

  return {
    data,
    isLoading,
    error,
  };
}

export function useUpgradePlan() {
  const queryClient = useQueryClient();
  const {
    mutate,
    mutateAsync,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (data: { plan_id: string; institution_id: string }) =>
      upgradePlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billing-overview"] });
    },
  });

  return { mutate, mutateAsync, isLoading, error };
}

export function useDeletePaymentMethod() {
  const queryClient = useQueryClient();
  const {
    mutate,
    mutateAsync,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (id: string) => deletePaymentMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
    },
  });

  return { mutate, mutateAsync, isLoading, error };
}
