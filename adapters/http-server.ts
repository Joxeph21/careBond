"use server";
import { cookies } from "next/headers";
import { CONFIG } from "@/utils/config";
import { auth_logout_action, auth_refresh_token_action } from "@/actions/auth";

export async function getAuthHeader() {
  const _cookies = await cookies();
  let token = _cookies.get(CONFIG.ACCESS_TOKEN_IDENTIFIER)?.value;

  if (!token) {
    const res = await auth_refresh_token_action();
    token = res?.access || undefined;
  }

  return token ? { Authorization: `Bearer ${token}` } : {};
}

export interface ServerFetchOptions extends RequestInit {
  _retry?: boolean;
}

export async function serverFetch<T>(
  endpoint: string,
  options: ServerFetchOptions = {},
): Promise<T> {
  const authHeader = await getAuthHeader();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (authHeader.Authorization) {
    headers.Authorization = authHeader.Authorization;
  }

  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  const fullUrl = `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}${endpoint}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers,
  });

  if (res.status === 401 && !options._retry) {
    console.log("::> 401 detected on server. Attempting token refresh...");
    const refreshRes = await auth_refresh_token_action();

    if (refreshRes?.access) {
      return serverFetch<T>(endpoint, {
        ...options,
        _retry: true,
        headers: {
          ...headers,
          Authorization: `Bearer ${refreshRes.access}`,
        },
      });
    } else {
      await auth_logout_action();
    }
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Fetch failed with status ${res.status}`,
    );
  }

  return res.json();
}
