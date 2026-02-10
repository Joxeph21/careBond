import HttpClient from "@/adapters/http";
import { ThrowError } from "@/utils/config";

export async function getActivities(params?: Paginator & {institution_id?: string}) {
  try {
    const res = await HttpClient.get<
      BaseBackendResponse<undefined, Pagination & { results: Activity[] }>
    >("/activities/", {
      params: {
        search: params?.query,
        page: params?.page,
        institution_id: params?.institution_id
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
    const res = await HttpClient.get<Activity>(`/activities/${id}/`);

    return res.data;
  } catch (err) {
    ThrowError(err);
  }
}
