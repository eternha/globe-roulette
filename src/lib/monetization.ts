/**
 * High-level monetization utilities.
 *
 * Combines feature flags, provider config, affiliate URL building,
 * and analytics into a single entry point for UI components.
 */

import type { Destination } from "../data/types";
import type { AffiliateUrlParams, ProviderCategory } from "../types/monetization";
import { isFeatureEnabled, isMonetizationActive } from "../config/features";
import {
  getProvidersByCategory,
  CATEGORY_META,
  PRIMARY_CATEGORIES,
  SECONDARY_CATEGORIES,
} from "../config/monetization";
import { buildAffiliateUrl } from "./affiliate";
import { convertToAffiliateUrl } from "./affiliateProxy";
import {
  trackProviderClicked,
  trackAffiliateLinkOpened,
} from "./analytics";

/* ── Types for UI consumption ────────────────────────────── */

export interface BookingAction {
  readonly providerId: string;
  readonly providerName: string;
  readonly category: ProviderCategory;
  readonly label: string;
  readonly emoji: string;
  readonly url: string;
  readonly isPrimary: boolean;
}

/* ── Core helpers ────────────────────────────────────────── */

/** Build AffiliateUrlParams from a Destination. */
function toAffiliateParams(dest: Destination): AffiliateUrlParams {
  return {
    destination: dest.name,
    country: dest.country,
    lat: dest.lat,
    lng: dest.lng,
  };
}

/**
 * Get all available booking actions for a destination.
 * Returns empty array if monetization is disabled.
 */
export function getBookingActions(dest: Destination): readonly BookingAction[] {
  if (!isMonetizationActive() || !isFeatureEnabled("show_affiliate_links")) {
    return [];
  }

  const params = toAffiliateParams(dest);
  const actions: BookingAction[] = [];

  const allCategories = [...PRIMARY_CATEGORIES, ...SECONDARY_CATEGORIES];

  for (const category of allCategories) {
    const providers = getProvidersByCategory(category);
    const meta = CATEGORY_META[category];

    for (const provider of providers) {
      const url = buildAffiliateUrl(provider.id, params);
      if (!url) continue;

      actions.push({
        providerId: provider.id,
        providerName: provider.name,
        category,
        label: meta.label,
        emoji: meta.emoji,
        url,
        isPrimary: meta.isPrimary,
      });
    }
  }

  return actions;
}

/**
 * Open an affiliate link in a new tab and track the click.
 *
 * Opens the tab synchronously (avoids popup blockers on mobile), then
 * converts the URL through Travelpayouts before navigating. Falls back
 * to the raw URL if the proxy is unavailable.
 */
export function openAffiliateLink(action: BookingAction, destinationName: string): void {
  trackProviderClicked(action.providerId, action.category, destinationName);

  // Open blank tab immediately — must be synchronous to avoid popup blockers
  const tab = window.open("", "_blank", "noopener,noreferrer");

  void convertToAffiliateUrl(action.url).then((affiliateUrl) => {
    trackAffiliateLinkOpened(
      action.providerId,
      action.category,
      destinationName,
      affiliateUrl,
    );
    if (tab) {
      tab.location.href = affiliateUrl;
    } else {
      window.open(affiliateUrl, "_blank", "noopener,noreferrer");
    }
  });
}

/**
 * Whether to show the affiliate disclosure notice.
 */
export function shouldShowDisclosure(): boolean {
  return isFeatureEnabled("show_affiliate_disclosure");
}

/**
 * Whether to show the booking section at all.
 */
export function shouldShowBookingSection(): boolean {
  return isFeatureEnabled("show_booking_section");
}

/** Static affiliate disclosure text. */
export const AFFILIATE_DISCLOSURE =
  "Some links may earn us a small commission at no extra cost to you. This helps keep Travel Roulette free.";
