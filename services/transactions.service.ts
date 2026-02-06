import HttpClient from "@/adapters/http";
import { ThrowError } from "@/utils/config";

export async function getTransactions(param?: Paginator) {
  try {
    const res = await HttpClient.get<
      BaseBackendResponse<null, Pagination & { results: Transaction[] }>
    >("/admin/transactions/", {
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
