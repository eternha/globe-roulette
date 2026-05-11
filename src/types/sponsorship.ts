/**
 * Sponsorship and sponsored placement type definitions.
 *
 * IMPORTANT — Ethical sponsorship rules:
 *  1. All sponsored content MUST be clearly labeled ("Sponsored",
 *     "Partner", or "Sponsored Inspiration").
 *  2. Sponsored destinations MUST NOT be injected into the random
 *     roulette result without explicit configuration AND visible
 *     disclosure to the user.
 *  3. The core roulette randomness is never secretly biased by
 *     sponsorship deals.
 */

/* ── Placement types ───────────────────────────────────────── */

export type SponsoredPlacementType =
  | "destination_of_the_week"
  | "sponsored_inspiration"
  | "partner_hotel_collection"
  | "sponsored_experience"
  | "travel_tool_partner"
  | "newsletter_partner";

/* ── Sponsored placement ───────────────────────────────────── */

export interface SponsoredPlacement {
  /** Unique placement identifier. */
  readonly id: string;
  /** User-facing label (e.g. "Destination of the week"). */
  readonly label: string;
  /** Name of the sponsoring company or partner. */
  readonly sponsorName: string;
  /** Where this placement appears in the UI. */
  readonly placement: SponsoredPlacementType;
  /** Whether this placement is currently active. */
  readonly enabled: boolean;
  /** Disclosure text shown alongside the placement. */
  readonly disclosureText: string;
  /** Link to the associated destination, if any. */
  readonly destinationId?: string;
  /** Display name of the destination. */
  readonly destinationName?: string;
  /** External URL for click-through. */
  readonly url?: string;
  /** Cover image URL (placeholder for future use). */
  readonly image?: string;
  /** Sort priority (lower = higher priority). */
  readonly priority: number;
  /** ISO date string — placement start date. */
  readonly startDate?: string;
  /** ISO date string — placement end date. */
  readonly endDate?: string;
}

/* ── Feature flags ─────────────────────────────────────────── */

export type SponsorshipFeatureFlag =
  | "enable_sponsorship"
  | "enable_destination_of_the_week"
  | "enable_sponsored_inspiration"
  | "enable_partner_collections"
  | "enable_travel_tool_partners"
  | "enable_newsletter_partner";
