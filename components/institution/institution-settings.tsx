"use client";
import useTabs from "@/hooks/useTabs";
import DashTitle from "../common/DashTitle";
import Card from "../common/Card";
import {
  GeneralSettings,
  SecuritySettings,
  UserSettings,
} from "../superadmin/SuperadminSettings";
import InputText from "../common/InputText";
import { ICON } from "@/utils/icon-exports";
import Table from "@/ui/Table";
import Button from "../common/Button";
import { Modal, useModal } from "@/ui/Modal";
import PaymentCard from "./PaymentCard";
import { useCancelSubscription } from "@/hooks/institution/useBilling";
import useAdmin from "@/hooks/auth/useAdmin";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  EDIT_INSTITUTION_SCHEMA,
  EditInstitutionFormData,
} from "@/schema/institution-schema";
import FormInput from "../common/FormInput";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import InputTextArea from "../common/InputTextArea";
import useBillingOverview, {
  useBillingHistory,
  useCreateSubscription,
  usePaymentMethods,
  useStripeKey,
} from "@/hooks/institution/useBilling";
import ActivityIndicator from "../common/ActivityIndicator";
import StripeProvider from "../stripe/stripe-provider";
import { useIConfig } from "@/hooks/institution/useIConfig";
import { useModifyConfig } from "@/hooks/useModifyConfig";
import { Icon } from "@iconify/react";
import Skeleton from "../common/Skeleton";
import { useGetPlans } from "@/hooks/superadmin/usePlans";
import UpgradePlan from "../forms/upgrade-plan-form";
import { formatDate, formatValue } from "@/utils/helper-functions";
import ChangePasswordForm from "../forms/Change-password-form";

const tabs = ["general_settings", "billing", "security"];

export default function InstitutionSettings() {
  const { isSuperAdmin, data } = useAdmin();
  const { data: config, isLoading: isConfigLoading } = useIConfig();
  const { tab, setTab, tabRef, tabWidth, containerRef } = useTabs(tabs[0]);
  const { mutateAsync: updateConfig, isPending: isUpdatingConfig } =
    useModifyConfig(data?.institution_id ?? "", isSuperAdmin);

  const handleUpdate = async (
    update: Partial<Admin_Config | InstitutionConfig>,
  ) => {
    try {
      await updateConfig(update);
      toast.success("Settings updated successfully");
    } catch {
      toast.error("Failed to update settings");
    }
  };

  const renderTab = () => {
    switch (tab) {
      case "general_settings":
        return (
          <>
            <GeneralSettings
              {...config}
              isLoading={isConfigLoading || isUpdatingConfig}
              handleUpdate={handleUpdate}
            />
            <UserSettings
              {...config}
              isLoading={isConfigLoading || isUpdatingConfig}
              handleUpdate={handleUpdate}
            />
            <InstitutionInformation />
          </>
        );
      case "billing":
        return (
          <>
            <Billing />
            <PaymentMethods />
            <BillingHistory />
          </>
        );
      case "security":
        return (
          <Modal>
            {/* <SecuritySettings
              {...config}
              isLoading={isConfigLoading || isUpdatingConfig}
              handleUpdate={handleUpdate}
            /> */}
            <div className="flex flex-col gap-3">
              <p className="text-dark font-medium">
                Change Password
              </p>
              <Modal.Trigger name="update-password">
                <Button
                  config={{
                    className: "bg-black!",
                  }}
                  icon={ICON.ARROW_RIGHT}
                >
                  Update Password
                </Button>
              </Modal.Trigger>
            </div>

            <Modal.Window
              hasClose
              title="Update Your Password"
              textStyle="text-[#4B5563]! font-normal!"
              text="Create a strong password to keep your account secure"
              name="update-password"
              className="w-xl! "
            >
         <ChangePasswordForm />
            </Modal.Window>
          </Modal>
        );
      default:
        return <div>General Settings</div>;
    }
  };

  return (
    <section className="w-full section-container bg-white px-4 col-start gap-3">
      <DashTitle title="Configurations" />
      <header className="w-full flex flex-col gap-1">
        <div className="w-full flex items-center gap-3">
          {tabs.map((el, i) => (
            <button
              ref={tab === el ? tabRef : null}
              onClick={() => setTab(el)}
              key={i}
              className={`px-5 py-2 cursor-pointer capitalize transition-colors ${
                tab === el ? "text-primary font-medium" : "text-gray-500"
              }`}
            >
              {el.split("_").join(" ")}
            </button>
          ))}
        </div>
        <div
          ref={containerRef}
          className="relative w-full bg-[#E5E5E5] h-[2px]"
        >
          <span
            style={{
              width: tabWidth.width,
              left: tabWidth.left,
            }}
            className="absolute bg-primary rounded-full h-full transition-all duration-300 ease-out"
          />
        </div>
      </header>

      <section className={`w-full p-6 `}>
        <Card className={`rounded-2xl! ${tab === "billing" && "bg-[#F9F9FA]"}`}>
          <Card.Content className="flex flex-col gap-6 w-full">
            {renderTab()}
          </Card.Content>
        </Card>
      </section>
    </section>
  );
}

function InstitutionInformation() {
  const { isLoading, data } = useAdmin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<EditInstitutionFormData>({
    mode: "all",
    resolver: yupResolver(
      EDIT_INSTITUTION_SCHEMA,
    ) as unknown as Resolver<EditInstitutionFormData>,
    defaultValues: {
      name: data?.institution_name ?? "",
      description: data?.description ?? "",
      contact_email: data?.email ?? "",
      phone: data?.phone ?? "",
      location: "",
      address: data?.address ?? "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data?.institution_name ?? "",
        description: data?.description ?? "",
        contact_email: data?.email ?? "",
        phone: data?.phone ?? "",
        location: "",
        address: data?.address ?? "",
      });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<EditInstitutionFormData> = (
    formData: EditInstitutionFormData,
  ) => {
    console.log("Institution Form Data:", formData);
    toast.success("Institution information updated successfully");
  };

  if (isLoading) {
    return (
      <section className="w-full flex flex-col border-b-2 border-grey pb-8 gap-4">
        <Skeleton className="h-7 w-48 mb-2" />
        <ul className="w-full grid grid-cols-2 gap-8">
          <li className="col-span-2">
            <Skeleton className="h-14 w-full" />
          </li>
          <li>
            <Skeleton className="h-14 w-full" />
          </li>
          <li>
            <Skeleton className="h-14 w-full" />
          </li>
          <li>
            <Skeleton className="h-14 w-full" />
          </li>
          <li>
            <Skeleton className="h-14 w-full" />
          </li>
          <li className="col-span-2">
            <Skeleton className="h-28 w-full" />
          </li>
        </ul>
        <div className="flex justify-end mt-4">
          <Skeleton className="h-10 w-32" />
        </div>
      </section>
    );
  }

  return (
    <FormInput
      config={{
        onSubmit: handleSubmit(onSubmit),
        className: "max-w-full!",
      }}
    >
      <section className="w-full flex flex-col border-b-2 border-grey pb-8 gap-4">
        <h3 className="text-[#454D5A] text-lg font-bold">
          Institution Information
        </h3>
        <ul className="w-full grid grid-cols-2 gap-8">
          <li className="col-span-2">
            <InputText
              label="Institution Name"
              config={{
                placeholder: "Enter institution name",
                ...register("name"),
              }}
              error={!!errors.name}
              errorMessage={errors.name?.message}
            />
          </li>
          <li>
            <InputText
              label="Email Address"
              config={{
                placeholder: "Enter email address",
                type: "email",
                ...register("contact_email"),
              }}
              error={!!errors.contact_email}
              errorMessage={errors.contact_email?.message}
            />
          </li>
          <li>
            <InputText
              label="Phone Number"
              config={{
                placeholder: "Enter phone number",
                ...register("phone"),
              }}
              error={!!errors.phone}
              errorMessage={errors.phone?.message}
            />
          </li>
          <li>
            <InputText
              label="Location (Country)"
              config={{
                placeholder: "Enter country",
                ...register("location"),
              }}
              error={!!errors.location}
              errorMessage={errors.location?.message}
            />
          </li>
          <li>
            <InputText
              label="Address"
              config={{
                placeholder: "Enter physical address",
                ...register("address"),
              }}
              error={!!errors.address}
              errorMessage={errors.address?.message}
            />
          </li>
          <li className="col-span-2">
            <InputTextArea
              label="Description"
              config={{
                placeholder: "Enter institution description",
                ...register("description"),
              }}
              error={!!errors.description}
              errorMessage={errors.description?.message}
            />
          </li>
        </ul>
        <div className="flex justify-end mt-4">
          <Button
            config={{
              type: "submit",
              disabled: !isValid || !isDirty,
            }}
          >
            Save Changes
          </Button>
        </div>
      </section>
    </FormInput>
  );
}

function Billing() {
  const { data: billingOverview, isLoading } = useBillingOverview();

  console.log(billingOverview);

  if (isLoading) {
    return (
      <section className="w-full flex flex-col pb-4 gap-4 animate-pulse">
        <header className="w-full flex-between">
          <div className="h-7 bg-gray-200 rounded-md w-32" />
          <div className="flex gap-3">
            <div className="h-8 bg-gray-200 rounded-full w-24" />
            <div className="h-8 bg-gray-200 rounded-full w-24" />
          </div>
        </header>

        <ul className="w-full flex flex-col gap-5">
          <li className="w-full border-b border-[#0000001A] pb-5">
            <div className="h-6 bg-gray-200 rounded-md w-48 mb-2" />
            <div className="h-4 bg-gray-200 rounded-md w-64" />
          </li>
          <li className="w-full flex flex-col gap-4">
            <div className="h-6 bg-gray-200 rounded-md w-32 mb-2" />
            <div className="h-4 bg-gray-200 rounded-md w-72" />
            <div className="h-16 bg-gray-200 rounded-lg w-full" />
          </li>
        </ul>
      </section>
    );
  }

  if (billingOverview?.status === "inactive")
    return <CanCreateSubscription plan_id={billingOverview?.plan?.id ?? ""} />;

  return (
    <Modal>
      {" "}
      <section className="w-full flex flex-col pb-4 gap-4">
        <header className="w-full flex-between">
          <h3 className="text-[#454D5A] text-lg font-bold">Overview</h3>
          <div className="flex-center gap-3">
            {billingOverview?.status === "active" && (
              <Modal.Trigger name="cancel-subscription">
                <button className="p-2 rounded-full bg-[#0000000A] cursor-pointer hover:shadow-sm ease-in transition-all duration-150 text-black text-xs flex items-center gap-2">
                  Cancel Subscription
                </button>
              </Modal.Trigger>
            )}
            <Modal.Trigger name="upgrade-plan">
              <button className="p-2 rounded-full bg-black cursor-pointer hover:shadow-sm ease-in transition-all duration-150 text-white text-xs">
                Upgrade Plan
              </button>
            </Modal.Trigger>
          </div>
        </header>

        <ul className="w-full flex flex-col gap-5">
          {/* <li className="w-full border-b border-[#0000001A] pb-5 flex flex-col gap-3">
          <h4 className="font-semibold text-black">
            Users{" "}
            <span className="text-[#00000066] font-normal">80 of 100 Used</span>
          </h4>

          <div className="w-full my-3 relative overflow-hidden rounded-full h-2 bg-[#0000000A]">
            <div
              style={{
                width: "40%",
              }}
              className="h-full relative rounded-full ease-in-out transition-all duration-200 bg-[#FBE0AD]"
            ></div>
          </div>

          <p className="text-[#00000066]">
            14 Users remaining until your plan requires update
          </p>
        </li> */}

          <li className="w-full border-b border-[#0000001A] pb-5 ">
            <h4 className="font-semibold text-black">
              Active until{" "}
              {billingOverview?.active_until
                ? formatDate(billingOverview?.active_until, "MMM DD, YYYY")
                : "--"}
            </h4>
            <p className="text-[#00000066]">
              We will send you a notification upon Subscription expiration.
            </p>
          </li>
          <li className="w-full flex flex-col gap-4">
            <div>
              <h4 className="font-semibold text-black">
                {formatValue(Number(billingOverview?.plan?.monthly_rate ?? 0))}{" "}
                Per Month
              </h4>
              <p className="text-[#00000066]">
                {billingOverview?.plan?.description}
              </p>
            </div>

            {/* <div className="p-3 bg-white rounded-lg w-full gap-2 flex">
              <Icon icon={ICON.INFO} fontSize={20} className="shrink-0" />
              <div>
                <h4 className="font-semibold text-black">
                  We need your attention!
                </h4>
                <p className="text-[#00000066] text-xs">
                  Your payment was declined. To start using tools, please{" "}
                  <span className="text-[#ADADFB] cursor-pointer hover:underline">
                    Add Payment Method.
                  </span>
                </p>
              </div>
            </div> */}
          </li>
        </ul>
      </section>
      <UpgradePlan current_plan={billingOverview?.plan} />
      <CancelConfirm active_until={billingOverview?.active_until} />
    </Modal>
  );
}

function CanCreateSubscription({ plan_id }: { plan_id: string }) {
  const { data: adminData } = useAdmin();
  const { mutate, isPending } = useCreateSubscription();
  const { plans, isLoading: isLoadingPlans } = useGetPlans();
  const { data: paymentMethods, isLoading: isLoadingCards } =
    usePaymentMethods();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const activePlan = selectedPlan || plan_id;
  const activeCard =
    selectedCard || paymentMethods?.find((c) => c.is_active)?.id;

  const handleCreate = () => {
    if (!activePlan) return toast.error("Please select a plan");
    if (!activeCard)
      return toast.error("Please select or add a payment method");

    mutate(
      {
        plan_id: activePlan,
        payment_method_id: activeCard,
        institution_id: adminData?.institution_id ?? "",
      },
      {
        onSuccess: () => toast.success("Subscription created successfully"),
        onError: (err) =>
          toast.error(err?.message ?? "Failed to create subscription"),
      },
    );
  };

  return (
    <section className="w-full flex flex-col gap-6">
      <header className="w-full flex flex-col gap-1">
        <h3 className="text-[#454D5A] text-xl font-bold">
          Create Subscription
        </h3>
        <p className="text-[#00000066] text-sm">
          You currently don&apos;t have a subscription, pick a plan and get
          started.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        <h4 className="font-bold text-[#454D5A]">Select a Plan</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isLoadingPlans
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-2xl" />
              ))
            : plans?.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${
                    activePlan === plan.id
                      ? "border-primary bg-primary/5"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-lg">{plan.name}</h4>
                    {activePlan === plan.id && (
                      <Icon
                        icon={ICON.CHECKED}
                        className="text-primary text-xl"
                      />
                    )}
                  </div>
                  <p className="text-2xl font-black mb-1">
                    ${plan.monthly_rate}
                    <span className="text-sm font-normal text-gray-500">
                      /mo
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    {plan.description}
                  </p>
                  <ul className="space-y-2">
                    {Array.isArray(plan?.features) ? (
                      plan?.features?.slice(0, 3)?.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-xs text-gray-600"
                        >
                          <Icon
                            icon={ICON.CHECKMARK}
                            className="text-primary"
                          />
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
              ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <h4 className="font-bold text-[#454D5A]">Select Payment Method</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoadingCards ? (
            <Skeleton className="h-20 w-full rounded-xl" />
          ) : (
            paymentMethods?.map((card) => (
              <div
                key={card.id}
                onClick={() => setSelectedCard(card.id)}
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
                      Expires {card.exp_month}/
                      {card.exp_year.toString().slice(-2)}
                    </span>
                  </div>
                </div>
                {activeCard === card.id && (
                  <Icon icon={ICON.CHECKED} className="text-primary text-lg" />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <Button
        isLoading={isPending}
        config={{
          className: "mt-4",
          onClick: handleCreate,
          disabled: !activePlan || !activeCard,
        }}
        size="full"
      >
        Subscribe Now
      </Button>
    </section>
  );
}

function PaymentMethods() {
  const { data: paymentMethods, isLoading } = usePaymentMethods();
  const { mutate, isLoading: isStripeLoading } = useStripeKey();
  const [x_key, setX_key] = useState("");
  console.log(paymentMethods);

  return (
    <Modal>
      <section className="w-full flex flex-col gap-4">
        <header className="w-full flex-between">
          <h3 className="text-[#454D5A] text-lg font-bold">Payment Methods</h3>
        </header>
        <div className="w-full gap-5 grid grid-cols-2">
          {isLoading
            ? Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-60 w-full rounded-2xl" />
              ))
            : paymentMethods?.map((pm) => (
                <PaymentCard key={pm.id} card={pm} />
              ))}

          <Modal.Trigger
            disabled={isStripeLoading}
            className="col-span-2"
            name="add-card"
          >
            <button
              disabled={isStripeLoading}
              onClick={() =>
                mutate(undefined, {
                  onSuccess: (data) => {
                    setX_key(data?.client_secret ?? "");
                  },
                })
              }
              className="w-full disabled:opacity-50 p-5 cursor-pointer col-span-2 flex-center border-dashed rounded-2xl border gap-1"
            >
              {isStripeLoading ? (
                <>
                  <ActivityIndicator size={20} />
                  Loading...
                </>
              ) : (
                <>
                  <Icon icon={ICON.PLUS} />
                  Add Card
                </>
              )}
            </button>
          </Modal.Trigger>
        </div>
      </section>

      <Modal.Window noClose hasClose name="add-card" className="w-2xl!">
        <StripeProvider
          isLoading={isStripeLoading}
          retry={mutate}
          x_secret_key={x_key}
        />
      </Modal.Window>
    </Modal>
  );
}

// const billing_history = [
//   {
//     date: "Feb 5, 2025",
//     description: "Invoice for October 2025",
//     amount: "$123.79",
//     invoice: "PDF",
//   },
//   {
//     date: "Feb 4, 2025",
//     description: "Invoice for September 2025",
//     amount: "$98.03",
//     invoice: "PDF",
//   },
//   {
//     date: "Feb 3, 2025",
//     description: "Paypal",
//     amount: "$35.07",
//     invoice: "PDF",
//   },
//   {
//     date: "Feb 2, 2025",
//     description: "Invoice for July 2025",
//     amount: "$142.80",
//     invoice: "PDF",
//   },
//   {
//     date: "Feb 1, 2025",
//     description: "Invoice for June 2025",
//     amount: "$123.79",
//     invoice: "PDF",
//   },
// ];

function BillingHistory() {
  const { data: adminData } = useAdmin();
  const { history, isLoading } = useBillingHistory({
    institution_id: adminData?.institution_id ?? "",
  });
  console.log(history);
  return (
    <section className="w-full flex flex-col  gap-4">
      <header className="w-full flex-between">
        <h3 className="text-[#454D5A] text-lg font-bold">Billing History</h3>
      </header>
      <Table columns=".5fr 1fr .5fr .5fr 1fr">
        <Table.Header className="bg-transparent!">
          <p>Date</p>
          <p>Description</p>
          <p>Amount</p>
          <p>Invoice</p>
          <p></p>
        </Table.Header>
        <Table.Body
          isLoading={isLoading}
          data={history ?? []}
          render={(item) => (
            <Table.Row key={item.id}>
              <p>{item?.created_at ? formatDate(item.created_at) : "--"}</p>
              <p>{item?.plan_details?.description}</p>
              <p>{formatValue(Number(item?.amount ?? 0))}</p>
              <p>PDF</p>
              <p></p>
            </Table.Row>
          )}
        />
      </Table>
    </section>
  );
}

function CancelConfirm({ active_until }: { active_until?: string }) {
  const { mutate: cancel, isLoading: isCancelling } = useCancelSubscription();
  const { closeModal } = useModal();

  const handleCancel = () => {
    cancel(undefined, {
      onSuccess: () => {
        toast.success("Subscription cancelled successfully");
        closeModal("cancel-subscription");
      },
      onError: () => toast.error("Failed to cancel subscription"),
    });
  };

  return (
    <Modal.Window
      name="cancel-subscription"
      title="Cancel Subscription"
      hasClose
      className="w-lg!"
    >
      <div className="flex flex-col gap-6">
        <div className="p-4 bg-orange-50 text-orange-800 rounded-xl text-sm border border-orange-100 flex gap-3 items-start">
          <Icon
            icon="solar:danger-circle-bold-duotone"
            className="text-xl shrink-0 mt-0.5"
          />
          <div className="flex flex-col gap-1">
            <h4 className="font-bold">Warning</h4>
            <p>
              Are you sure you want to cancel your subscription? It will{" "}
              <strong>not renew</strong>, but your plan will remain active until{" "}
              <strong>
                {active_until ? formatDate(active_until, "MMM DD, YYYY") : "--"}
              </strong>
              .
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            config={{
              type: "button",
              className: "bg-white! text-black! border! border-gray-200!",
              onClick: () => closeModal("cancel-subscription"),
            }}
          >
            Keep Subscription
          </Button>
          <Button
            isLoading={isCancelling}
            config={{
              onClick: handleCancel,
              className: "bg-red-600! hover:bg-red-700!",
            }}
          >
            Confirm Cancellation
          </Button>
        </div>
      </div>
    </Modal.Window>
  );
}
