import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";
import { Modal } from "@/ui/Modal";
import Button from "../common/Button";
import {
  useSetDefaultPaymentMethod,
  useDeletePaymentMethod,
} from "@/hooks/institution/useBilling";
import toast from "react-hot-toast";

type PaymentCardProps = {
  card: PaymentMethod;
};

const brandIcons: Record<string, string> = {
  visa: "logos:visa",
  mastercard: "logos:mastercard",
  amex: "logos:amex",
  discover: "logos:discover",
  diners_club: "la:cc-diners-club",
  jcb: "logos:jcb",
  unionpay: "logos:unionpay",
  unknown: "fluent:card-ui-24-regular",
};

export default function PaymentCard({ card }: PaymentCardProps) {
  const brandIcon = brandIcons[card.brand.toLowerCase()] || brandIcons.unknown;
  const { mutate: setDefault, isLoading: isSettingDefault } =
    useSetDefaultPaymentMethod();
  const { mutate: deleteCard, isLoading: isActuallyDeleting } =
    useDeletePaymentMethod();

  const handleDelete = () => {
    deleteCard(card.id, {
      onSuccess: () => {
        toast.success("Card deleted successfully");
      },
      onError: (err) => {
        const error = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Failed to delete card",
        );
      },
    });
  };

  return (
    <div
      className={`relative w-full flex flex-col rounded-2xl h-60 p-6 border transition-all duration-200 ${
        card.is_active
          ? "bg-white border-primary shadow-sm"
          : "bg-white border-gray-100 hover:border-gray-200"
      }`}
    >
      <div className="flex justify-between items-start mb-8">
        <div className="h-8 flex text-dark items-center">
          <Icon icon={brandIcon} fontSize={30} />
        </div>
        {card.is_active && (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            <Icon icon={ICON.CHECKED} className="text-sm" />
            Default
          </span>
        )}
      </div>

      <div className="space-y-4 mt-auto">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-2xl leading-none text-gray-400">
                &bull;&bull;&bull;&bull;
              </span>
            ))}
          </div>
          <span className="text-lg font-bold text-gray-700 font-mono">
            {card.last4}
          </span>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-widest mb-0.5">
              Expires
            </p>
            <p className="text-sm font-medium text-gray-600">
              {card.exp_month.toString().padStart(2, "0")}/
              {card.exp_year.toString().slice(-2)}
            </p>
          </div>

          <div className="flex  items-center gap-2">
            {!card.is_active && (
              <button
                disabled={isSettingDefault || isActuallyDeleting}
                onClick={() =>
                  setDefault(card.id, {
                    onSuccess: () => {
                      toast.success("Payment method set as default");
                    },
                    onError: (err) => {
                      toast.error(
                        err?.message ??
                          "Failed to set payment method as default",
                      );
                    },
                  })
                }
                className="text-xs cursor-pointer font-medium text-primary hover:underline disabled:opacity-50"
              >
                {isSettingDefault ? "Updating..." : "Set as Default"}
              </button>
            )}
            <Modal.Trigger name={`delete-card-${card.id}`}>
              <button
                disabled={isActuallyDeleting || isSettingDefault}
                className="p-2 cursor-pointer rounded-lg text-gray-400 hover:text-danger hover:bg-danger/5 transition-colors disabled:opacity-50"
                title="Delete Card"
              >
                <Icon icon={ICON.TRASH} fontSize={18} />
              </button>
            </Modal.Trigger>
          </div>
        </div>
      </div>

      <Modal.Window
        name={`delete-card-${card.id}`}
        title="Delete Payment Method"
        // text="Are you sure you want to delete this card? This action cannot be undone."
        hasClose
        className="w-xl!"
      >
        <ConfirmDelete
          card={card}
          brandIcon={brandIcon}
          isLoading={isActuallyDeleting}
          onDelete={handleDelete}
        />
      </Modal.Window>
    </div>
  );
}

function ConfirmDelete({
  card,
  brandIcon,
  onDelete,
  onCloseModal,
  isLoading,
}: {
  card: PaymentMethod;
  brandIcon: string;
  onDelete?: () => void;
  isLoading?: boolean;
} & onCloseModal) {
  return (
    <div className="flex flex-col gap-6 w-full pb-6">
      <p className="text-sm text-center text-gray-500">
        Are you sure you want to delete this card? This action cannot be undone.
      </p>
      <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
        <Icon icon={brandIcon} fontSize={24} />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-700">
            •••• •••• •••• {card.last4}
          </span>
          <span className="text-xs text-gray-500">
            Expires {card.exp_month.toString().padStart(2, "0")}/
            {card.exp_year.toString().slice(-2)}
          </span>
        </div>
      </div>

      <div className="flex gap-3 justify-end mt-4">
        <Button
          variants="outlined"
          config={{
            type: "button",
            onClick: () => onCloseModal?.(),
            disabled: isLoading,
          }}
        >
          Cancel
        </Button>
        <Button
          variants="danger"
          config={{ type: "button", onClick: () => onDelete?.() }}
          isLoading={isLoading}
        >
          Confirm Delete
        </Button>
      </div>
    </div>
  );
}
