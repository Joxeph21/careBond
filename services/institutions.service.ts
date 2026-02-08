import HttpClient from "@/adapters/http";
import { UserFormData } from "@/schema/user-schema";
import { ThrowError } from "@/utils/config";

export async function getInstitutionById(id: string) {
  try {
    const res = await HttpClient.get<
      BaseBackendResponse<{ data: Institution }>
    >(`/admin/institutions/${id}`);
    return res.data;
  } catch (error) {
    ThrowError(error);
  }
}

export async function getInstitutionUsers(id: string, option?: Paginator) {
  try {
    const res = await HttpClient.get<
      BaseBackendResponse<null, Pagination & { results: IUser[] }>
    >(`/institution/${id}/users/`, {
      params: {
        search: option?.query,
        page: option?.page,
      },
    });

    const data = res.data;

    return {
      count: data?.count,
      next: data?.next,
      previous: data?.previous,
      result: data?.results,
    };
  } catch (error) {
    ThrowError(error);
  }
}

export async function getInstitutionUserById(id: string) {
  try {
    const res = await HttpClient.get<BaseBackendResponse<User>>(
      `/institution/users/${id}/`,
    );
    return res.data;
  } catch (error) {
    ThrowError(error);
  }
}
export async function editInstitutionUser(
  institution_id: string,
  user_id: string,
  data: Partial<User>,
) {
  try {
    const res = await HttpClient.put<BaseBackendResponse<User>>(
      `/institution/${institution_id}/users/${user_id}/`,
      data,
    );
    return res.data;
  } catch (error) {
    ThrowError(error);
  }
}

export async function deleteInstitutionUser(
  institution_id: string,
  user_id: string,
) {
  try {
    const res = await HttpClient.delete<BaseBackendResponse<null>>(
      `/institution/${institution_id}/users/${user_id}/`,
    );
    return res.data;
  } catch (error) {
    ThrowError(error);
  }
}

export async function createInstitutionUser(data: UserFormData) {
  try {
    const res = await HttpClient.post<BaseBackendResponse<User>>(
      `/institution/users/`,
      { ...data },
    );
    return res.data;
  } catch (error) {
    ThrowError(error);
  }
}

