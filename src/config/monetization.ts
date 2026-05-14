/**
 * Affiliate provider registry.
 *
 * Each provider has a base URL and an env-var key for its affiliate ID.
 * Providers are grouped by category for UI rendering.
 */

import type { AffiliateProvider, ProviderCategory } from "../types/monetization";

/* ── Provider definitions ────────────────────────────────── */

export const PROVIDERS: readonly AffiliateProvider[] = [
  {
    id: "kiwi",
    name: "Kiwi.com",
    category: "flights",
    baseUrl: "https://www.kiwi.com/deep",
    affiliateIdEnvKey: "VITE_KIWI_AFFILIATE_ID",
    enabled: true,
    icon: "plane",
  },
  {
    id: "booking",
    name: "Booking.com",
    category: "hotels",
    baseUrl: "https://www.booking.com/searchresults.html",
    affiliateIdEnvKey: "VITE_BOOKING_AFFILIATE_ID",
    enabled: true,
    icon: "bed",
  },
  {
    id: "klook",
    name: "Klook",
    category: "experiences",
    baseUrl: "https://www.klook.com/activity/search",
    affiliateIdEnvKey: "VITE_KLOOK_AFFILIATE_ID",
    enabled: true,
    icon: "compass",
  },
  {
    id: "yesim",
    name: "Yesim",
    category: "esim",
    baseUrl: "https://yesim.tech",
    affiliateIdEnvKey: "VITE_YESIM_AFFILIATE_ID",
    enabled: true,
    icon: "sim",
  },
  {
    id: "ekta",
    name: "EKTA",
    category: "insurance",
    baseUrl: "https://ektatraveling.com",
    affiliateIdEnvKey: "VITE_EKTA_AFFILIATE_ID",
    enabled: true,
    icon: "shield",
  },
  {
    id: "kiwitaxi",
    name: "Kiwitaxi",
    category: "transfers",
    baseUrl: "https://www.kiwitaxi.com",
    affiliateIdEnvKey: "VITE_KIWITAXI_AFFILIATE_ID",
    enabled: true,
    icon: "bus",
  },
  {
    id: "getrentacar",
    name: "GetRentacar",
    category: "car-rental",
    baseUrl: "https://getrentacar.com/en/rent-a-car",
    affiliateIdEnvKey: "VITE_GETRENTACAR_AFFILIATE_ID",
    enabled: true,
    icon: "car",
  },
] as const;

/* ── Helpers ─────────────────────────────────────────────── */

/** Get all enabled providers for a given category. */
export function getProvidersByCategory(
  category: ProviderCategory,
): readonly AffiliateProvider[] {
  return PROVIDERS.filter((p) => p.enabled && p.category === category);
}

/** Get a single provider by id, or undefined if not found / disabled. */
export function getProvider(id: string): AffiliateProvider | undefined {
  return PROVIDERS.find((p) => p.id === id && p.enabled);
}

/* ── Category display metadata ───────────────────────────── */

export interface CategoryMeta {
  readonly label: string;
  readonly emoji: string;
  /** Whether this category appears as a primary CTA in the result card */
  readonly isPrimary: boolean;
}

export const CATEGORY_META: Record<ProviderCategory, CategoryMeta> = {
  flights:     { label: "Flights",     emoji: "✈️",  isPrimary: true  },
  hotels:      { label: "Hotels",      emoji: "🏨",  isPrimary: true  },
  experiences: { label: "Experiences", emoji: "🧭",  isPrimary: true  },
  esim:        { label: "eSIM",        emoji: "📱",  isPrimary: false },
  insurance:   { label: "Insurance",   emoji: "🛡️", isPrimary: false },
  transfers:   { label: "Transfers",   emoji: "🚌",  isPrimary: false },
  "car-rental":{ label: "Car Rental",  emoji: "🚗",  isPrimary: false },
};

/* ── Primary / secondary split for UI ────────────────────── */

export const PRIMARY_CATEGORIES: readonly ProviderCategory[] =
  (Object.entries(CATEGORY_META) as [ProviderCategory, CategoryMeta][])
    .filter(([, m]) => m.isPrimary)
    .map(([c]) => c);

export const SECONDARY_CATEGORIES: readonly ProviderCategory[] =
  (Object.entries(CATEGORY_META) as [ProviderCategory, CategoryMeta][])
    .filter(([, m]) => !m.isPrimary)
    .map(([c]) => c);
