import HttpClient from "@/adapters/http";
import { ThrowError } from "@/utils/config";

export async function getDevices(params?: Paginator) {
  try {
    const res = await HttpClient.get<
      BaseBackendResponse<undefined, Pagination & { results: Device[] }>
    >("/devices/", {
      params: {
        search: params?.query,
        page: params?.page,
        ...params,
      },
    });
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function deleteDevice(id: string) {
  try {
    await HttpClient.delete(`/devices/${id}/`);
  } catch (err) {
    ThrowError(err);
  }
}
