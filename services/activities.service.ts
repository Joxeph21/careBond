import HttpClient from "@/adapters/http";
import { ThrowError } from "@/utils/config";

export async function getActivities(params?: Paginator) {
  try {
    const res = await HttpClient.get<
      BaseBackendResponse<undefined, Pagination & { results: Activity[] }>
    >("/api/activities/", {
      params: {
        search: params?.query,
        page: params?.page,
      },
    });

    const data = res.data;

    return {
      count: data?.count,
      next: data?.next,
      previous: data?.previous,
      result: data?.results,
    };
  } catch (err) {
    ThrowError(err);
  }
}

export async function getActivityById(id: string) {
  try {
    const res = await HttpClient.get<BaseBackendResponse<Activity>>(
      `/api/activities/${id}/`,
    );

    return res.data;
  } catch (err) {
    ThrowError(err);
  }
}
