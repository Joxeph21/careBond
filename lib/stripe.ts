import { loadStripe } from "@stripe/stripe-js";

const key = process.env.NEXT_PUBLIC_STRIPE_PKEY;

export const stripePromise = loadStripe("pk_test_51SnjCcDU77RQlXKX3A5ON0sAYDLL9dDYX7vUVt0UPQKbNQ1R6fYmklBQvj4gvyL0JDSbSdeInuyIK4uqPmnF0niJ00XzjdUSEb");
