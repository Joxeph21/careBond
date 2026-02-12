import ms from "ms";
import { AxiosError } from "axios";

interface ErrorData {
  message?: string;
  error?: string;
  errors?: {
    non_field_errors?: string[];
    [key: string]: string[] | undefined;
  };
}

export const CONFIG = {
  NEXT_PUBLIC_BASE_BACKEND_URL: process.env.NEXT_PUBLIC_BASE_BACKEND_URL,
  ACCESS_TOKEN_IDENTIFIER: "carebond.access",
  REFRESH_TOKEN_IDENTIFIER: "carebond.refresh",
  ADMIN_TYPE_IDENTIFIER: "carebond.adminType",
  REFRESH_TOKEN_LIFETIME: ms("30d") / 1000,
  BASE_COOKIE_OPTIONS: {
    httpOnly: true,
    sameSite: "strict" as "strict" | "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: undefined as number | undefined,
  },
  USER_META_DATA: "user.metaData",
};

export function ThrowError(err: unknown) {
  if (err instanceof AxiosError && err.response) {
    const responseData = err.response.data as ErrorData;
    
    console.log(responseData);
    const specificErrors = responseData?.errors?.non_field_errors;

    if (specificErrors && specificErrors.length > 0) {
      throw new Error(specificErrors.join(" "));
    }

    if (responseData?.message) {
      throw new Error(responseData.message);
    }

    if (responseData?.error) {
      throw new Error(responseData.error);
    }

    if (err.response.status) {
      throw new Error(`Request failed with status ${err.response.status}.`);
    }
  }

  if (err instanceof Error) {
    throw err;
  }

  throw new Error(
    "An unexpected application error occurred. Please try again.",
  );
}

export const SUPER_ADMIN_ROUTES = [
  "/institutions",
  "/plans"
]

export const INSTITUTION_ONLY_ROUTE = [
  "/devices"
]