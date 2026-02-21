/**
 * Heal from Within — Stripe configuration
 * Uses Stripe Payment Links for client-side redirects (no backend required).
 * TODO: When backend is added, swap redirectToCheckout() for Stripe.js Checkout Sessions.
 */

export const STRIPE_PRODUCTS = {
  starter: {
    name: "Starter",
    price: 47,
    displayPrice: "$47",
    description: "Pick any single module",
    // TODO: Replace with real Stripe price ID
    priceId: "price_PLACEHOLDER_STARTER",
    // TODO: Replace with real Stripe Payment Link URL
    paymentLink: "https://buy.stripe.com/PLACEHOLDER_STARTER",
  },
  full: {
    name: "Full Academy",
    price: 197,
    displayPrice: "$197",
    description: "Get the complete journey",
    // TODO: Replace with real Stripe price ID
    priceId: "price_PLACEHOLDER_FULL",
    // TODO: Replace with real Stripe Payment Link URL
    paymentLink: "https://buy.stripe.com/PLACEHOLDER_FULL",
  },
  vip: {
    name: "VIP Bundle",
    price: 297,
    displayPrice: "$297",
    description: "The full experience",
    // TODO: Replace with real Stripe price ID
    priceId: "price_PLACEHOLDER_VIP",
    // TODO: Replace with real Stripe Payment Link URL
    paymentLink: "https://buy.stripe.com/PLACEHOLDER_VIP",
  },
} as const;

export type StripeTier = keyof typeof STRIPE_PRODUCTS;

/**
 * Redirect to Stripe checkout for a given tier.
 * TODO: Replace with Stripe.js redirectToCheckout() when backend Checkout Session is set up.
 */
export function redirectToCheckout(tier: StripeTier, selectedModuleId?: number) {
  const product = STRIPE_PRODUCTS[tier];
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const successUrl = `${origin}/heal-from-within/success`;
  const cancelUrl = `${origin}/heal-from-within/cancel`;

  const params = new URLSearchParams({
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
  if (selectedModuleId) {
    params.set("client_reference_id", `module_${selectedModuleId}`);
  }

  window.location.href = `${product.paymentLink}?${params.toString()}`;
}
