"use client";
import {
  AuthChangePassword,
  AuthForgotPasswordRequest,
  AuthLogin,
  AuthLogout,
  AuthResetPassword,
  AuthVerify2FA,
  Resend2FAOTP,
} from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import {
  auth_get_refresh_server,
  auth_logout_action,
  auth_update_admin,
} from "@/actions/auth";
import { CONFIG } from "@/utils/config";
import { auth_login } from "@/adapters/utils";

// # 1. Login Hook

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: login, isPending } = useMutation({
    mutationFn: AuthLogin,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: async (res, state) => {
      const response = res?.data;

      const payload = response?.[0];

      const user = payload?.user;

      const tokens = payload?.tokens;

      if (tokens) {
        await auth_login(tokens.access, tokens.refresh, state.persist);
      }

      console.log(res);
      console.log(response);

      if (user) {
        await auth_update_admin(user.role);
      }

      const callbackUrl = searchParams.get("callbackUrl") ?? "/";

      if (
        res?.status_code === 202 &&
        res.message.toLowerCase() ===
          "2FA verification required. Please check your email for the OTP code.".toLowerCase()
      ) {
        router.push(
          `/2fa?callbackUrl=${encodeURIComponent(callbackUrl)}&email=${encodeURIComponent(state.email)}`,
        );
      } else {
        router.replace(callbackUrl || "/");
      }
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
  const router = useRouter();
  const { mutate: changePasword, isPending } = useMutation({
    mutationFn: AuthChangePassword,

    onSuccess: (data) => {
      toast.success(data?.message ?? "Password changed successfully");

      setTimeout(() => {
        toast.success("Login with your new password to continue");
        router.replace("/login");
      }, 1000);
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
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await auth_get_refresh_server();
        if (res) {
          await AuthLogout({ refresh_token: res });
        }
      } catch (error) {
        console.error("Logout API call failed", error);
      } finally {
        await auth_logout_action();

        sessionStorage.removeItem(CONFIG.ACCESS_TOKEN_IDENTIFIER);

        queryClient.clear();

        router.replace("/login");
      }
    },
  });

  return {
    logout,
    isPending,
  };
}

export function useVerify2FA() {
  const { mutate: verify2FA, isPending } = useMutation({
    mutationFn: AuthVerify2FA,

    onSuccess: () => {
      toast.success("2FA verification successful");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    verify2FA,
    isPending,
  };
}

export function useResend2FAOTP() {
  const { mutate: resend2FAOTP, isPending } = useMutation({
    mutationFn: Resend2FAOTP,

    onSuccess: () => {
      toast.success("OTP resent successfully");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    resend2FAOTP,
    isPending,
  };
}
