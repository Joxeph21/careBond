import Button from "@/components/common/Button";
import { useRequestForgotPassword } from "@/hooks/auth/useAuth";
import useOtpInput from "@/hooks/useOtpInput";
import { useTimer } from "@/hooks/useTimer";
import { VerifyOTPSchema } from "@/schema/auth-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function VerifyContent() {
  const { requestForgotPassword, isPending } = useRequestForgotPassword();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
  } = useForm({
    mode: "all",
    resolver: yupResolver(VerifyOTPSchema),
    defaultValues: {
      otp: "",
    },
  });
  const { handleKeyDown, setInputRef, handleKeyUp, values } = useOtpInput(
    4,
    (val) => {
      setValue("otp", val.join(""), {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
  );
  const { resetTimer, timer } = useTimer(30);

  useEffect(() => {
    if (!email) {
      router.replace("/forgot-password");
    }
  }, [router, email]);

  if (!email) return null;

  const handleRequestOtp = () => {
    requestForgotPassword(
      { email },
      {
        onSuccess: () => {
          resetTimer(30);
        },
      },
    );
  };

  const onSubmit = (data: { otp: string }) => {
    router.push(
      `/create-password?otp=${encodeURIComponent(data.otp)}&email=${encodeURIComponent(email)}`,
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full  col-center gap-5"
    >
      <div className="text-center space-y-1">
        <h2 className="text-foreground text-[20px] font-medium">
          Email OTP Verification
        </h2>
        <p className="text-grey-dark">We sent a code to {email}</p>
      </div>

      {errors.otp && (
        <p className="font-font-medium text-danger">{errors.otp?.message}</p>
      )}

      <div className="w-full md:max-w-[80%] flex-between">
        {Array.from({ length: 4 }).map((_, index) => (
          <input
            key={index}
            inputMode="numeric"
            maxLength={1}
            ref={(el) => setInputRef(el, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onKeyUp={(e) => handleKeyUp(e, index)}
            value={values[index] || ""}
            onChange={(e) => console.log(e)}
            className={`size-15 outline-none rounded-md ring focus:ring-[#3F8EF3] flex-center text-center font-bold text-lg  ${errors.otp ? "ring-danger" : "ring-grey"}`}
          />
        ))}
      </div>

      <div className="w-full flex-between">
        <p className="text-grey-dark">
          Didn&apos;t recieve code.{" "}
          <button
            disabled={timer > 0 || isPending}
            aria-label="Resend otp code"
            onClick={handleRequestOtp}
            className="text-primary cursor-pointer disabled:opacity-20 underline"
            type="button"
          >
            Resend Code
          </button>
        </p>

        {timer > 0 && <p className="text-danger">00:{timer}</p>}
      </div>

      <Button
        config={{
          type: "submit",
          disabled: !isValid,
        }}
        isLoading={isSubmitting}
        size="full"
      >
        Verify and Proceed
      </Button>
    </form>
  );
}
