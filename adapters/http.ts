"use client";
import { CONFIG } from "@/utils/config";
import axios, { InternalAxiosRequestConfig, type AxiosError } from "axios";
import { access_token_retrieve,  } from "./utils";
import { auth_logout_action } from "@/actions/auth";

export const PUBLIC_ROUTES = [
  "/auth/login/",
  "/auth/logout/",
  "/auth/change-password/",
  "/auth/forgot-password/",
  "/auth/logout/",
];

const HttpClient = axios.create({
  baseURL: CONFIG.NEXT_PUBLIC_BASE_BACKEND_URL,
});

export default HttpClient;

const authInterceptor = async (config: InternalAxiosRequestConfig) => {
  const publicRoute = PUBLIC_ROUTES.includes(config.url || "");

  if (!publicRoute) {
    const access_token = await access_token_retrieve();

    if (!access_token) {
      await auth_logout_action();
    }

    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
  }
  return config;
};

const authErrorInterceptor = async (error: AxiosError) => {
  if (error.response && error.response.status === 401) {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      console.log("::> 401 detected. Attempting token refresh...");

      const newAccessToken = await access_token_retrieve();

      if (newAccessToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return HttpClient(originalRequest);
      }
    }

    // console.log(error)
    return Promise.reject(error);
  }

  return Promise.reject(error);
};

HttpClient.interceptors.request.use(authInterceptor);

HttpClient.interceptors.response.use(
  (response) => response,
  (error) => authErrorInterceptor(error)
);
