import HttpClient from "@/adapters/http";
import { ThrowError } from "@/utils/config";

export async function setActivePaymentMethod(id: string) {
  try {
    const res = await HttpClient.post<BaseBackendResponse>(
      `/billing/${id}/set-active/`,
    );
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function addPaymentMethod(data: "") {
  try {
    const res = await HttpClient.post<BaseBackendResponse>(
      "/billing/add-payment-method/",
      data,
    );
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function cancelSubscription() {
  try {
    const res = await HttpClient.post<BaseBackendResponse>(
      "/api/billing/cancel-subscription/",
    );
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function createSubscription(data: {
  plan_id: string;
  payment_method_id: string;
  institution_id: string;
}) {
  try {
    const res = await HttpClient.post<BaseBackendResponse>(
      "/api/billing/create-subscription/",
      data,
    );
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function getBillingHistory(param?: Paginator) {
  try {
    const res = await HttpClient.get<
      BaseBackendResponse<
        null,
        Pagination & { results: BillingHistoryResponse[] }
      >
    >("/api/billing/history/", {
      params: {
        search: param?.query,
        page: param?.page,
      },
    });
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function getBillingOverview() {
  try {
    const res =
      await HttpClient.get<BaseBackendResponse<BillingOverviewResponse>>(
        "/billing/overview/",
      );
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function getPaymentMethods() {
  try {
    const res = await HttpClient.get<BaseBackendResponse<PaymentMethod[]>>(
      "/billing/payment-methods/",
    );
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function upgradePlan(data: {
  plan_id: string;
  institution_id: string;
}) {
  try {
    const res = await HttpClient.post<BaseBackendResponse>(
      "/billing/upgrade-plan/",
      data,
    );
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function getStripeSecretKey() {
  try {
    const res = await HttpClient.post<
      BaseBackendResponse<undefined, { client_secret: string; status: string }>
    >("/billing/setup-intent/");
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}
