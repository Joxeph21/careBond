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
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";
import Table from "@/ui/Table";
import Button from "../common/Button";
import { Modal } from "@/ui/Modal";
import useAdmin from "@/hooks/auth/useAdmin";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  INSTITUTION_SCHEMA,
  InstitutionFormData,
} from "@/schema/institution-schema";
import FormInput from "../common/FormInput";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import InputTextArea from "../common/InputTextArea";
import useBillingOverview, {
  useStripeKey,
} from "@/hooks/institution/useBilling";
import ActivityIndicator from "../common/ActivityIndicator";
import StripeProvider from "../stripe/stripe-provider";

const tabs = ["general_settings", "billing", "security"];

export default function InstitutionSettings() {
  const { data: billingOverview } = useBillingOverview();
  const { tab, setTab, tabRef, tabWidth, containerRef } = useTabs(tabs[0]);

  console.log(billingOverview);

  const renderTab = () => {
    switch (tab) {
      case "general_settings":
        return (
          <>
            <GeneralSettings />
            <UserSettings />
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
            <SecuritySettings />
            <Modal.Trigger name="update-password">
              <Button
                config={{
                  className: "bg-black!",
                }}
                size="full"
                icon={ICON.ARROW_RIGHT}
              >
                Update Password
              </Button>
            </Modal.Trigger>

            <Modal.Window
              hasClose
              title="Update Your Password"
              textStyle="text-[#4B5563]! font-normal!"
              text="Create a strong password to keep your account secure"
              name="update-password"
              className="w-xl! "
            >
              <Card>
                <Card.Content className="flex flex-col pb-16 gap-4">
                  <InputText
                    config={{
                      type: "password",
                      placeholder: "Enter current password",
                    }}
                    label="Current Password"
                  />
                  <InputText
                    config={{
                      type: "password",
                      placeholder: "Enter new password",
                    }}
                    label="New Password"
                  />
                  <InputText
                    config={{
                      type: "password",
                      placeholder: "Confirm new password",
                    }}
                    label="Confirm your New Password"
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

                  <Button size="full">Update Password</Button>
                </Card.Content>
              </Card>
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

  console.log(data);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<InstitutionFormData>({
    mode: "all",
    resolver: yupResolver(INSTITUTION_SCHEMA),
    defaultValues: {
      name: data?.institution_name ?? "",
      description: data?.description ?? "",
      contact_email: data?.email ?? "",
      phone: data?.phone ?? "",
      location: "",
      address: data?.address ?? "",
      plan: "",
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
        plan: "",
      });
    }
  }, [data, reset]);

  const onSubmit = (formData: InstitutionFormData) => {
    console.log("Institution Form Data:", formData);
    toast.success("Institution information updated successfully");
  };

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
          {/* Plan field is required by schema, adding a hidden or default value if not needed in UI */}
          <input type="hidden" {...register("plan")} value="Basic" />
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
  return (
    <section className="w-full flex flex-col pb-4 gap-4">
      <header className="w-full flex-between">
        <h3 className="text-[#454D5A] text-lg font-bold">Overview</h3>
        <div className="flex-center gap-3">
          <button className="p-2 rounded-full bg-[#0000000A] cursor-pointer hover:shadow-sm ease-in transition-all duration-150 text-black text-xs">
            Cancel Subscription
          </button>
          <button className="p-2 rounded-full bg-black cursor-pointer hover:shadow-sm ease-in transition-all duration-150 text-white text-xs">
            Upgrade Plan
          </button>
        </div>
      </header>

      <ul className="w-full flex flex-col gap-5">
        <li className="w-full border-b border-[#0000001A] pb-5 flex flex-col gap-3">
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
        </li>

        <li className="w-full border-b border-[#0000001A] pb-5 ">
          <h4 className="font-semibold text-black">Active until Dec 9, 2025</h4>
          <p className="text-[#00000066]">
            We will send you a notification upon Subscription expiration.
          </p>
        </li>
        <li className="w-full flex flex-col gap-4">
          <div>
            <h4 className="font-semibold text-black">$24.99 Per Month</h4>
            <p className="text-[#00000066]">
              Extended Pro Package. Up to 100 Agents & 25 Projects.
            </p>
          </div>

          <div className="p-3 bg-white rounded-lg w-full gap-2 flex">
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
          </div>
        </li>
      </ul>
    </section>
  );
}

function PaymentMethods() {
  const { mutate, isLoading } = useStripeKey();
  const [x_key, setX_key] = useState("")
  return (
    <Modal>
      <section className="w-full flex flex-col  gap-4">
        <header className="w-full flex-between">
          <h3 className="text-[#454D5A] text-lg font-bold">Payment Methods</h3>
        </header>
        <div className="w-full gap-5 grid grid-cols-2">
          <div className="w-full rounded-2xl bg-white p-4 h-48"></div>
          <div className="w-full rounded-2xl bg-white p-4 h-48"></div>
          <Modal.Trigger disabled={isLoading} className="col-span-2" name="add-card">
            <button
              disabled={isLoading}
              onClick={() => mutate(undefined, {
                onSuccess: (data) => {
                  setX_key(data?.client_secret ?? "")
                }
              })}
              className="w-full disabled:opacity-50 p-5 cursor-pointer col-span-2 flex-center border-dashed rounded-2xl border gap-1"
            >
              {isLoading ? (
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
        <StripeProvider  isLoading={isLoading} retry={mutate} x_secret_key={x_key} />
      </Modal.Window>
    </Modal>
  );
}

const billing_history = [
  {
    date: "Feb 5, 2025",
    description: "Invoice for October 2025",
    amount: "$123.79",
    invoice: "PDF",
  },
  {
    date: "Feb 4, 2025",
    description: "Invoice for September 2025",
    amount: "$98.03",
    invoice: "PDF",
  },
  {
    date: "Feb 3, 2025",
    description: "Paypal",
    amount: "$35.07",
    invoice: "PDF",
  },
  {
    date: "Feb 2, 2025",
    description: "Invoice for July 2025",
    amount: "$142.80",
    invoice: "PDF",
  },
  {
    date: "Feb 1, 2025",
    description: "Invoice for June 2025",
    amount: "$123.79",
    invoice: "PDF",
  },
];

function BillingHistory() {
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
          data={billing_history}
          render={(item) => (
            <Table.Row key={item.description}>
              <p>{item.date}</p>
              <p>{item.description}</p>
              <p>{item.amount}</p>
              <p>{item.invoice}</p>
              <p></p>
            </Table.Row>
          )}
        />
      </Table>
    </section>
  );
}
