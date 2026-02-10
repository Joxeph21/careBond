import HttpClient from "@/adapters/http";
import { ThrowError } from "@/utils/config";

export async function getNotifications(
  params?: Paginator & { institution_id?: string, level?: string },
) {
  try {
    const res = await HttpClient.get<BaseBackendResponse<undefined, Pagination & {results: UserNotification[]}>>("/notifications/", {
      params: {
        search: params?.query,
        ...params,
      },
    });
    return res.data;
  } catch (error) {
    ThrowError(error);
  }
}

export async function markAllAsRead({
  institution_id,
}: {
  institution_id?: string;
}) {
  try {
    const res = await HttpClient.patch<BaseBackendResponse>(
      "/notifications/mark_all_read/",
      {
        params: {
          institution_id,
        },
      },
    );
    return res.data;
  } catch (error) {
    ThrowError(error);
  }
}

export async function markAsRead({
  id,
  data,
}: {
  id: string;
  data: { is_read: boolean };
}) {
  try {
    const res = await HttpClient.patch<BaseBackendResponse>(
      `/notifications/${id}/`,
      data,
    );
    return res.data;
  } catch (error) {
    ThrowError(error);
  }
}

export async function getNotificationSettings(id: string){
    try{
        const res = await HttpClient.get<BaseBackendResponse>(
            `/notifications/settings/${id}/`,
        );
        return res.data;
    }catch(error){
        ThrowError(error);
    }
}
