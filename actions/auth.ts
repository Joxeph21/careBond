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
  isPersistent: boolean
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

export const auth_refresh_token_action =
  async (): Promise<RefreshActionResponse | null> => {
    const _cookies = await cookies();
    const token = _cookies.get(CONFIG.REFRESH_TOKEN_IDENTIFIER);

    if (!token) return { access: null, refresh: null };

    try {
      const { access, refresh } = await refreshToken({ refresh: token });
      return { access, refresh };
    } catch (err) {
      console.log(err);
      await auth_logout_action();
      return { access: null, refresh: null };
    }
  };

export const auth_logout_action = async () => {
  const _cookies = await cookies();
  _cookies.set({
    ...CONFIG.BASE_COOKIE_OPTIONS,
    name: CONFIG.REFRESH_TOKEN_IDENTIFIER,
    value: "",
    maxAge: 0,
  });
};
