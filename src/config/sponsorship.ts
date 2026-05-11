/**
 * Sponsorship configuration.
 *
 * All sponsored placements are disabled by default.
 * Enable them via feature flags when a real sponsorship deal
 * is signed and the placement content is ready.
 *
 * RULES:
 *  - Every sponsored item MUST show clear disclosure text.
 *  - Sponsored destinations are NEVER secretly injected into
 *    the random roulette result.
 *  - If a sponsored destination appears, it MUST be labeled
 *    "Sponsored" or "Partner" visibly.
 */

import type {
  SponsoredPlacement,
  SponsoredPlacementType,
} from "../types/sponsorship";

/* ── Disclosure copy ───────────────────────────────────────── */

export const SPONSORED_LABEL = "Sponsored";
export const PARTNER_LABEL = "Partner";
export const SPONSORED_INSPIRATION_LABEL = "Sponsored Inspiration";

/** Default disclosure for standard sponsored placements. */
export const SPONSORED_DISCLOSURE =
  "This content is sponsored. Travel Roulette may receive compensation from featured partners. Roulette results are never secretly influenced by sponsorship deals.";

/* ── Mock placements (all disabled by default) ─────────────── */

export const SPONSORED_PLACEMENTS: readonly SponsoredPlacement[] = [
  {
    id: "dotw_placeholder",
    label: "Destination of the week",
    sponsorName: "Example Tourism Board",
    placement: "destination_of_the_week",
    enabled: false,
    disclosureText: SPONSORED_LABEL,
    destinationId: undefined,
    destinationName: "Lisbon",
    url: undefined,
    priority: 1,
  },
  {
    id: "inspiration_placeholder",
    label: "Featured inspiration",
    sponsorName: "Example Travel Co.",
    placement: "sponsored_inspiration",
    enabled: false,
    disclosureText: SPONSORED_INSPIRATION_LABEL,
    priority: 2,
  },
  {
    id: "hotel_collection_placeholder",
    label: "Curated stays",
    sponsorName: "Example Hotels",
    placement: "partner_hotel_collection",
    enabled: false,
    disclosureText: PARTNER_LABEL,
    url: undefined,
    priority: 3,
  },
  {
    id: "experience_placeholder",
    label: "Must-try experiences",
    sponsorName: "Example Experiences",
    placement: "sponsored_experience",
    enabled: false,
    disclosureText: SPONSORED_LABEL,
    priority: 4,
  },
  {
    id: "tool_placeholder",
    label: "Travel tools",
    sponsorName: "Example eSIM",
    placement: "travel_tool_partner",
    enabled: false,
    disclosureText: PARTNER_LABEL,
    priority: 5,
  },
  {
    id: "newsletter_placeholder",
    label: "Travel newsletter",
    sponsorName: "Example Newsletter",
    placement: "newsletter_partner",
    enabled: false,
    disclosureText: PARTNER_LABEL,
    priority: 6,
  },
];

/* ── Helpers ───────────────────────────────────────────────── */

/** Get all active (enabled) placements, sorted by priority. */
export function getActivePlacements(): readonly SponsoredPlacement[] {
  return SPONSORED_PLACEMENTS
    .filter((p) => p.enabled && isWithinDateRange(p))
    .sort((a, b) => a.priority - b.priority);
}

/** Get active placements of a specific type. */
export function getPlacementsByType(
  type: SponsoredPlacementType,
): readonly SponsoredPlacement[] {
  return getActivePlacements().filter((p) => p.placement === type);
}

/** Check if a placement is within its date range (if configured). */
function isWithinDateRange(placement: SponsoredPlacement): boolean {
  const now = Date.now();
  if (placement.startDate && new Date(placement.startDate).getTime() > now) {
    return false;
  }
  if (placement.endDate && new Date(placement.endDate).getTime() < now) {
    return false;
  }
  return true;
}

/** Get the appropriate disclosure text for a placement type. */
export function getDisclosureForType(type: SponsoredPlacementType): string {
  switch (type) {
    case "destination_of_the_week":
    case "sponsored_experience":
      return SPONSORED_LABEL;
    case "sponsored_inspiration":
      return SPONSORED_INSPIRATION_LABEL;
    case "partner_hotel_collection":
    case "travel_tool_partner":
    case "newsletter_partner":
      return PARTNER_LABEL;
  }
}
