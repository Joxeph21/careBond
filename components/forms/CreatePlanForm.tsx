"use client";
import React from "react";
import FormInput from "../common/FormInput";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { ICON } from "@/utils/icon-exports";
import { useForm, Resolver, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CREATE_PLAN_SCHEMA } from "@/schema/plan-schema";
import { formatValue } from "@/utils/helper-functions";
import { useCreatePlan } from "@/hooks/superadmin/usePlans";
import { useRouter } from "next/navigation";

export default function CreatePlanForm() {
  const router = useRouter();
  const { create, isPending } = useCreatePlan();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
    setValue,
  } = useForm<EditPlan>({
    mode: "all",
    resolver: yupResolver(CREATE_PLAN_SCHEMA) as Resolver<EditPlan>,
    defaultValues: {
      name: "",
      description: "",
      features: [""],
      monthly_rate: null,
      yearly_rate: null,
      promo_codes: [""],
    },
  });

  const features = useWatch({
    control,
    name: "features",
  });

  const promoCodes = useWatch({
    control,
    name: "promo_codes",
  });

  const yearlyRate = useWatch({
    control,
    name: "yearly_rate",
  });

  const onSubmit = (data: EditPlan) => {
    create(data, {
      onSuccess: () => {
        router.replace("/plans");
      },
    });
  };

  return (
    <section className="w-full h-full pb-5  p-3">
      <FormInput
        config={{
          onSubmit: handleSubmit(onSubmit),
          className: "",
        }}
      >
        <InputText
          error={!!errors.name}
          errorMessage={errors.name?.message}
          config={{
            type: "text",
            className: "py-3!",
            placeholder: "Standard",
            ...register("name"),
          }}
          label="Plan Title"
        />
        <InputText
          error={!!errors.description}
          errorMessage={errors.description?.message}
          config={{
            type: "text",
            className: "py-3!",
            placeholder: "For proffessionals & team",
            ...register("description"),
          }}
          label="Description"
        />

        <section className="w-full col-center gap-4">
          <p className="self-start">Features</p>
          {features.map((_, i) => (
            <div className="flex items-start gap-2 w-full" key={i}>
              <InputText
                config={{
                  className: "py-3!",
                  ...register(`features.${i}`),
                  placeholder: "Unlimited files",
                }}
                error={!!errors.features?.[i]}
                errorMessage={errors.features?.[i]?.message}
              />
              {features.length > 1 && (
                <Button
                  config={{
                    className: "p-3!",
                    onClick: () =>
                      setValue(
                        "features",
                        features.filter((_, j) => j !== i),
                      ),
                  }}
                  variants="danger"
                  size="small"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}

          <Button
            config={{
              className: "rounded-full! gap-2! pr-3",
              onClick: () => setValue("features", [...features, ""]),
            }}
            variants="accent"
            size="medium"
            iconPlacement="left"
            icon={ICON.STARS}
          >
            Add New Plan Feature
          </Button>
        </section>
        <section className="w-full col-center gap-4">
          <p className="self-start">Promo Code (optional)</p>
          {promoCodes?.map((_, i) => (
            <div className="flex items-center gap-2 w-full" key={i}>
              <InputText
                key={i}
                config={{
                  className: "py-3!",
                  placeholder: "Enter promo code",
                  ...register(`promo_codes.${i}`),
                }}
                error={!!errors.promo_codes?.[i]}
                errorMessage={errors.promo_codes?.[i]?.message}
              />
              <Button
                config={{
                  className: "p-3!",
                  onClick: () =>
                    setValue(
                      "promo_codes",
                      promoCodes.filter((_, j) => j !== i),
                    ),
                }}
                variants="danger"
                size="small"
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            config={{
              className: "rounded-full! gap-2! pr-3",
              onClick: () => {
                setValue("promo_codes", [...(promoCodes as string[]), ""]);
              },
            }}
            variants="accent"
            size="medium"
            iconPlacement="left"
            icon={ICON.GIFT}
          >
            Add New Promo Code
          </Button>
        </section>

        <section className="w-full flex items-start mt-4 gap-5 max-w-lg self-start">
          <InputText
            config={{
              className: "py-3!",
              ...register("monthly_rate"),
              placeholder: "$90",
            }}
            label="Monthly Rate (one month)"
            error={!!errors.monthly_rate}
            errorMessage={errors.monthly_rate?.message}
          />
          <div className="w-full flex flex-col gap-2">
            <InputText
              config={{
                className: "py-3!",
                ...register("yearly_rate"),
                placeholder: "$80",
              }}
              label="Yearly Rate (Month per year)"
              error={!!errors.yearly_rate}
              errorMessage={errors.yearly_rate?.message}
            />
            {yearlyRate && yearlyRate >= 50 && (
              <p className="text-xs text-[#474747] font-semibold">
                * Users will be billed{" "}
                {formatValue(Number(yearlyRate ?? 1) * 12)} annually
              </p>
            )}
          </div>
        </section>

        <section className="flex-center w-full justify-end! gap-4 pb-5">
          <Button link href="/plans" variants="outlined">
            Cancel
          </Button>
          <Button
            config={{
              type: "submit",
              disabled: !isValid,
            }}
            isLoading={isPending}
          >
            Submit
          </Button>
        </section>
      </FormInput>
    </section>
  );
}
