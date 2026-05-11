/**
 * Itinerary feature configuration.
 *
 * Centralizes available styles, duration options, Pro gating
 * rules, and pricing references for the itinerary feature.
 */

import type { ItineraryStyle } from "../types/itinerary";
import { PRO_PLANS, formatPrice } from "./pro";

/* ── Style metadata ─────────────────────────────────────────── */

export interface StyleMeta {
  readonly id: ItineraryStyle;
  readonly label: string;
  readonly emoji: string;
  readonly description: string;
}

export const ITINERARY_STYLES: readonly StyleMeta[] = [
  {
    id: "first_time",
    label: "First time",
    emoji: "🌟",
    description: "Must-see highlights and landmarks",
  },
  {
    id: "romantic",
    label: "Romantic",
    emoji: "💕",
    description: "Intimate spots and couples experiences",
  },
  {
    id: "budget",
    label: "Budget",
    emoji: "💰",
    description: "Free attractions and affordable gems",
  },
  {
    id: "food",
    label: "Food & drink",
    emoji: "🍽",
    description: "Local cuisine, markets, and tastings",
  },
  {
    id: "adventure",
    label: "Adventure",
    emoji: "🧗",
    description: "Outdoor activities and adrenaline rushes",
  },
  {
    id: "family",
    label: "Family",
    emoji: "👨‍👩‍👧‍👦",
    description: "Kid-friendly activities and easy logistics",
  },
  {
    id: "luxury",
    label: "Luxury",
    emoji: "👑",
    description: "Premium experiences and fine dining",
  },
  {
    id: "weekend",
    label: "Weekend",
    emoji: "⚡",
    description: "Fast-paced 48-hour highlight reel",
  },
];

/** Get style metadata by ID. */
export function getStyleMeta(id: ItineraryStyle): StyleMeta {
  return ITINERARY_STYLES.find((s) => s.id === id) ?? ITINERARY_STYLES[0];
}

/* ── Duration options ───────────────────────────────────────── */

export interface DurationOption {
  readonly days: number;
  readonly label: string;
}

export const DURATION_OPTIONS: readonly DurationOption[] = [
  { days: 2, label: "2 days" },
  { days: 3, label: "3 days" },
  { days: 5, label: "5 days" },
  { days: 7, label: "7 days" },
];

/* ── Monetization mode ──────────────────────────────────────── */

export type ItineraryAccessMode =
  | "free"
  | "pro_included"
  | "standalone_purchase";

/**
 * Current access mode for the itinerary feature.
 *
 * - "free": anyone can generate (mock only for now)
 * - "pro_included": requires Pro subscription
 * - "standalone_purchase": one-time itinerary pack purchase
 */
export const ITINERARY_ACCESS_MODE: ItineraryAccessMode = "pro_included";

/**
 * Get the itinerary pack pricing for display in the paywall.
 * Falls back to the Pro lifetime plan if the itinerary pack is disabled.
 */
export function getItineraryPricingLabel(): string {
  const pack = PRO_PLANS.itinerary_pack;
  if (pack.enabled) {
    return `${formatPrice(pack)} one-time`;
  }
  const pro = PRO_PLANS.pro_lifetime;
  return `Included with Pro (${formatPrice(pro)})`;
}
