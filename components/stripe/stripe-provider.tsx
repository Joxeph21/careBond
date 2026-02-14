import { Icon } from "@iconify/react";
import ActivityIndicator from "../common/ActivityIndicator";
import Button from "../common/Button";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import useAdmin from "@/hooks/auth/useAdmin";
import {
  useAddPaymentMethod,
} from "@/hooks/institution/useBilling";
import toast from "react-hot-toast";
import { useState } from "react";

export default function StripeProvider({
  isLoading,
  retry,
  x_secret_key,
  onCloseModal,
}: {
  isLoading?: boolean;
  retry?: () => void;
  x_secret_key?: string;
  onCloseModal?: () => void;
}) {
  if (isLoading || !x_secret_key)
    return (
      <section className="w-full flex-center min-h-60">
        <ActivityIndicator className="text-primary" />
      </section>
    );

  if (!x_secret_key && !isLoading) {
    return <Errored retry={retry} />;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: x_secret_key, appearance: { theme: "stripe" } }}
    >
      <CardForm onCloseModal={onCloseModal} />
    </Elements>
  );
}

function Errored({ retry }: { retry?: () => void }) {
  return (
    <section className="w-full pb-3  flex-center">
      <div className="flex flex-col items-center gap-2">
        <span className="size-20 rounded-full my-5 flex-center text-danger bg-danger-soft-hover">
          <Icon icon={"solar:card-line-duotone"} fontSize={30} />
        </span>
        <h4 className="text-lg font-medium">Could not initialize card setup</h4>
        <p className="text-sm text-center max-w-[80%] mx-auto mb-4 text-gray-500">
          We encountered an error while setting up the secure card collection
          form. Please try again or contact support if the issue persists.
        </p>
        <Button
          variants="danger"
          config={{
            onClick: () => retry?.(),
          }}
        >
          Retry
        </Button>
      </div>
    </section>
  );
}

function CardForm({ onCloseModal }: onCloseModal) {
  const { data } = useAdmin();
  const { mutate, isLoading: isPending } = useAddPaymentMethod();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      setLoading(true);
      const { error, setupIntent } = await stripe.confirmSetup({
        elements,
        redirect: "if_required",
      });

      if (error) {
        console.log(error);
        toast.error(error.message ?? "Failed to add card");
      }

      if (setupIntent?.status === "succeeded") {
        mutate(
          {
            institution_id: data?.institution_id ?? "",
            payment_method_id: (setupIntent?.payment_method as string) ?? "",
            set_as_default: true,
          },
          {
            onSuccess: () => {
              toast.success("Card added successfully");
              onCloseModal?.();
            },
            onError: () => {
              toast.error("Failed to add card");
            },
          },
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="pb-3 w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <PaymentElement className="w-full" />
      <Button
        isLoading={loading || isPending}
        config={{
          type: "submit",
        }}
        size="full"
      >
        Add Card
      </Button>
    </form>
  );
}
