/**
 * Affiliate URL builders.
 *
 * Each provider gets a dedicated builder that produces a ready-to-open
 * search URL pre-filled with the destination. Affiliate / partner IDs
 * come from VITE_ environment variables.
 */

import type { AffiliateUrlParams } from "../types/monetization";
import { getProvider } from "../config/monetization";

/* ── Helpers ─────────────────────────────────────────────── */

/** Read an affiliate ID from Vite env, returning undefined if missing. */
function readAffiliateId(envKey: string): string | undefined {
  const value = (import.meta.env[envKey] as string | undefined) ?? undefined;
  return value && value.length > 0 ? value : undefined;
}

/* ── Per-provider builders ───────────────────────────────── */

function buildKiwiUrl(params: AffiliateUrlParams): string | null {
  const provider = getProvider("kiwi");
  if (!provider) return null;
  const affiliateId = readAffiliateId(provider.affiliateIdEnvKey);

  const query = new URLSearchParams({
    to: params.destination,
  });
  if (params.checkIn) query.set("departure", params.checkIn);
  if (params.checkOut) query.set("return", params.checkOut);
  if (params.passengers) query.set("adults", String(params.passengers));
  if (affiliateId) query.set("affilid", affiliateId);

  return `${provider.baseUrl}?${query.toString()}`;
}

function buildBookingUrl(params: AffiliateUrlParams): string | null {
  const provider = getProvider("booking");
  if (!provider) return null;
  const affiliateId = readAffiliateId(provider.affiliateIdEnvKey);

  const query = new URLSearchParams({
    ss: `${params.destination}, ${params.country}`,
  });
  if (params.checkIn) query.set("checkin", params.checkIn);
  if (params.checkOut) query.set("checkout", params.checkOut);
  if (affiliateId) query.set("aid", affiliateId);

  return `${provider.baseUrl}?${query.toString()}`;
}

function buildGetYourGuideUrl(params: AffiliateUrlParams): string | null {
  const provider = getProvider("getyourguide");
  if (!provider) return null;
  const affiliateId = readAffiliateId(provider.affiliateIdEnvKey);

  const query = new URLSearchParams({
    q: params.destination,
    lc: params.country,
  });
  if (affiliateId) query.set("partner_id", affiliateId);

  return `${provider.baseUrl}?${query.toString()}`;
}

function buildAiraloUrl(params: AffiliateUrlParams): string | null {
  const provider = getProvider("airalo");
  if (!provider) return null;
  const affiliateId = readAffiliateId(provider.affiliateIdEnvKey);

  const slug = encodeURIComponent(params.country.toLowerCase().replace(/\s+/g, "-"));
  const base = `${provider.baseUrl}/${slug}`;
  if (affiliateId) return `${base}?aff=${affiliateId}`;
  return base;
}

function buildSafetyWingUrl(_params: AffiliateUrlParams): string | null {
  const provider = getProvider("safetywing");
  if (!provider) return null;
  const affiliateId = readAffiliateId(provider.affiliateIdEnvKey);

  if (affiliateId) return `${provider.baseUrl}?referenceID=${affiliateId}`;
  return provider.baseUrl;
}

function buildBookawayUrl(params: AffiliateUrlParams): string | null {
  const provider = getProvider("bookaway");
  if (!provider) return null;
  const affiliateId = readAffiliateId(provider.affiliateIdEnvKey);

  const query = new URLSearchParams({
    to: params.destination,
  });
  if (affiliateId) query.set("aff", affiliateId);

  return `${provider.baseUrl}?${query.toString()}`;
}

function buildDiscoverCarsUrl(params: AffiliateUrlParams): string | null {
  const provider = getProvider("discovercars");
  if (!provider) return null;
  const affiliateId = readAffiliateId(provider.affiliateIdEnvKey);

  const query = new URLSearchParams({
    location: `${params.destination}, ${params.country}`,
  });
  if (params.checkIn) query.set("pick_date", params.checkIn);
  if (params.checkOut) query.set("drop_date", params.checkOut);
  if (affiliateId) query.set("a_aid", affiliateId);

  return `${provider.baseUrl}/search?${query.toString()}`;
}

/* ── Registry ────────────────────────────────────────────── */

const builders: Record<
  string,
  (params: AffiliateUrlParams) => string | null
> = {
  kiwi: buildKiwiUrl,
  booking: buildBookingUrl,
  getyourguide: buildGetYourGuideUrl,
  airalo: buildAiraloUrl,
  safetywing: buildSafetyWingUrl,
  bookaway: buildBookawayUrl,
  discovercars: buildDiscoverCarsUrl,
};

/**
 * Build an affiliate search URL for a given provider and destination.
 * Returns null if the provider is disabled or unknown.
 */
export function buildAffiliateUrl(
  providerId: string,
  params: AffiliateUrlParams,
): string | null {
  const builder = builders[providerId];
  if (!builder) return null;
  return builder(params);
}
