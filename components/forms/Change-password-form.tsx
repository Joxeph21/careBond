import React from "react";
import Card from "../common/Card";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePasswordShema } from "@/schema/auth-schema";
import { useChangePassword } from "@/hooks/auth/useAuth";

type ChangePasswordFormData = {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
};

export default function ChangePasswordForm({ onCloseModal }: onCloseModal) {
  const { changePasword, isPending } = useChangePassword();
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm<ChangePasswordFormData>({
    mode: "all",
    resolver: yupResolver(ChangePasswordShema),
    defaultValues: {
      old_password: "",
      new_password: "",
      new_password_confirm: "",
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordFormData> = (formData) => {
    changePasword(formData, {
      onSuccess: () => {
        onCloseModal?.();
      },
    });
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Card.Content className="flex flex-col pb-16 gap-4">
          <InputText
            config={{
              type: "password",
              placeholder: "Enter current password",
              ...register("old_password"),
            }}
            label="Current Password"
            error={!!errors.old_password}
            errorMessage={errors.old_password?.message}
          />
          <InputText
            config={{
              type: "password",
              placeholder: "Enter new password",
              ...register("new_password"),
            }}
            label="New Password"
            error={!!errors.new_password}
            errorMessage={errors.new_password?.message}
          />
          <InputText
            config={{
              type: "password",
              placeholder: "Confirm new password",
              ...register("new_password_confirm"),
            }}
            label="Confirm your New Password"
            error={!!errors.new_password_confirm}
            errorMessage={errors.new_password_confirm?.message}
          />

          <div className="mt-4 w-full rounded-2xl mb-12 ring flex flex-col gap-2 ring-[#BFDBFE] bg-[#EFF6FF] p-4">
            <h4 className="text-[#1E40AF] font-medium">
              Use at least 8 characters with a mix of letters, numbers &
              symbols:
            </h4>
            <ul className="list-disc ml-4 text-[#1D4ED8] space-y-1">
              <li>At least 8 characters</li>
              <li>Lowercase letter</li>
              <li>Uppercase letter</li>
              <li>Number</li>
            </ul>
          </div>

          <Button
            isLoading={isPending}
            config={{
              type: "submit",
              disabled: !isValid || !isDirty,
            }}
            size="full"
          >
            Update Password
          </Button>
        </Card.Content>
      </Card>
    </form>
  );
}
