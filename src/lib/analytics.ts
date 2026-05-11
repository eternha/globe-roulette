/**
 * Analytics abstraction for monetization and destination events.
 *
 * Design:
 *  - Events are plain objects with a `type` discriminant and a flat
 *    property bag. No rigid struct — each event carries only the
 *    fields that make sense for it.
 *  - An AnalyticsAdapter is a single function that receives one event.
 *    Swap adapters to connect Plausible, PostHog, GA4, or any backend.
 *  - In dev, events log to the console immediately.
 *  - In production, events batch into a queue and flush every 5 s.
 *
 * To connect a real provider later:
 *
 *   import { setAnalyticsAdapter } from "./analytics";
 *
 *   setAnalyticsAdapter((event) => {
 *     plausible(event.type, { props: event.properties });
 *   });
 */

import type { AnalyticsEvent, AnalyticsEventType } from "../types/monetization";

/* ── Adapter ─────────────────────────────────────────────── */

/**
 * A function that sends one event to an analytics backend.
 * Replace the default no-op by calling `setAnalyticsAdapter`.
 */
export type AnalyticsAdapter = (event: AnalyticsEvent) => void;

let adapter: AnalyticsAdapter = () => {
  /* Default no-op. Replaced via setAnalyticsAdapter(). */
};

/** Register a production analytics adapter. */
export function setAnalyticsAdapter(fn: AnalyticsAdapter): void {
  adapter = fn;
}

/* ── Event queue (batched flush in production) ───────────── */

const EVENT_QUEUE: AnalyticsEvent[] = [];
const FLUSH_INTERVAL_MS = 5_000;
let flushTimer: ReturnType<typeof setInterval> | null = null;

function startFlushTimer(): void {
  if (flushTimer !== null) return;
  flushTimer = setInterval(() => {
    if (EVENT_QUEUE.length === 0) return;
    const batch = EVENT_QUEUE.splice(0);
    flushBatch(batch);
  }, FLUSH_INTERVAL_MS);
}

function flushBatch(events: readonly AnalyticsEvent[]): void {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.groupCollapsed(
      `[analytics] ${events.length} event(s)`,
    );
    for (const e of events) {
      // eslint-disable-next-line no-console
      console.log(e.type, e.properties);
    }
    // eslint-disable-next-line no-console
    console.groupEnd();
    return;
  }

  for (const event of events) {
    adapter(event);
  }
}

/* ── Core tracking function ──────────────────────────────── */

/**
 * Track an analytics event.
 *
 * In dev: flushes immediately to the console.
 * In production: queues for batched delivery via the registered adapter.
 */
export function track(
  type: AnalyticsEventType,
  properties: Readonly<Record<string, string>> = {},
): void {
  const event: AnalyticsEvent = {
    type,
    properties,
    timestamp: Date.now(),
  };

  EVENT_QUEUE.push(event);
  startFlushTimer();

  if (import.meta.env.DEV) {
    const batch = EVENT_QUEUE.splice(0);
    flushBatch(batch);
  }
}

/* ── Convenience helpers (one per event type) ────────────── */

/** The booking actions section became visible in the result card. */
export function trackMonetizationActionsViewed(destination: string): void {
  track("monetization_actions_viewed", { destination });
}

/** A specific provider button was rendered on screen. */
export function trackProviderShown(
  provider: string,
  category: string,
  destination: string,
): void {
  track("provider_shown", { provider, category, destination });
}

/** User tapped a provider button (before the link opens). */
export function trackProviderClicked(
  provider: string,
  category: string,
  destination: string,
): void {
  track("provider_clicked", { provider, category, destination });
}

/** The affiliate URL was opened in a new tab. */
export function trackAffiliateLinkOpened(
  provider: string,
  category: string,
  destination: string,
  url: string,
): void {
  track("affiliate_link_opened", { provider, category, destination, url });
}

/** A destination was selected by the roulette. */
export function trackDestinationSelected(
  destination: string,
  country: string,
  tier: string,
): void {
  track("destination_selected", { destination, country, tier });
}

/** The result card became visible to the user. */
export function trackDestinationCardViewed(
  destination: string,
  country: string,
): void {
  track("destination_card_viewed", { destination, country });
}

/* ── Pro analytics helpers ──────────────────────────────────── */

/** The Pro teaser banner became visible in the result card. */
export function trackProTeaserViewed(destination: string): void {
  track("pro_teaser_viewed", { destination });
}

/** User tapped the "Explore Pro" button on the teaser. */
export function trackProTeaserClicked(destination: string): void {
  track("pro_teaser_clicked", { destination });
}

/** The Pro modal/sheet was opened. */
export function trackProModalOpened(source: string): void {
  track("pro_modal_opened", { source });
}

/** The Pro modal/sheet was closed without conversion. */
export function trackProModalClosed(source: string): void {
  track("pro_modal_closed", { source });
}

/** User tapped the primary CTA inside the Pro modal. */
export function trackProCtaClicked(plan: string, source: string): void {
  track("pro_cta_clicked", { plan, source });
}

/** A gated Pro feature was attempted by a free user. */
export function trackProFeatureGateViewed(feature: string): void {
  track("pro_feature_gate_viewed", { feature });
}

/* ── Itinerary analytics helpers ───────────────────────────── */

/** The "Generate itinerary" CTA became visible. */
export function trackItineraryCtaViewed(destination: string): void {
  track("itinerary_cta_viewed", { destination });
}

/** User tapped the "Generate itinerary" CTA. */
export function trackItineraryCtaClicked(destination: string): void {
  track("itinerary_cta_clicked", { destination });
}

/** The itinerary modal/sheet was opened. */
export function trackItineraryModalOpened(destination: string): void {
  track("itinerary_modal_opened", { destination });
}

/** User selected an itinerary style. */
export function trackItineraryStyleSelected(
  style: string,
  destination: string,
): void {
  track("itinerary_style_selected", { style, destination });
}

/** User selected an itinerary duration. */
export function trackItineraryDurationSelected(
  duration: string,
  destination: string,
): void {
  track("itinerary_duration_selected", { duration, destination });
}

/** A mock itinerary was generated successfully. */
export function trackMockItineraryGenerated(
  destination: string,
  style: string,
  duration: string,
): void {
  track("mock_itinerary_generated", { destination, style, duration });
}

/** The itinerary paywall/Pro gate was shown. */
export function trackItineraryPaywallViewed(destination: string): void {
  track("itinerary_paywall_viewed", { destination });
}

/** User tapped the purchase placeholder in the itinerary paywall. */
export function trackItineraryPurchasePlaceholderClicked(
  destination: string,
): void {
  track("itinerary_purchase_placeholder_clicked", { destination });
}

/* ── Group Trip Room analytics helpers ────────────────────────── */

/** The group room teaser became visible. */
export function trackGroupRoomTeaserViewed(): void {
  track("group_room_teaser_viewed");
}

/** User tapped the group room teaser. */
export function trackGroupRoomTeaserClicked(): void {
  track("group_room_teaser_clicked");
}

/** The group room modal/sheet was opened. */
export function trackGroupRoomModalOpened(): void {
  track("group_room_modal_opened");
}

/** A mock trip room was created. */
export function trackGroupRoomMockCreated(roomId: string): void {
  track("group_room_mock_created", { room_id: roomId });
}

/** A member added preferences. */
export function trackGroupPreferenceAdded(roomId: string): void {
  track("group_preference_added", { room_id: roomId });
}

/** A member voted on a destination. */
export function trackGroupVoteAdded(roomId: string, destinationId: string): void {
  track("group_vote_added", { room_id: roomId, destination_id: destinationId });
}

/** The group room paywall was shown. */
export function trackGroupRoomPaywallViewed(): void {
  track("group_room_paywall_viewed");
}

/** User tapped the invite placeholder link. */
export function trackInvitePlaceholderClicked(roomId: string): void {
  track("invite_placeholder_clicked", { room_id: roomId });
}

/* ── Sponsorship & pack analytics helpers ─────────────────────── */

/** A sponsored placement was rendered on screen. */
export function trackSponsoredPlacementViewed(
  placementId: string,
  sponsorName: string,
): void {
  track("sponsored_placement_viewed", { placement_id: placementId, sponsor: sponsorName });
}

/** User clicked a sponsored placement. */
export function trackSponsoredPlacementClicked(
  placementId: string,
  sponsorName: string,
): void {
  track("sponsored_placement_clicked", { placement_id: placementId, sponsor: sponsorName });
}

/** A destination pack card was shown. */
export function trackDestinationPackViewed(packId: string): void {
  track("destination_pack_viewed", { pack_id: packId });
}

/** User selected a destination pack. */
export function trackDestinationPackSelected(packId: string): void {
  track("destination_pack_selected", { pack_id: packId });
}

/** User clicked on a premium pack (may trigger paywall). */
export function trackPremiumPackClicked(packId: string): void {
  track("premium_pack_clicked", { pack_id: packId });
}

/** User clicked on a creator pack. */
export function trackCreatorPackClicked(packId: string, creatorName: string): void {
  track("creator_pack_clicked", { pack_id: packId, creator: creatorName });
}

/** User clicked on an API partner placeholder. */
export function trackApiPartnerPlaceholderClicked(partnerId: string): void {
  track("api_partner_placeholder_clicked", { partner_id: partnerId });
}
