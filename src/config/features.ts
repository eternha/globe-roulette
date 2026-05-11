/**
 * Feature flags for monetization and experimental features.
 *
 * All flags default to false (off). Toggle via VITE_ environment
 * variables or override in code during development.
 */

import type {
  MonetizationFeatureFlag,
  ProFeatureFlag,
} from "../types/monetization";
import type { ItineraryFeatureFlag } from "../types/itinerary";
import type { GroupTripFeatureFlag } from "../types/groupTrip";
import type { SponsorshipFeatureFlag } from "../types/sponsorship";
import type { DestinationPackFeatureFlag } from "../types/destinationPack";

/* ── Monetization flags ─────────────────────────────────────── */

const flags: Record<MonetizationFeatureFlag, boolean> = {
  monetization_enabled:
    import.meta.env.VITE_MONETIZATION_ENABLED === "true",
  show_affiliate_links:
    import.meta.env.VITE_SHOW_AFFILIATE_LINKS === "true",
  show_booking_section:
    import.meta.env.VITE_SHOW_BOOKING_SECTION === "true",
  show_affiliate_disclosure:
    import.meta.env.VITE_SHOW_AFFILIATE_DISCLOSURE === "true",
  show_sponsored_placements:
    import.meta.env.VITE_SHOW_SPONSORED_PLACEMENTS === "true",
};

/**
 * Check whether a monetization feature flag is enabled.
 *
 * The `monetization_enabled` master flag gates all other flags —
 * if it's off, every child flag returns false.
 */
export function isFeatureEnabled(flag: MonetizationFeatureFlag): boolean {
  if (flag === "monetization_enabled") {
    return flags.monetization_enabled;
  }
  return flags.monetization_enabled && flags[flag];
}

/**
 * Check if any monetization feature is active.
 * Quick guard for early-return in components.
 */
export function isMonetizationActive(): boolean {
  return flags.monetization_enabled;
}

/* ── Pro flags ──────────────────────────────────────────────── */

const proFlags: Record<ProFeatureFlag, boolean> = {
  enable_pro:
    (import.meta.env.VITE_ENABLE_PRO ?? "true") === "true",
  enable_pro_teaser:
    (import.meta.env.VITE_ENABLE_PRO_TEASER ?? "true") === "true",
  enable_pro_modal:
    (import.meta.env.VITE_ENABLE_PRO_MODAL ?? "true") === "true",
  enable_payment_placeholder:
    (import.meta.env.VITE_ENABLE_PAYMENT_PLACEHOLDER ?? "true") === "true",
  enable_budget_filters:
    (import.meta.env.VITE_ENABLE_BUDGET_FILTERS ?? "false") === "true",
  enable_season_filters:
    (import.meta.env.VITE_ENABLE_SEASON_FILTERS ?? "false") === "true",
  enable_vibe_filters:
    (import.meta.env.VITE_ENABLE_VIBE_FILTERS ?? "false") === "true",
  enable_premium_destination_packs:
    (import.meta.env.VITE_ENABLE_PREMIUM_DESTINATION_PACKS ?? "false") === "true",
};

/**
 * Check whether a Pro feature flag is enabled.
 *
 * The `enable_pro` master flag gates all child Pro flags —
 * if it's off, every child returns false.
 */
export function isProFlagEnabled(flag: ProFeatureFlag): boolean {
  if (flag === "enable_pro") {
    return proFlags.enable_pro;
  }
  return proFlags.enable_pro && proFlags[flag];
}

/* ── Itinerary flags ────────────────────────────────────────── */

const itineraryFlags: Record<ItineraryFeatureFlag, boolean> = {
  enable_ai_itinerary:
    (import.meta.env.VITE_ENABLE_AI_ITINERARY ?? "true") === "true",
  enable_mock_itinerary:
    (import.meta.env.VITE_ENABLE_MOCK_ITINERARY ?? "true") === "true",
  enable_ai_itinerary_pro_gate:
    (import.meta.env.VITE_ENABLE_AI_ITINERARY_PRO_GATE ?? "true") === "true",
  enable_itinerary_purchase_placeholder:
    (import.meta.env.VITE_ENABLE_ITINERARY_PURCHASE_PLACEHOLDER ?? "true") === "true",
};

/**
 * Check whether an itinerary feature flag is enabled.
 *
 * The `enable_ai_itinerary` master flag gates all child flags.
 */
export function isItineraryFlagEnabled(flag: ItineraryFeatureFlag): boolean {
  if (flag === "enable_ai_itinerary") {
    return itineraryFlags.enable_ai_itinerary;
  }
  return itineraryFlags.enable_ai_itinerary && itineraryFlags[flag];
}

/* ── Group Trip Room flags ─────────────────────────────────── */

const groupTripFlags: Record<GroupTripFeatureFlag, boolean> = {
  enable_group_rooms:
    (import.meta.env.VITE_ENABLE_GROUP_ROOMS ?? "true") === "true",
  enable_mock_group_rooms:
    (import.meta.env.VITE_ENABLE_MOCK_GROUP_ROOMS ?? "true") === "true",
  enable_group_room_pro_gate:
    (import.meta.env.VITE_ENABLE_GROUP_ROOM_PRO_GATE ?? "true") === "true",
  enable_group_voting:
    (import.meta.env.VITE_ENABLE_GROUP_VOTING ?? "true") === "true",
  enable_group_preference_matching:
    (import.meta.env.VITE_ENABLE_GROUP_PREFERENCE_MATCHING ?? "false") === "true",
  enable_invite_placeholder:
    (import.meta.env.VITE_ENABLE_INVITE_PLACEHOLDER ?? "true") === "true",
};

/**
 * Check whether a group trip feature flag is enabled.
 *
 * The `enable_group_rooms` master flag gates all child flags.
 */
export function isGroupTripFlagEnabled(flag: GroupTripFeatureFlag): boolean {
  if (flag === "enable_group_rooms") {
    return groupTripFlags.enable_group_rooms;
  }
  return groupTripFlags.enable_group_rooms && groupTripFlags[flag];
}

/* ── Sponsorship flags ─────────────────────────────────────── */

const sponsorshipFlags: Record<SponsorshipFeatureFlag, boolean> = {
  enable_sponsorship:
    (import.meta.env.VITE_ENABLE_SPONSORSHIP ?? "false") === "true",
  enable_destination_of_the_week:
    (import.meta.env.VITE_ENABLE_DESTINATION_OF_THE_WEEK ?? "false") === "true",
  enable_sponsored_inspiration:
    (import.meta.env.VITE_ENABLE_SPONSORED_INSPIRATION ?? "false") === "true",
  enable_partner_collections:
    (import.meta.env.VITE_ENABLE_PARTNER_COLLECTIONS ?? "false") === "true",
  enable_travel_tool_partners:
    (import.meta.env.VITE_ENABLE_TRAVEL_TOOL_PARTNERS ?? "false") === "true",
  enable_newsletter_partner:
    (import.meta.env.VITE_ENABLE_NEWSLETTER_PARTNER ?? "false") === "true",
};

/**
 * Check whether a sponsorship feature flag is enabled.
 *
 * The `enable_sponsorship` master flag gates all child flags.
 * All sponsorship flags default to false (disabled).
 */
export function isSponsorshipFlagEnabled(flag: SponsorshipFeatureFlag): boolean {
  if (flag === "enable_sponsorship") {
    return sponsorshipFlags.enable_sponsorship;
  }
  return sponsorshipFlags.enable_sponsorship && sponsorshipFlags[flag];
}

/* ── Destination pack flags ────────────────────────────────── */

const packFlags: Record<DestinationPackFeatureFlag, boolean> = {
  enable_destination_packs:
    (import.meta.env.VITE_ENABLE_DESTINATION_PACKS ?? "false") === "true",
  enable_creator_packs:
    (import.meta.env.VITE_ENABLE_CREATOR_PACKS ?? "false") === "true",
  enable_premium_packs:
    (import.meta.env.VITE_ENABLE_PREMIUM_PACKS ?? "false") === "true",
  enable_pack_teaser:
    (import.meta.env.VITE_ENABLE_PACK_TEASER ?? "true") === "true",
};

/**
 * Check whether a destination pack feature flag is enabled.
 *
 * The `enable_destination_packs` master flag gates creator and
 * premium pack flags. The `enable_pack_teaser` flag is independent
 * — it shows a "coming soon" teaser even when packs are disabled.
 */
export function isPackFlagEnabled(flag: DestinationPackFeatureFlag): boolean {
  if (flag === "enable_pack_teaser") {
    return packFlags.enable_pack_teaser;
  }
  if (flag === "enable_destination_packs") {
    return packFlags.enable_destination_packs;
  }
  return packFlags.enable_destination_packs && packFlags[flag];
}
