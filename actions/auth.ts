"use server";

import { refreshToken } from "@/lib/auth/refresh";
import { CONFIG } from "@/utils/config";
import { cookies } from "next/headers";

export interface RefreshActionResponse {
  access: string | null;
  refresh: string | null;
}

export const auth_update_refresh_token = async (
  refresh: string,
  isPersistent: boolean,
) => {
  const _cookies = await cookies();

  const options = {
    ...CONFIG.BASE_COOKIE_OPTIONS,
    value: refresh,
    name: CONFIG.REFRESH_TOKEN_IDENTIFIER,
  };

  if (isPersistent) {
    options.maxAge = CONFIG.REFRESH_TOKEN_LIFETIME;
  }

  _cookies.set(options);
};

export const auth_update_access_token = async (access: string) => {
  const _cookies = await cookies();
  _cookies.set({
    ...CONFIG.BASE_COOKIE_OPTIONS,
    name: CONFIG.ACCESS_TOKEN_IDENTIFIER,
    value: access,
  });
};

export const auth_refresh_token_action =
  async (): Promise<RefreshActionResponse | null> => {
    const _cookies = await cookies();
    const token = _cookies.get(CONFIG.REFRESH_TOKEN_IDENTIFIER);

    if (!token) {
      return { access: null, refresh: null };
    }

    try {
      const { access, refresh } = await refreshToken({ refresh: token });

      if (access) {
        // Save to cookies so the server (and serverFetch) can find it next time
        _cookies.set({
          ...CONFIG.BASE_COOKIE_OPTIONS,
          name: CONFIG.ACCESS_TOKEN_IDENTIFIER,
          value: access,
        });

        if (refresh) {
          _cookies.set({
            ...CONFIG.BASE_COOKIE_OPTIONS,
            name: CONFIG.REFRESH_TOKEN_IDENTIFIER,
            value: refresh,
          });
        }
      }

      return { access, refresh };
    } catch {
      return { access: null, refresh: null };
    }
  };

export const auth_update_admin = async (admin: string) => {
  const _cookies = await cookies();

  _cookies.set({
    ...CONFIG.BASE_COOKIE_OPTIONS,
    name: CONFIG.ADMIN_TYPE_IDENTIFIER,
    value: admin,
    sameSite: "lax",
  });
};

export const auth_logout_action = async () => {
  const _cookies = await cookies();
  _cookies.delete(CONFIG.REFRESH_TOKEN_IDENTIFIER);
  _cookies.delete(CONFIG.ACCESS_TOKEN_IDENTIFIER);
  _cookies.delete(CONFIG.ADMIN_TYPE_IDENTIFIER);
};

export const auth_get_access_server = async () => {
  const _cookies = await cookies();
  const token = _cookies.get(CONFIG.ACCESS_TOKEN_IDENTIFIER);
  return token?.value;
};

export const auth_get_refresh_server = async () => {
  const _cookies = await cookies();
  const token = _cookies.get(CONFIG.REFRESH_TOKEN_IDENTIFIER);
  return token?.value;
};
