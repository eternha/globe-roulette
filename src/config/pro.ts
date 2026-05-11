/**
 * Travel Roulette Pro — pricing plans and benefit definitions.
 *
 * All pricing is centralized here. UI components read from this
 * config and never hardcode prices or benefit labels.
 */

/* ── Plan identifiers ───────────────────────────────────────── */

export type ProPlanId =
  | "pro_lifetime"
  | "pro_annual"
  | "itinerary_pack"
  | "group_trip_room";

/* ── Plan definitions ───────────────────────────────────────── */

export interface ProPlan {
  readonly id: ProPlanId;
  readonly name: string;
  readonly price: number;
  readonly currency: string;
  /** Human-readable billing period (empty for one-time purchases) */
  readonly period: string;
  readonly highlight?: string;
  readonly enabled: boolean;
}

export const PRO_PLANS: Record<ProPlanId, ProPlan> = {
  pro_lifetime: {
    id: "pro_lifetime",
    name: "Pro Lifetime",
    price: 4.99,
    currency: "USD",
    period: "one-time",
    highlight: "Best value",
    enabled: true,
  },
  pro_annual: {
    id: "pro_annual",
    name: "Pro Annual",
    price: 19.99,
    currency: "USD",
    period: "year",
    enabled: true,
  },
  itinerary_pack: {
    id: "itinerary_pack",
    name: "AI Itinerary Pack",
    price: 1.99,
    currency: "USD",
    period: "one-time",
    enabled: false,
  },
  group_trip_room: {
    id: "group_trip_room",
    name: "Group Trip Room",
    price: 1.99,
    currency: "USD",
    period: "one-time",
    enabled: false,
  },
};

/** Get the primary Pro plans shown in the upgrade modal. */
export function getVisiblePlans(): readonly ProPlan[] {
  return Object.values(PRO_PLANS).filter((p) => p.enabled);
}

/** Format a price for display (e.g. "$4.99"). */
export function formatPrice(plan: ProPlan): string {
  return `$${plan.price.toFixed(2)}`;
}

/** Format price with period (e.g. "$19.99/year" or "$4.99 one-time"). */
export function formatPriceWithPeriod(plan: ProPlan): string {
  const base = formatPrice(plan);
  if (plan.period === "one-time") return base;
  return `${base}/${plan.period}`;
}

/* ── Pro benefits ───────────────────────────────────────────── */

export interface ProBenefit {
  readonly emoji: string;
  readonly label: string;
  readonly description: string;
  /** Whether this benefit is available now or coming soon */
  readonly available: boolean;
}

export const PRO_BENEFITS: readonly ProBenefit[] = [
  {
    emoji: "🎯",
    label: "Smart filters",
    description: "Filter by budget, season, vibe, and continent",
    available: false,
  },
  {
    emoji: "🗳",
    label: "Group voting",
    description: "Create trip rooms and vote with friends",
    available: false,
  },
  {
    emoji: "✨",
    label: "AI itineraries",
    description: "Generate personalized day-by-day trip plans",
    available: false,
  },
  {
    emoji: "💎",
    label: "Premium destinations",
    description: "Unlock first-class and exclusive destination tiers",
    available: false,
  },
  {
    emoji: "📌",
    label: "Unlimited saves",
    description: "Save as many destinations as you want",
    available: true,
  },
  {
    emoji: "🚫",
    label: "No ads",
    description: "Clean experience with no sponsored placements",
    available: false,
  },
];

/** Get all benefits for display. */
export function getProBenefits(): readonly ProBenefit[] {
  return PRO_BENEFITS;
}

/* ── Coming-soon mode ───────────────────────────────────────── */

/**
 * When true, the Pro modal shows "Coming soon" / "Notify me"
 * instead of a real purchase CTA.
 */
export const PRO_COMING_SOON = true;
