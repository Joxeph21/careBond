import { formatValue } from "@/utils/helper-functions";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React from "react";
import Button from "./Button";
import { Modal } from "@/ui/Modal";
import EditPlanForm from "../forms/EditPlanForm";

export default function SubscriptionCard({
  title,
  activeTab,
  description,
  features,
  priceInMonth,
  priceInYearly,
}: { activeTab: "yearly" | "monthly" } & Plan) {
  return (
    <Modal>
      <li className="ring ring-[#E5E7EB] rounded-2xl flex flex-col gap-7 p-8 w-85 h-full">
        <div className="space-y-1.5">
          <h6 className="text-lg font-semibold">{title}</h6>
          <p className="yext-[#6B7280]">{description}</p>
        </div>

        <p className="text-3xl font-bold text-black">
          {formatValue(activeTab === "yearly" ? priceInYearly : priceInMonth)}
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
          {features.map((el, i) => (
            <li className="flex items-center gap-1 text-black" key={i}>
              <span>
                <Icon icon={ICON.CHECKMARK} color="#9CA3AF" fontSize={18} />
              </span>
              {el}
            </li>
          ))}
        </ul>
      </li>

      <Modal.Window
      hasClose
      className="max-w-2xl w-full!"
      title="Edit Plan"
      name="edit-plan">
       <EditPlanForm />
      </Modal.Window>
    </Modal>
  );
}
