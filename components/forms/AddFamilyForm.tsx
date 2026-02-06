import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FAMILY_SCHEMA, FamilyFormData } from "@/schema/family-schema";
import FormInput from "../common/FormInput";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { useCreateFamilyMember } from "@/hooks/institution/usePatients";

export default function AddFamilyForm({ onCloseModal }: onCloseModal) {
  const { create_family, isPending } = useCreateFamilyMember();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<FamilyFormData>({
    resolver: yupResolver(FAMILY_SCHEMA),
    mode: "all",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address_line_1: "",
      address_line_2: "",
    },
  });

  const handleFormSubmit: SubmitHandler<FamilyFormData> = (data) => {
    create_family(data, {
      onSuccess: () => {
        onCloseModal?.();
      },
    });
  };
  return (
    <FormInput
      config={{
        className: "max-w-full!",
        onSubmit: handleSubmit(handleFormSubmit),
      }}
    >
      <section className="w-full grid gap-6 grid-cols-2">
        <InputText
          config={{
            placeholder: "Enter first name",
            className: "py-3!",
            ...register("first_name"),
          }}
          label="First Name"
          error={!!errors.first_name}
          errorMessage={errors.first_name?.message}
        />
        <InputText
          config={{
            placeholder: "Enter last name",
            className: "py-3!",
            ...register("last_name"),
          }}
          label="Last Name"
          error={!!errors.last_name}
          errorMessage={errors.last_name?.message}
        />
        <div className="col-span-2">
          <InputText
            config={{
              type: "email",
              placeholder: "Enter email address",
              className: "py-3!",
              ...register("email"),
            }}
            label="Email"
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />
        </div>
        <InputText
          config={{
            placeholder: "Enter phone number",
            className: "py-3!",
            ...register("phone"),
          }}
          label="Phone number"
          error={!!errors.phone}
          errorMessage={errors.phone?.message}
        />
        <InputText
          config={{
            placeholder: "Enter address line 1",
            className: "py-3!",
            ...register("address_line_1"),
          }}
          label="Address Line 1"
          error={!!errors.address_line_1}
          errorMessage={errors.address_line_1?.message}
        />
        <div className="col-span-2">
          <InputText
            config={{
              placeholder: "Enter address line 2",
              className: "py-3!",
              ...register("address_line_2"),
            }}
            label="Address Line 2 (optional)"
            error={!!errors.address_line_2}
            errorMessage={errors.address_line_2?.message}
          />
        </div>
      </section>
      <div className="flex items-center w-full gap-2 justify-end mt-4">
        <Button
          config={{
            className: "text-primary!",
            type: "button",
            onClick: () => reset(),
          }}
          variants="outlined"
        >
          Reset
        </Button>
        <Button
          isLoading={isPending}
          config={{
            type: "submit",
            disabled: !isValid || !isDirty || isPending,
          }}
        >
          Submit
        </Button>
      </div>
    </FormInput>
  );
}
