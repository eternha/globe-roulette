/**
 * Group Trip Room configuration.
 *
 * Preference options, default room settings, Pro gating rules,
 * and pricing references for the group trip feature.
 */

import type {
  BudgetLevel,
  ClimatePreference,
  NightlifeLevel,
  TripCategory,
} from "../types/groupTrip";
import type { Continent } from "../data/types";
import { PRO_PLANS, formatPriceWithPeriod } from "./pro";

/* ── Preference option metadata ────────────────────────────── */

export interface OptionMeta<T extends string> {
  readonly id: T;
  readonly label: string;
  readonly emoji: string;
}

export const BUDGET_OPTIONS: readonly OptionMeta<BudgetLevel>[] = [
  { id: "budget", label: "Budget", emoji: "🎒" },
  { id: "moderate", label: "Moderate", emoji: "🧳" },
  { id: "luxury", label: "Luxury", emoji: "💎" },
];

export const CLIMATE_OPTIONS: readonly OptionMeta<ClimatePreference>[] = [
  { id: "warm", label: "Warm", emoji: "☀️" },
  { id: "mild", label: "Mild", emoji: "🌤" },
  { id: "cold", label: "Cold", emoji: "❄️" },
  { id: "any", label: "Any", emoji: "🌍" },
];

export const NIGHTLIFE_OPTIONS: readonly OptionMeta<NightlifeLevel>[] = [
  { id: "none", label: "Quiet", emoji: "🌙" },
  { id: "some", label: "Some", emoji: "🍷" },
  { id: "lots", label: "Party", emoji: "🎉" },
];

export const CATEGORY_OPTIONS: readonly OptionMeta<TripCategory>[] = [
  { id: "beach", label: "Beach", emoji: "🏖" },
  { id: "city", label: "City", emoji: "🏙" },
  { id: "nature", label: "Nature", emoji: "🌿" },
  { id: "adventure", label: "Adventure", emoji: "🧗" },
  { id: "culture", label: "Culture", emoji: "🏛" },
];

export const CONTINENT_OPTIONS: readonly OptionMeta<Continent>[] = [
  { id: "europe", label: "Europe", emoji: "🇪🇺" },
  { id: "asia", label: "Asia", emoji: "🌏" },
  { id: "north-america", label: "North America", emoji: "🌎" },
  { id: "south-america", label: "South America", emoji: "🌎" },
  { id: "africa", label: "Africa", emoji: "🌍" },
  { id: "oceania", label: "Oceania", emoji: "🏝" },
  { id: "middle-east", label: "Middle East", emoji: "🕌" },
];

export const DURATION_OPTIONS: readonly { days: number; label: string }[] = [
  { days: 3, label: "3 days" },
  { days: 5, label: "5 days" },
  { days: 7, label: "1 week" },
  { days: 14, label: "2 weeks" },
];

/* ── Default room settings ─────────────────────────────────── */

/** Maximum members allowed in a single trip room. */
export const MAX_ROOM_MEMBERS = 8;

/** Maximum active rooms per user (for future limits). */
export const MAX_ACTIVE_ROOMS = 3;

/* ── Member emoji palette ──────────────────────────────────── */

const MEMBER_EMOJIS = [
  "🧑‍✈️", "🧳", "🏄", "🚀", "🌍",
  "🎒", "⛵", "🗺",
] as const;

/** Pick a deterministic emoji for a member by index. */
export function getMemberEmoji(index: number): string {
  return MEMBER_EMOJIS[index % MEMBER_EMOJIS.length];
}

/* ── Pro gating ────────────────────────────────────────────── */

/**
 * Access mode for group trip rooms.
 *
 * - "free": anyone can create rooms (no paywall)
 * - "pro_included": rooms are available for Pro subscribers
 * - "standalone_purchase": rooms require a one-time purchase
 */
export type GroupRoomAccessMode = "free" | "pro_included" | "standalone_purchase";

export const GROUP_ROOM_ACCESS_MODE: GroupRoomAccessMode =
  (import.meta.env.VITE_GROUP_ROOM_ACCESS_MODE as GroupRoomAccessMode | undefined) ?? "pro_included";

/** Whether group rooms are in "coming soon" mode. */
export const GROUP_ROOMS_COMING_SOON = true;

/* ── Pricing label ─────────────────────────────────────────── */

export function getGroupRoomPricingLabel(): string {
  if (GROUP_ROOM_ACCESS_MODE === "free") return "Free";
  if (GROUP_ROOM_ACCESS_MODE === "pro_included") return "Included with Pro";

  const plan = PRO_PLANS.group_trip_room;
  return formatPriceWithPeriod(plan);
}

/* ── Copy ───────────────────────────────────────────────────── */

export const GROUP_ROOM_DESCRIPTION =
  "Create a shared Trip Room, invite friends, collect preferences and let Globe Roulette choose the best destination for everyone.";

export const GROUP_ROOM_FEATURES: readonly { emoji: string; label: string; description: string }[] = [
  {
    emoji: "👥",
    label: "Invite friends",
    description: "Share a link and collect everyone's travel preferences",
  },
  {
    emoji: "🎯",
    label: "Smart matching",
    description: "We find destinations that fit the whole group",
  },
  {
    emoji: "🗳",
    label: "Group voting",
    description: "Vote on top matches and pick your trip together",
  },
  {
    emoji: "✨",
    label: "AI itinerary",
    description: "Generate a personalized plan for the group",
  },
];
