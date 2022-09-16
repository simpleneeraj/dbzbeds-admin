import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null> | null = null;

const getStripe = () => {
  const KEY = process.env.NEXT_PUBLIC_PUBLISHABLE_KEY || '';
  if (!stripePromise) {
    stripePromise = loadStripe(KEY);
  }
  return stripePromise;
};

export default getStripe;
