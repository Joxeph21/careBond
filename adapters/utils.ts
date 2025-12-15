"use client";
import {
  RefreshActionResponse,
  
  auth_refresh_token_action,
  auth_update_refresh_token,
} from "@/actions/auth";
import { CONFIG } from "@/utils/config";

let refreshPromise: Promise<string | null> | null = null;

export const access_token_retrieve = async (): Promise<string | null> => {
  let token = sessionStorage.getItem(CONFIG.ACCESS_TOKEN_IDENTIFIER);

  if (!token) {
    if (!refreshPromise) {
      refreshPromise = auth_refresh_token_action()
        .then((renewalResponse: RefreshActionResponse | null) => {
          if (renewalResponse?.access && renewalResponse.refresh) {
            sessionStorage.setItem(
              CONFIG.ACCESS_TOKEN_IDENTIFIER,
              renewalResponse.access
            );
            auth_update_refresh_token(renewalResponse.refresh, true);

            return renewalResponse.access;
          } else {
            return null;
          }
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    token = (await refreshPromise) || null;
  }

  return token;
};

// export const auth_logout = async () => {
//   try {
//     await auth_logout_action();
//   } catch (err) {
//     console.log("LOGOUT FAILED:", err);
//   }
// };

export const auth_login = async (
  access: string,
  refresh: string,
  isPersistent: boolean = false
) => {
  sessionStorage.setItem(CONFIG.ACCESS_TOKEN_IDENTIFIER, access);
  await auth_update_refresh_token(refresh, isPersistent);
};
