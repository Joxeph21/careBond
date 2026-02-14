"use client";
import Button from "@/components/common/Button";
import FormInput from "@/components/common/FormInput";
import useOtpInput from "@/hooks/useOtpInput";
import { useTimer } from "@/hooks/useTimer";
import { useForm, SubmitHandler } from "react-hook-form";
import { useVerify2FA } from "@/hooks/auth/useAuth";
import { useSearchParams, useRouter } from "next/navigation";
import { memo } from "react";

import { TwoFASchema } from "@/schema/auth-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResend2FAOTP } from "@/hooks/auth/useAuth";

const ResendTimer = memo(function ResendTimer({ email }: { email: string }) {
  const { resend2FAOTP, isPending } = useResend2FAOTP();
  const { resetTimer, timer } = useTimer(30);

  const handleResend = () => {
    resend2FAOTP(
      { email },
      {
        onSuccess: () => {
          resetTimer(30);
        },
      },
    );
  };

  return (
    <div className="w-full flex-between">
      <p className="text-grey-dark">
        Didn&apos;t recieve code.{" "}
        <button
          disabled={timer > 0 || isPending}
          aria-label="Resend otp code"
          onClick={handleResend}
          className="text-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-20 underline"
          type="button"
        >
          Resend Code
        </button>
      </p>

      {timer > 0 && <p className="text-danger">00:{timer}</p>}
    </div>
  );
});

export default function Page() {
  const { verify2FA, isPending } = useVerify2FA();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<{
    otp: string;
    email: string;
  }>({
    mode: "all",
    resolver: yupResolver(TwoFASchema),
    defaultValues: {
      otp: "",
      email: email || "",
    },
  });

  const { handleKeyDown, setInputRef, handleKeyUp, values } = useOtpInput(
    4,
    (vals) => {
      setValue("otp", vals.join(""), {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });
    },
  );

  const onSubmit: SubmitHandler<{ otp: string; email: string }> = (data) => {
    verify2FA(
      {
        otp: data.otp,
        email: data.email,
      },
      {
        onSuccess: () => {
          router.replace(callbackUrl || "/");
        },
      },
    );
  };

  if (!email) {
    router.replace("/login");
  }

  return (
    <FormInput config={{ onSubmit: handleSubmit(onSubmit) }}>
      <div className="text-center space-y-1">
        <h2 className="text-foreground text-[20px] font-medium">
          2 Step Verification
        </h2>
        <p className="text-grey-dark text-center">
          Please enter the OTP received to confirm your account ownership. A
          code has been send to{" "}
          <span className="text-foreground">
            {email || "******doe@example.com"}
          </span>
        </p>
      </div>

      <div className="w-full flex flex-col gap-2 items-center">
        <p className="text-danger">{errors.otp?.message}</p>
        <div className="w-full md:max-w-[80%] flex-between">
          {Array.from({ length: 4 }).map((_, index) => (
            <input
              key={index}
              inputMode="numeric"
              maxLength={1}
              ref={(el) => setInputRef(el, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onKeyUp={(e) => handleKeyUp(e, index)}
              onChange={() => {}}
              value={values[index] || ""}
              className={`size-15 outline-none rounded-md ring focus:ring-[#3F8EF3] flex-center text-center font-bold text-lg ${errors.otp?.message ? "ring-danger" : "ring-grey"}`}
              type="text"
            />
          ))}
        </div>
      </div>

      <ResendTimer email={email} />

      <Button
        isLoading={isPending}
        config={{
          type: "submit",
          disabled: !isValid || !isDirty,
        }}
        size="full"
      >
        Submit
      </Button>
    </FormInput>
  );
}
