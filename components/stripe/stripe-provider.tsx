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

const client_secret =
  "seti_1SxTAbDU77RQlXKXX36NG2UL_secret_TvJogFgjEJ82k4ybq53GNBLNpt27Fyi";

export default function StripeProvider({
  isLoading,
  retry,
  x_secret_key,
}: {
  isLoading?: boolean;
  retry?: () => void;
  x_secret_key?: string;
}) {
  if (isLoading)
    return (
      <section className="w-full flex-center min-h-60">
        <ActivityIndicator className="text-primary" />
      </section>
    );

  if (x_secret_key && !isLoading) {
    return <Errored retry={retry} />;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: client_secret, appearance: { theme: "stripe" } }}
    >
      <CardForm />
    </Elements>
  );
}

function Errored({ retry }: { retry?: () => void }) {
  return (
    <section className="w-full pb-3  flex-center">
      <div className="flex flex-col items-center gap-2">
        <span className="size-20 rounded-full my-5 flex-center text-danger bg-danger/20">
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="pb-3 w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <PaymentElement className="w-full" />
      <Button
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
