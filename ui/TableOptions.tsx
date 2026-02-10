import Button from "@/components/common/Button";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React from "react";
import { Modal } from "./Modal";
import ActionPopup from "./ActionPopup";

export default function TableOptions({
  ids,
  hasSuspend,
  onConfirmDelete,
  onConfirmSuspend,
  name = "item",
  suspendLabel = "suspend",
}: {
  ids: string[];
  hasSuspend?: boolean;
  onConfirmDelete?: () => void;
  onConfirmSuspend?: () => void;
  name?: string;
  suspendLabel?: string;
}) {
  return (
    <Modal>
      <div className="flex items-center gap-2">
        <Modal.Trigger name="delete-items">
          <Button
            config={{
              className: "text-[#474747]! capitalize gap-1! ",
            }}
            size="medium"
            variants="outlined"
          >
            <Icon icon={ICON.TRASH} />
            Delete {ids.length} {name}
            {ids.length > 1 ? "s" : ""}
          </Button>
        </Modal.Trigger>

        {hasSuspend && (
          <Modal.Trigger name="suspend-items">
            <Button
              config={{
                className: "text-[#474747]! capitalize gap-1! ",
              }}
              size="medium"
              variants="outlined"
            >
              <Icon icon={"line-md:account-delete"} />
              {suspendLabel} {ids.length} {name}
              {ids.length > 1 ? "s" : ""}
            </Button>
          </Modal.Trigger>
        )}
      </div>

      <Modal.Window className="py-0! gap-0!" name="delete-items">
        <ActionPopup
          type="delete"
          isPlural={ids.length > 1}
          name={name}
          onConfirm={onConfirmDelete}
        />
      </Modal.Window>

      {hasSuspend && (
        <Modal.Window className="py-0! gap-0!" name="suspend-items">
          <ActionPopup
            type="suspend"
            title={`${suspendLabel} ${name}${ids.length > 1 ? "s" : ""}`}
            isPlural={ids.length > 1}
            name={name}
            onConfirm={onConfirmSuspend}
            description={`Are you sure you want to ${suspendLabel} ${ids.length > 1 ? "these" : "this"} ${name}${ids.length > 1 ? "s" : ""}?`}
          />
        </Modal.Window>
      )}
    </Modal>
  );
}
