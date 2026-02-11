import useAdmin from "@/hooks/auth/useAdmin";
import {
  usePaymentMethods,
  useUpgradePlan,
} from "@/hooks/institution/useBilling";
import { useGetPlans } from "@/hooks/superadmin/usePlans";
import { Modal, useModal } from "@/ui/Modal";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../common/Button";
import Skeleton from "../common/Skeleton";

type FormState = {
  plan_id: string;
  payment_method_id: string;
};

export default function UpgradePlan({
  current_plan,
}: {
  current_plan: Plan | undefined;
}) {
  const [currStep, setCurrStep] = useState(1);
  const { data: adminData } = useAdmin();
  const { mutate: upgradePlan, isLoading: isPending } = useUpgradePlan();

  const steps = [
    {
      title: "Choose Plan",
      description: "Choose the plan that best suits your needs",
      content: <SelectPlan currentPlanId={current_plan?.id} />,
    },
    {
      title: "Payment",
      description: "Select a payment method",
      content: <Payment />,
    },
  ];

  const methods = useForm<FormState>({
    mode: "onChange",
    defaultValues: {
      plan_id: "",
      payment_method_id: "",
    },
  });

  const { trigger, handleSubmit, getValues, reset } = methods;
  const { closeModal } = useModal();

  const next = async () => {
    let isValid = false;
    if (currStep === 1) {
      isValid = await trigger("plan_id");
      if (!getValues("plan_id")) {
        toast.error("Please select a plan");
        return;
      }
    }

    if (isValid) setCurrStep((prev) => prev + 1);
  };

  const prev = () => {
    setCurrStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setCurrStep(1);
    reset();
  };

  const onSubmit = async (data: FormState) => {
    upgradePlan(
      {
        plan_id: data.plan_id,
        institution_id: adminData?.institution_id ?? "",
      },
      {
        onSuccess: () => {
          toast.success("Plan upgraded successfully");
          closeModal("upgrade-plan");
        },
      },
    );
  };

  return (
    <Modal.Window
      hasClose
      noClose
      onClose={handleReset}
      hasBack={currStep > 1}
      backFunc={prev}
      className="w-5xl!"
      title={steps[currStep - 1].title}
      text={steps[currStep - 1].description}
      name="upgrade-plan"
      textStyle="text-sm! text-gray-600!"
      titleLeft
    >
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full overflow-x-hidden relative flex-col gap-2"
        >
          <div className="flex justify-end  w-full p-4">
            {currStep < steps.length && (
              <Button
                config={{
                  type: "button",
                  onClick: next,
                }}
              >
                Next : Payment Method
              </Button>
            )}
          </div>
          {steps[currStep - 1].content}

          <div className="flex justify-end  w-full p-4 bg-white border-t border-gray-100">
            {currStep >= steps.length && (
              <Button
                isLoading={isPending}
                config={{
                  type: "submit",
                }}
              >
                Confirm Upgrade
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </Modal.Window>
  );
}

function SelectPlan({ currentPlanId }: { currentPlanId?: string }) {
  const { plans, isLoading } = useGetPlans();
  const { setValue, watch } = useFormContext<FormState>();
  const selectedPlanId = watch("plan_id");

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 w-full md:grid-cols-3 gap-4">
      {plans?.map((plan) => {
        const isCurrent = plan.id === currentPlanId;
        return (
          <div
            key={plan.id}
            onClick={() =>
              !isCurrent &&
              setValue("plan_id", plan.id, { shouldValidate: true })
            }
            className={`relative p-5 rounded-2xl border-2 transition-all ${
              isCurrent
                ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-75"
                : "cursor-pointer " +
                  (selectedPlanId === plan.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-100 bg-white hover:border-gray-200")
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-lg line-clamp-1">{plan.name}</h4>
              {isCurrent ? (
                <span className="bg-gray-200 text-gray-700 text-[10px] uppercase font-bold px-2 py-1 rounded-full">
                  Current
                </span>
              ) : (
                selectedPlanId === plan.id && (
                  <Icon icon={ICON.CHECKED} className="text-primary text-xl" />
                )
              )}
            </div>
            <p className="text-2xl font-black mb-1">
              ${plan.monthly_rate}
              <span className="text-sm font-normal text-gray-500">/mo</span>
            </p>
            <p className="text-xs text-gray-500 mb-4">{plan.description}</p>
            <ul className="space-y-2">
              {Array.isArray(plan?.features) ? (
                plan?.features?.slice(0, 3)?.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-gray-600"
                  >
                    <Icon icon={ICON.CHECKMARK} className="text-primary" />
                    {feature}
                  </li>
                ))
              ) : (
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <Icon icon={ICON.CHECKMARK} className="text-primary" />
                  {plan?.features}
                </li>
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function Payment() {
  const { data: paymentMethods, isLoading } = usePaymentMethods();
  const { setValue, watch } = useFormContext<FormState>();
  const selectedPaymentId = watch("payment_method_id");

  const activeCard =
    selectedPaymentId || paymentMethods?.find((c) => c.is_active)?.id;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {paymentMethods?.map((card) => (
        <div
          key={card.id}
          onClick={() =>
            setValue("payment_method_id", card.id, { shouldValidate: true })
          }
          className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all ${
            activeCard === card.id
              ? "border-primary bg-primary/5"
              : "border-gray-100 bg-white hover:border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-50">
              <Icon icon="solar:card-2-bold" className="text-gray-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">•••• {card.last4}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                Expires {card.exp_month}/{card.exp_year.toString().slice(-2)}
              </span>
            </div>
          </div>
          {activeCard === card.id && (
            <Icon icon={ICON.CHECKED} className="text-primary text-lg" />
          )}
        </div>
      ))}
    </div>
  );
}
