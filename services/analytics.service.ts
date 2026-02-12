import HttpClient from "@/adapters/http";
import { ThrowError } from "@/utils/config";

export type AnalyticsData = {
  label: string;
  value: number;
  previous_value: number;
};

export type AnalyticsParams = {
  institution_id?: string;
  range?: "1y" | "24h" | "30d" | "7d"
};

export async function getConsultationVolume({
  institution_id,
  range = "30d",
}: AnalyticsParams) {
  try {
    const res = await HttpClient.get<BaseBackendResponse<AnalyticsData[]>>(
      "/analytics/consultations/",
      {
        params: {
          institution_id,
          range,
        },
      },
    );

    return res.data.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function getUserGrowth({ range = "30d" }: AnalyticsParams) {
  try {
    const res = await HttpClient.get<BaseBackendResponse<AnalyticsData[]>>(
      "/analytics/user-growth/",
      {
        params: {
          range,
        },
      },
    );

    console.log(res);

    return res.data.data;
  } catch (err) {
    ThrowError(err);
  }
}
