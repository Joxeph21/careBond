import HttpClient from "@/adapters/http";
import { auth_login } from "@/adapters/utils";
import { ThrowError } from "@/utils/config";

export async function AuthLogin(data: AuthLoginData) {
  try {
    const res = await HttpClient.post<BaseBackendResponse<LoginResponseData>>(
      "/auth/login",
      data
    );

    const response = res?.data;

    const tokens = response.data?.tokens;

    if (tokens) {
      auth_login(tokens.access, tokens.refresh, data.persist);
    }

    return response;
  } catch (err) {
    ThrowError(err);
  }
}
