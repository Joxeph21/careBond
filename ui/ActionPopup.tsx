import Button from "@/components/common/Button";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React from "react";

type PopupProps = {
  type: "delete" | "suspend";
  onCancel?: () => void;
  onConfirm?: () => void;
  title?: string;
  name: string;
  description?: string;
};

export default function ActionPopup({
  name,
  type,
  description,
  onCancel,
  onConfirm,
  title,
}: PopupProps) {
  return (
    // <section className='w-full h-screen fixed bg-black/20 inset-0 flex-center'>

    <dialog className="w-lg px-4 py-3 relative col-between rounded-2xl bg-white">
      <button
        onClick={() => onCancel?.()}
        type="button"
        className="absolute top-2 right-2"
      >
        <Icon icon={ICON.CANCEL} fontSize={28} />
      </button>

      <h4 className="capitalize">{title ?? `${type} ${name}`}</h4>

      <div className="col-center gap-2">
        {/* <Icon /> */}

        <p>{description ?? `Are you sure you want to ${type} this ${name}?`}</p>
      </div>

      <div className="flex-center w-full self-end">
        <Button
          config={{
            onClick: () => onConfirm?.(),
            className: "capitalize",
          }}
          variants="danger"
        >
          Confirm {type}
        </Button>
      </div>
    </dialog>
    // </section>
  );
}
