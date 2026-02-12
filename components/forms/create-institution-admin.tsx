import {
  useCreateIAdmin,
  useInfiniteQueryGetInstitutions,
} from "@/hooks/superadmin/useInstitutions";
import React from "react";
import FormInput from "../common/FormInput";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  INSTITUTION_ADMIN_SCHEMA,
  InstitutionAdminFormData,
} from "@/schema/institution-admin-schema";
import Select from "../common/Select";
import { ICON } from "@/utils/icon-exports";
import { useSearchParams } from "next/navigation";

export default function CreateInstitutionAdminForm({
  onCloseModal,
}: onCloseModal) {
  const searchParams = useSearchParams();
  const sq = searchParams.get("sq") || "";
  const { create, isPending } = useCreateIAdmin();
  const {
    institutions,
    isLoading: isLoadingInstitutions,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQueryGetInstitutions(sq);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<InstitutionAdminFormData>({
    mode: "all",
    resolver: yupResolver(INSTITUTION_ADMIN_SCHEMA),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      password: "",
      institution_id: "",
    },
  });

  const onSubmit: SubmitHandler<InstitutionAdminFormData> = (data) => {
    create(data, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  };

  return (
    <FormInput
      config={{
        className: "grid! grid-cols-2",
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <div className="col-span-2">
        <InputText
          config={{
            className: "py-3!",
            placeholder: "Enter full name",
            ...register("full_name"),
          }}
          label="Full Name"
          error={!!errors.full_name}
          errorMessage={errors.full_name?.message}
        />
      </div>

      <div className="col-span-2">
        <Controller
          name="institution_id"
          control={control}
          render={({ field }) => (
            <Select
              required
              variant="regular"
              size="full"
              label="Select Institution"
              placeholder="Choose an institution"
              isLoading={isLoadingInstitutions}
              data={institutions?.map((inst) => ({
                label: inst.name,
                value: inst.id,
              }))}
              onChange={(val) => field.onChange(val)}
              defaultValue={field.value}
              error={!!errors.institution_id}
              errorMessage={errors.institution_id?.message}
              icon={ICON.CARET_DOWN2}
              hasSearch
              hasInfinteQuery={hasNextPage}
              fetchingNextPage={isFetchingNextPage}
              onIntersect={() => fetchNextPage()}
            />
          )}
        />
      </div>

      <InputText
        config={{
          className: "py-3!",
          type: "email",
          placeholder: "Enter email address",
          ...register("email"),
        }}
        label="Email Address"
        error={!!errors.email}
        errorMessage={errors.email?.message}
      />
      <InputText
        config={{
          className: "py-3!",
          placeholder: "Enter Phone Number",
          ...register("phone"),
        }}
        label="Phone"
        error={!!errors.phone}
        errorMessage={errors.phone?.message}
      />
      <div className="col-span-2">
        <InputText
          config={{
            type: "password",
            className: "py-3!",
            placeholder: "Create admin password",
            ...register("password"),
          }}
          label="Create Password"
          error={!!errors.password}
          errorMessage={errors.password?.message}
        />
      </div>
      <section className="flex-center col-span-2 w-full justify-end! gap-4 pb-5">
        <Button
          variants="outlined"
          config={{ type: "button", onClick: () => reset() }}
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
      </section>
    </FormInput>
  );
}
