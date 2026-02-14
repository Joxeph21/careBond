import React, { useEffect } from "react";
import FormInput from "../common/FormInput";
import InputText from "../common/InputText";
import Button from "../common/Button";
// import Select from "../common/Select";
import InputTextArea from "../common/InputTextArea";
import Skeleton from "../common/Skeleton";
import { useGetPlans } from "@/hooks/superadmin/usePlans";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  INSTITUTION_SCHEMA,
  InstitutionFormData,
} from "@/schema/institution-schema";
import {
  useCreateInstitution,
  useEditInstitution,
} from "@/hooks/superadmin/useInstitutions";
import usePaginatorParams from "@/hooks/usePaginatorParams";

export default function CreateInstitutionForm({
  onCloseModal,
  type,
  data,
}: { type?: "create" | "edit"; data?: Institution } & onCloseModal) {
  const params = usePaginatorParams({searchKey: "sq"})
  const { create, isPending } = useCreateInstitution();
  const { edit, isPending: isEditing } = useEditInstitution();
  const { plans, isLoading } = useGetPlans(params);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },

    reset,
  } = useForm<InstitutionFormData>({
    mode: "all",
    resolver: yupResolver(INSTITUTION_SCHEMA),

    defaultValues: {
      name: data?.name ?? "",
      description: data?.description ?? "",
      contact_email: data?.contact_email ?? "",
      phone: data?.phone ?? "",
      location: data?.location ?? "",
      address: data?.address ?? "",
      plan: data?.plan ?? "",
    },
  });


  const onSubmit = (val: InstitutionFormData) => {
    if (type === "edit") {
      if (!data) return;
      edit(
        { id: data?.id, data: val },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        },
      );
    } else {
      create(val, {
        onSuccess: () => {
          onCloseModal?.();
        },
      });
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        name: data.name ?? "",
        description: data.description ?? "",
        contact_email: data.contact_email ?? "",
        phone: data.phone ?? "",
        location: data.location ?? "",
        address: data.address ?? "",
        plan: data.plan ?? "",
      });
    }
  }, [data, reset]);

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
            placeholder: "Company Name",
            ...register("name"),
          }}
          label="Company Name"
          error={!!errors.name}
          errorMessage={errors.name?.message}
        />
      </div>
      <div className="col-span-2">
        <InputTextArea
          config={{
            className: "py-3!",
            placeholder: "For professionals & team",
            ...register("description"),
          }}
          label="Description"
          error={!!errors.description}
          errorMessage={errors.description?.message}
        />
      </div>
      <div className="col-span-2">
        <InputText
          config={{
            className: "py-3!",
            placeholder: "Enter company email",
            ...register("contact_email"),
          }}
          label="Email"
          error={!!errors.contact_email}
          errorMessage={errors.contact_email?.message}
        />
      </div>
      <InputText
        config={{
          className: "py-3!",
          placeholder: "Enter phone number",
          ...register("phone"),
        }}
        label="Phone Number"
        error={!!errors.phone}
        errorMessage={errors.phone?.message}
      />
      <InputText
        config={{
          className: "py-3!",
          placeholder: "Enter country",
          ...register("location"),
        }}
        label="Country"
        error={!!errors.location}
        errorMessage={errors.location?.message}
      />
      <div className="col-span-2">
        <InputText
          config={{
            className: "py-3!",
            placeholder: "Enter institution address",
            ...register("address"),
          }}
          label="Institution Address"
          error={!!errors.address}
          errorMessage={errors.address?.message}
        />
      </div>

      <div className="col-span-2 w-full gap-3 flex flex-col">
        {/* <p>Choose Plan </p> */}
        {/* <section className="w-full flex-center bg-blue-50 rounded-md h-32">
          <p className="flex-center gap-1 text-[#86929E]">
            <Icon icon={ICON.PLUS} /> Select a Plan
          </p>
        </section> */}
        <Controller
          name="plan"
          control={control}
          render={({ field }) => (
            // <Select
            //   hasSearch
            //   variant="regular"
            //   isLoading={isLoading}
            //   name="Plans"
            //   placeholder="Select Plans"
            //   size="full"
            //   defaultValue={field.value}
            //   data={
            //     plans?.map((plan) => ({ label: plan.name, value: plan.id })) ??
            //     []
            //   }
            //   label="Choose Plan"
            //   onChange={(val) => field.onChange(val)}
            //   error={!!errors.plan}
            //   errorMessage={errors.plan?.message}
            //   required
            // />
            <>
              <p>Choose Plan</p>
              <ul className="w-full flex flex-wrap items-center gap-4">
                {isLoading
                  ? [1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-12 w-32 rounded-lg" />
                    ))
                  : plans?.map((el) => {
                      const isSelected = el.id === field.value;
                      return (
                        <button
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          className={`${isSelected ? "bg-primary text-white" : "bg-[#f3f5f9] text-[#474747]"} cursor-pointer px-4 py-3 rounded-lg`}
                          key={el.id}
                          onClick={() => field.onChange(el.id)}
                        >
                          {el.name + " Plan"}
                        </button>
                      );
                    })}
              </ul>
            </>
          )}
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
            disabled: !isValid || !isDirty || isEditing,
          }}
        >
          Submit
        </Button>
      </section>
    </FormInput>
  );
}
