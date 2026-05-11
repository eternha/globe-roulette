/**
 * Monetization type definitions.
 *
 * Provider-agnostic interfaces for affiliate links, feature flags,
 * analytics events, and sponsored placements.
 */

/* ── Provider categories ─────────────────────────────────── */

export type ProviderCategory =
  | "flights"
  | "hotels"
  | "experiences"
  | "esim"
  | "insurance"
  | "transfers"
  | "car-rental";

/* ── Provider configuration ──────────────────────────────── */

export interface AffiliateProvider {
  /** Unique provider slug (e.g. "kiwi", "booking") */
  readonly id: string;
  /** Display name shown in UI */
  readonly name: string;
  /** Service category */
  readonly category: ProviderCategory;
  /** Base URL for building affiliate search links */
  readonly baseUrl: string;
  /** Vite env var key holding the affiliate/partner ID */
  readonly affiliateIdEnvKey: string;
  /** Whether this provider is currently active */
  readonly enabled: boolean;
  /** Optional icon identifier (for future use) */
  readonly icon?: string;
}

/* ── Affiliate URL parameters ────────────────────────────── */

export interface AffiliateUrlParams {
  readonly destination: string;
  readonly country: string;
  readonly lat: number;
  readonly lng: number;
  /** ISO date strings for optional date pre-fill */
  readonly checkIn?: string;
  readonly checkOut?: string;
  readonly passengers?: number;
}

/* ── Analytics ───────────────────────────────────────────── */

export type AnalyticsEventType =
  | "monetization_actions_viewed"
  | "provider_shown"
  | "provider_clicked"
  | "affiliate_link_opened"
  | "destination_selected"
  | "destination_card_viewed"
  | "pro_teaser_viewed"
  | "pro_teaser_clicked"
  | "pro_modal_opened"
  | "pro_modal_closed"
  | "pro_cta_clicked"
  | "pro_feature_gate_viewed"
  | "itinerary_cta_viewed"
  | "itinerary_cta_clicked"
  | "itinerary_modal_opened"
  | "itinerary_style_selected"
  | "itinerary_duration_selected"
  | "mock_itinerary_generated"
  | "itinerary_paywall_viewed"
  | "itinerary_purchase_placeholder_clicked"
  | "group_room_teaser_viewed"
  | "group_room_teaser_clicked"
  | "group_room_modal_opened"
  | "group_room_mock_created"
  | "group_preference_added"
  | "group_vote_added"
  | "group_room_paywall_viewed"
  | "invite_placeholder_clicked"
  | "sponsored_placement_viewed"
  | "sponsored_placement_clicked"
  | "destination_pack_viewed"
  | "destination_pack_selected"
  | "premium_pack_clicked"
  | "creator_pack_clicked"
  | "api_partner_placeholder_clicked";

export interface AnalyticsEvent {
  /** Event discriminant — matches one of AnalyticsEventType. */
  readonly type: AnalyticsEventType;
  /** Flat key-value properties. Each event carries only relevant fields. */
  readonly properties: Readonly<Record<string, string>>;
  /** Unix timestamp (ms) when the event was recorded. */
  readonly timestamp: number;
}

/* ── Sponsored placement (future) ────────────────────────── */

export interface SponsoredPlacement {
  readonly id: string;
  readonly provider: string;
  readonly category: ProviderCategory;
  readonly label: string;
  readonly priority: number;
  readonly enabled: boolean;
}

/* ── Feature flag keys ───────────────────────────────────── */

export type MonetizationFeatureFlag =
  | "monetization_enabled"
  | "show_affiliate_links"
  | "show_booking_section"
  | "show_affiliate_disclosure"
  | "show_sponsored_placements";

/* ── Pro feature flag keys ──────────────────────────────────── */

export type ProFeatureFlag =
  | "enable_pro"
  | "enable_pro_teaser"
  | "enable_pro_modal"
  | "enable_payment_placeholder"
  | "enable_budget_filters"
  | "enable_season_filters"
  | "enable_vibe_filters"
  | "enable_premium_destination_packs";
