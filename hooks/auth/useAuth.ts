"use client";
import {
  AuthChangePassword,
  AuthForgotPasswordRequest,
  AuthLogin,
  AuthLogout,
  AuthResetPassword,
  GetRefreshToken,
} from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { auth_logout_action } from "@/actions/auth";
import { CONFIG } from "@/utils/config";

// # 1. Login Hook

export function useLogin() {
  const router = useRouter();
  const { mutate: login, isPending } = useMutation({
    mutationFn: AuthLogin,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      router.replace("/");
    },
  });

  return { login, isPending };
}

// # 2. Forgot Password Hook
export function useRequestForgotPassword() {
  const { mutate: requestForgotPassword, isPending } = useMutation({
    mutationFn: AuthForgotPasswordRequest,

    onSuccess: (data) => {
      toast.success(data?.message ?? "An OTP was sent to your mail");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    requestForgotPassword,
    isPending,
  };
}

// # 3. Reset Password Hook
export function useForgotPassword() {
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: AuthResetPassword,

    onSuccess: (data) => {
      toast.success(data?.message ?? "Password changed successfully");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    forgotPassword,
    isPending,
  };
}
// # 4. Change Password Hook
export function useChangePassword() {
  const { mutate: changePasword, isPending } = useMutation({
    mutationFn: AuthChangePassword,

    onSuccess: (data) => {
      toast.success(data?.message ?? "Password changed successfully");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    changePasword,
    isPending,
  };
}

// # 5. Logout Hook
export function useLogout() {
  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      const res = await GetRefreshToken();

      if (!res.token) {
        console.warn("Logout initiated but no refresh token was found.");

        // Take the user back to the login page & Remove the accesstoken from session
        sessionStorage.removeItem(CONFIG.ACCESS_TOKEN_IDENTIFIER);
        window.location.replace("/login");
        return;
      }

      await AuthLogout({ refresh_token: res.token });
      await auth_logout_action();
    },
  });

  return {
    logout,
    isPending,
  };
}
