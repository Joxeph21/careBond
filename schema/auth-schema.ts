import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password cannot be empty"),
});

export const ForgotPasswordRequestSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const ChangePasswordShema = Yup.object({
  old_password: Yup.string().required("Old password required"),
  new_password: Yup.string()
    .required("Password cannot be empty")
    .min(6, "Password must be at least 6 characters"),
  new_password_confirm: Yup.string()
    .required("Please confirm your new password")
    .oneOf([Yup.ref("new_password")], "Passwords must match"),
});

export const ResetPasswordSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  otp_code: Yup.string().required("OTP code is required").min(4, "Invalid OTP"),
  new_password: Yup.string()
    .required("Password cannot be empty")
    .min(6, "Password must be at least 6 characters"),
  new_password_confirm: Yup.string()
    .required("Please confirm your new password")
    .oneOf([Yup.ref("new_password")], "Passwords must match"),
});

export const VerifyOTPSchema = Yup.object({
  otp: Yup.string().required("OTP code is required").min(4, "Invalid OTP"),
});

export const TwoFASchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  otp: Yup.string().required("OTP code is required").min(4, "Invalid OTP"),
});
