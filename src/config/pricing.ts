/**
 * Pricing configuration placeholder.
 *
 * Future home for destination-tier pricing tiers, commission rates,
 * and promotional overrides. Currently inert — no runtime impact.
 */

import type { DestinationTier } from "../data/types";

export interface TierPricing {
  /** Average nightly hotel rate (USD) for display/sorting heuristics */
  readonly avgNightlyRate: number;
  /** Average round-trip flight cost (USD) from a generic origin */
  readonly avgFlightCost: number;
  /** Overall budget indicator label */
  readonly budgetLabel: string;
}

export const TIER_PRICING: Record<DestinationTier, TierPricing> = {
  curated: {
    avgNightlyRate: 80,
    avgFlightCost: 350,
    budgetLabel: "Mid-range",
  },
  "first-class": {
    avgNightlyRate: 200,
    avgFlightCost: 700,
    budgetLabel: "Premium",
  },
  exclusive: {
    avgNightlyRate: 450,
    avgFlightCost: 1200,
    budgetLabel: "Luxury",
  },
};
