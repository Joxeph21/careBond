import { loadStripe } from "@stripe/stripe-js";

const key = process.env.NEXT_PUBLIC_STRIPE_PKEY;

export const stripePromise = loadStripe(key!);
