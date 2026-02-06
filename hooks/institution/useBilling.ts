import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getBillingHistory,
  getBillingOverview,
  getStripeSecretKey,
} from "@/services/billing.service";

export default function useBillingOverview() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["billing-overview"],
    queryFn: () => getBillingOverview(),
  });

  return { data, isLoading, error };
}

export function useBillingHistory() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["billing-history"],
    queryFn: () => getBillingHistory(),
  });

  return { data, isLoading, error };
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
