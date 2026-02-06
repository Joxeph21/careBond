import { formatValue } from "@/utils/helper-functions";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import Button from "./Button";
import { Modal } from "@/ui/Modal";
import EditPlanForm from "../forms/EditPlanForm";

export default function SubscriptionCard({
  name,
  activeTab,
  description,
  features,
  monthly_rate,
  yearly_rate,
  isLoading,
  ...rest
}: { activeTab?: "yearly" | "monthly" } & Partial<Plan> & {
    isLoading?: boolean;
  }) {
  if (isLoading) {
    return (
      <li className="ring ring-[#E5E7EB] rounded-2xl flex flex-col gap-7 p-8 w-85 h-full bg-white animate-pulse">
        <div className="space-y-3">
          <div className="h-7 bg-gray-200 rounded-md w-1/2" />
          <div className="h-4 bg-gray-200 rounded-md w-3/4" />
        </div>

        <div className="h-9 bg-gray-200 rounded-md w-1/3" />

        <div className="h-10 bg-gray-200 rounded-xl w-full" />

        <ul className="w-full flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <li className="flex items-center gap-3" key={i}>
              <div className="size-5 rounded-full bg-gray-200 shrink-0" />
              <div className="h-4 bg-gray-200 rounded-md w-full" />
            </li>
          ))}
        </ul>
      </li>
    );
  }

  const props = {
    name,
    activeTab,
    description,
    features,
    monthly_rate,
    yearly_rate,
    isLoading,
    ...rest,
  };

  return (
    <Modal>
      <li className="ring ring-[#E5E7EB] rounded-2xl flex flex-col gap-7 p-8 w-85 h-full">
        <div className="space-y-1.5">
          <h6 className="text-lg font-semibold">{name}</h6>
          {description && <p className="text-[#6B7280]">{description}</p>}
        </div>

        <p className="text-3xl font-bold text-black">
          {formatValue(
            activeTab && activeTab === "yearly"
              ? (Number(yearly_rate) ?? 0)
              : (Number(monthly_rate) ?? 0),
          )}{" "}
          <span className="text-xs font-medium text-[#6B7280]">/ Month</span>
        </p>

        <Modal.Trigger name="edit-plan">
          <Button
            config={{
              className:
                "ring-primary! hover:opacity-100! rounded-xl! py-2! text-primary hover:bg-primary hover:text-white",
            }}
            size="full"
            variants="outlined"
          >
            Edit
          </Button>
        </Modal.Trigger>

        <ul className="w-full flex flex-col gap-3">
          {Array.isArray(features) ? (
            features?.map((el, i) => (
              <li className="flex items-center gap-1 text-black" key={i}>
                <span>
                  <Icon icon={ICON.CHECKMARK} color="#9CA3AF" fontSize={18} />
                </span>
                {el}
              </li>
            ))
          ) : typeof features === "string" ? (
            <li className="flex items-center gap-1 text-black">
              <span>
                <Icon icon={ICON.CHECKMARK} color="#9CA3AF" fontSize={18} />
              </span>
              {features}
            </li>
          ) : null}
        </ul>
      </li>

      <Modal.Window
        hasClose
        className="max-w-2xl w-full!"
        title="Edit Plan"
        name="edit-plan"
      >
        <EditPlanForm plan={props} />
      </Modal.Window>
    </Modal>
  );
}
