// import { auth_update_admin } from "@/actions/auth";
import HttpClient from "@/adapters/http";
// import { auth_login } from "@/adapters/utils";
import { ThrowError } from "@/utils/config";

export async function AuthLogin({ email, password }: AuthLoginData) {
  try {
    const res = await HttpClient.post<BaseBackendResponse<LoginResponseData[]>>(
      "/auth/login/",
      { email, password },
    );

    const response = res?.data;

    return response;
  } catch (err) {
    ThrowError(err);
  }
}

export async function AuthForgotPasswordRequest(data: { email: string }) {
  try {
    const res = await HttpClient.post<BaseBackendResponse<{ message: string }>>(
      "/auth/forgot-password/",
      data,
    );
    return res.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function AuthChangePassword(data: ChangePasswordRequest) {
  try {
    const res = await HttpClient.post<BaseBackendResponse<{ message: string }>>(
      "/auth/change-password/",
      data,
    );
    return res.data;
  } catch (err) {
    ThrowError(err);
  }
}
export async function AuthResetPassword(data: ResetPasswordData) {
  try {
    const res = await HttpClient.post<BaseBackendResponse<{ message: string }>>(
      "/auth/reset-password/",
      data,
    );
    return res.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function AuthLogout(data: { refresh_token: string }) {
  try {
    const res = await HttpClient.post<BaseBackendResponse<{ message: string }>>(
      "/auth/logout/",
      data,
    );
    return res.data;
  } catch (err) {
    ThrowError(err);
  }
}

export async function GetRefreshToken() {
  try {
    const response = await fetch("/api/auth", { method: "GET" });

    const data = await response.json();

    if (response.ok && data.token) {
      return data?.token;
    }
  } catch (error) {
    console.error("Failed to fetch refresh token:", error);
    throw error;
  }
}

export async function AuthVerify2FA(data: { otp: string, email: string }) {
  try {
    const res = await HttpClient.post<BaseBackendResponse>(
      "/auth/login/verify-2fa/",
      data,
    );
    return res.data;
  } catch (err) {
    ThrowError(err);
  }
}