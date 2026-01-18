// Stripe Subscription Plans Configuration
// Update these Product IDs after creating them in Stripe Dashboard

export const STRIPE_PLANS = {
  starter: {
    name: "Starter",
    priceId: "price_starter", // Replace with actual Stripe Price ID
    price: 1900, // $19.00 in cents
    currency: "usd",
    interval: "month" as const,
    features: [
      "Access to 1 Course",
      "Basic Email Support",
      "Community Access",
    ],
  },
  proScholar: {
    name: "Pro Scholar",
    priceId: "price_pro_scholar", // Replace with actual Stripe Price ID
    price: 4900, // $49.00 in cents
    currency: "usd",
    interval: "month" as const,
    features: [
      "Unlimited Course Access",
      "Completion Certificates",
      "Priority Support",
      "Downloadable Resources",
      "Kingdom Labs Access",
    ],
    recommended: true,
  },
  team: {
    name: "Team / Group",
    priceId: "price_team", // Replace with actual Stripe Price ID
    price: 14900, // $149.00 in cents
    currency: "usd",
    interval: "month" as const,
    features: [
      "5 User Seats Included",
      "Admin Dashboard",
      "Progress Reporting",
      "Bulk Enrollment",
      "Dedicated Success Manager",
    ],
  },
} as const;

export type PlanType = keyof typeof STRIPE_PLANS;

export function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(0)}`;
}

export function getPlanByPriceId(priceId: string): PlanType | null {
  for (const [key, plan] of Object.entries(STRIPE_PLANS)) {
    if (plan.priceId === priceId) {
      return key as PlanType;
    }
  }
  return null;
}
