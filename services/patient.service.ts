import { ThrowError } from "@/utils/config";
import HttpClient from "@/adapters/http";
import { FamilyFormData } from "@/schema/family-schema";

export async function getPatients(params?: Paginator) {
  try {
    const res = await HttpClient.get<
      BaseBackendResponse<undefined, Pagination & { results: User[] }>
    >("/patients", {
      params: {
        search: params?.query,
        page: params?.page,
      },
    });

    return res.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function createFamilyMember(data: FamilyFormData) {
  try {
    const res = await HttpClient.post<BaseBackendResponse>(
      "/patients/create_family_member/",
      data,
    );

    return res.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function assignFamilyMember({
  id,
  data,
}: {
  id: string;
  data: { family_member_id: string };
}) {
  try {
    const res = await HttpClient.post<BaseBackendResponse>(
      `/patients/${id}/assign_family_member/`,
      { ...data, relationship: "family" },
    );

    return res.data;
  } catch (err) {
    ThrowError(err);
  }
}
