import { ThrowError } from "@/utils/config";
import HttpClient from "@/adapters/http";
import { FamilyFormData } from "@/schema/family-schema";
import { CameraFormData } from "@/schema/camera-schema";

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

export type AssignmentPayload = {
  family_member_id?: string;
  professional_id?: string;
  patient_id?: string;
  relationship?: string;
};

export async function assignMember({
  id,
  data,
}: {
  id: string;
  data: AssignmentPayload;
}) {
  const endpoint = data.patient_id
    ? `/professionals/${id}/assign_patient/`
    : `/patients/${id}/assign_family_member/`;

  try {
    const res = await HttpClient.post<BaseBackendResponse>(endpoint, data);

    return res.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function AddPatientCamera({
  data,
  institution_id,
}: { data: CameraFormData } & { institution_id: string }) {
  try {
    const res = await HttpClient.post<BaseBackendResponse>("/cameras/", {
      ...data,
      rtsp_port: Number(data.rtsp_port),
      onvif_port: Number(data.onvif_port),
      enabled: true,
      institution_id,
    });

    return res.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function UpdateCamera({
  id,
  data,
}: {
  id: string;
  data: Partial<CameraFormData>;
}) {
  try {
    const res = await HttpClient.patch<BaseBackendResponse>(
      `/cameras/${id}/`,
      data,
    );

    return res.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function DeleteCamera(id: string) {
  try {
    const res = await HttpClient.delete<BaseBackendResponse>(`/cameras/${id}/`);

    return res.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function getCameras(params?: Paginator) {
  try {
    const res = await HttpClient.get<
      BaseBackendResponse<
        undefined,
        Pagination & { results: Camera[]; active_cameras_count: number }
      >
    >("/cameras/", {
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

export type Camera_access_request = {
  user_id: string;
  role: "family" | "professional";
  can_view_stream: boolean;
};

export async function toggleCameraAccess(
  patient_id: string,
  data: Camera_access_request,
) {
  try {
    const res = await HttpClient.post<BaseBackendResponse>(
      `patients/${patient_id}/update_assignment_permission/`,
      data,
    );
    return res.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function getPatientVitals(id: string) {
  try {
    const res = await HttpClient.get<BaseBackendResponse<Vitals[]>>(
      `/patients/${id}/vitals/`,
    );

    return res.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function getPatientsVitalsChart(params: {
  patient_id: string;
  period: string;
  vital_type: string;
}) {
  try {
    const res = await HttpClient.get<BaseBackendResponse<{label: string, value: number}[]>>(
      `/vitals/chart-data`,
      {
        params,
      },
    );

    return res?.data.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function getPatientsVitalsHistory(params: {
  end_date?: string,
  start_date?: string,
  patient_id: string,
} & Paginator){
  try {
    const res = await HttpClient.get<BaseBackendResponse<undefined, Pagination & { results: Vitals[] }>>(
      `/vitals/history/`,
      {
        params,
      },
    );

    return res.data;
  } catch (err) {
    ThrowError(err);
  }
}