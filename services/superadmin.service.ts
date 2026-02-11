import HttpClient from "@/adapters/http";
import { ThrowError } from "@/utils/config";

export async function getS_Admin_Stats() {
  try {
    const res = await HttpClient.get<
      BaseBackendResponse<
        {
          stats: {
            mmr: number;
            total_users: number;
            active_institutions: number;
            uptime: string;
          };
          recent_logs: [];
        }[]
      >
    >("/admin/dashboard/");

    return res?.data?.data?.at(0);
  } catch (err) {
    ThrowError(err);
  }
}

export async function getS_Admin_Institutions() {
  try {
    const res = await HttpClient.get<
      BaseBackendResponse<
        null,
        Pagination & {
          results: Institution[];
        }
      >
    >("/admin/institutions/");

    const data = res?.data;

    console.log(data);

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

export async function getInstitutionDashboard() {
  try {
    const res = await HttpClient.get<
      BaseBackendResponse<Institution_dashboard_response[]>
    >("/institution/dashboard/");

    return res?.data?.data?.at(0);
  } catch (err) {
    ThrowError(err);
  }
}

export async function getPlans(query?: string) {
  try {
    const res = await HttpClient.get<
      BaseBackendResponse<null, Pagination & { results: Plan[] }>
    >("/plans/", {
      params: {
        search: query,
      },
    });

    const data = res?.data;

    console.log(data);

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

export async function createPlan(params: EditPlan) {
  try {
    const res = await HttpClient.post("/plans/", params);
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function EditPlan(id: string, params: EditPlan) {
  try {
    const res = await HttpClient.put(`/plans/${id}/`, params);
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function getUsers(option?: Paginator & {role?: USER_ROLE}) {
  try {
    const res = await HttpClient.get<
      BaseBackendResponse<null, Pagination & { results: IUser[] }>
    >("institution/users", {
      params: {
        search: option?.query,
        page: option?.page ?? 1,
        ...option
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

export async function getUserById(id: string) {
  try {
    const res = await HttpClient.get<BaseBackendResponse<User>>(
      `/users/${id}/`,
    );
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function createInstitution(
  data: Omit<
    Institution,
    | "id"
    | "plan_status"
    | "status"
    | "last_billed_date"
    | "next_payment_date"
    | "created_at"
    | "updated_at"
    | "plan_details"
  >,
) {
  try {
    const res = await HttpClient.post("/admin/institutions/", data);
    return res.data;
  } catch (error) {
    ThrowError(error);
  }
}

export async function deleteInstitution(id: string) {
  try {
    const res = await HttpClient.delete(`/admin/institutions/${id}/`);
    return res.data;
  } catch (error) {
    ThrowError(error);
  }
}
export async function editInstitution(id: string, data: Partial<Institution>) {
  try {
    const res = await HttpClient.put(`/admin/institutions/${id}/`, data);
    return res.data;
  } catch (error) {
    ThrowError(error);
  }
}

export async function getAdminLogs(option?: Paginator) {
  try {
    const res = await HttpClient.get<
      BaseBackendResponse<null, Pagination & { results: Log[] }>
    >("/admin/logs/", {
      params: {
        search: option?.query,
        page: option?.page ?? 1,
      },
    });
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function getCloudLogs(
  option?: Paginator &
    Partial<{
      country: string;
      ip_address: string;
      host: string;
      method: string;
      ordering: string;
    }>,
) {
  try {
    const res = await HttpClient.get<
      BaseBackendResponse<null, Pagination & { results: SecurityEventLog[] }>
    >("/logs/", {
      params: {
        search: option?.query,
        page: option?.page ?? 1,
        ...option,
      },
    });
    return res?.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function getCloudStats(params?: {range?: string}) {
  try {
    const res =
      await HttpClient.get<BaseBackendResponse<CloudStatsResponse[]>>(
        "/logs/stats/",
        {params: {
          time_range: params?.range
        }}
      );
    return res.data.data?.at(0);
  } catch (err) {
    ThrowError(err);
  }
}

export async function getAdminConfigurations() {
  try {
    const res = await HttpClient.get<BaseBackendResponse<Admin_Config[]>>(
      "/admin/configurations/",
    );
    return res.data.data?.at(0);
  } catch (err) {
    ThrowError(err);
  }
}
export async function modifyAdminConfig(id: string, data: Partial<Admin_Config>) {
  try {
    const res = await HttpClient.patch<BaseBackendResponse<Admin_Config>>(
      `/admin/configurations/${id}/`,
      data,
    );
    return res.data;
  } catch (error) {
    ThrowError(error);
  }
}
