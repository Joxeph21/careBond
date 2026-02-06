import HttpClient from "@/adapters/http";
import { ThrowError } from "@/utils/config";

export async function getVitals(option?: Paginator) {
  try {
    const res = await HttpClient.get<
      BaseBackendResponse<null, Pagination & { results: Vitals[] }>
    >("/api/vitals/", {
      params: {
        search: option?.query,
        page: option?.page ?? 1,
      },
    });

    const data = res?.data;

    return {
      count: data?.count,
      next: data?.next,
      previous: data?.previous,
      results: data?.results,
    };
  } catch (err) {
    ThrowError(err);
  }
}

export async function createVital(data: VitalRequest) {
  try {
    const res = await HttpClient.post("/api/vitals/", data);
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function getVitalsInfo(id: string) {
  try {
    const res = await HttpClient.get<BaseBackendResponse<Vitals>>(
      `/api/vitals/${id}/`,
    );
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function editVital(id: string, data: VitalRequest) {
  try {
    const res = await HttpClient.put(`/api/vitals/${id}/`, data);
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function deleteVital(id: string) {
  try {
    const res = await HttpClient.delete(`/api/vitals/${id}/`);
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}
