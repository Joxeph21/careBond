import Button from "@/components/common/Button";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React from "react";
import { Modal } from "./Modal";
import ActionPopup from "./ActionPopup";

export default function TableOptions({ ids }: { ids: string[] }) {
  return (
    <Modal>
      <div className="flex items-center gap-2">
        <Modal.Trigger name="delete-items">
          <Button
            config={{
              className: "text-[#474747]! gap-1! ",
            }}
            size="medium"
            variants="outlined"
          >
            <Icon icon={ICON.TRASH} />
            Delete {ids.length} item{ids.length > 1 ? "s" : ""}
          </Button>
        </Modal.Trigger>
      </div>

      <Modal.Window name="delete-items">
        <ActionPopup type="delete" name="Items" mode />
      </Modal.Window>
    </Modal>
  );
}
