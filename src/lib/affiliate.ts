/**
 * Affiliate URL builders.
 *
 * Each provider gets a dedicated builder that produces a ready-to-open
 * search URL pre-filled with the destination. Affiliate / partner IDs
 * come from VITE_ environment variables.
 */

import type { AffiliateUrlParams } from "../types/monetization";
import { getProvider } from "../config/monetization";

/* ── Per-provider builders ───────────────────────────────── */
// Build clean search URLs — Travelpayouts adds affiliate tracking server-side.

// Travelpayouts affilid for Kiwi — extracted from the tpk.mx short link
const KIWI_AFFILID =
  "travelpayoutsdeeplink_travel-roulette-eight.vercel.app_1391979a5f3243f9bf74b20db-728446";

function buildKiwiUrl(params: AffiliateUrlParams): string | null {
  const provider = getProvider("kiwi");
  if (!provider) return null;

  const query = new URLSearchParams({
    affilid: KIWI_AFFILID,
    to: params.destination,
    lang: "en",
  });
  if (params.checkIn) query.set("departure", params.checkIn);
  if (params.checkOut) query.set("return", params.checkOut);
  if (params.passengers) query.set("adults", String(params.passengers));

  return `${provider.baseUrl}?${query.toString()}`;
}

function buildBookingUrl(params: AffiliateUrlParams): string | null {
  const provider = getProvider("booking");
  if (!provider) return null;

  const query = new URLSearchParams({
    ss: `${params.destination}, ${params.country}`,
  });
  if (params.checkIn) query.set("checkin", params.checkIn);
  if (params.checkOut) query.set("checkout", params.checkOut);

  return `${provider.baseUrl}?${query.toString()}`;
}

function buildGetYourGuideUrl(params: AffiliateUrlParams): string | null {
  const provider = getProvider("getyourguide");
  if (!provider) return null;

  const query = new URLSearchParams({
    q: params.destination,
    lc: params.country,
  });

  return `${provider.baseUrl}?${query.toString()}`;
}

function buildAiraloUrl(params: AffiliateUrlParams): string | null {
  const provider = getProvider("airalo");
  if (!provider) return null;

  const slug = encodeURIComponent(
    params.country.toLowerCase().replace(/\s+/g, "-"),
  );
  return `${provider.baseUrl}/${slug}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function buildSafetyWingUrl(_params: AffiliateUrlParams): string | null {
  const provider = getProvider("safetywing");
  if (!provider) return null;
  return provider.baseUrl;
}

function buildBookawayUrl(params: AffiliateUrlParams): string | null {
  const provider = getProvider("bookaway");
  if (!provider) return null;

  const query = new URLSearchParams({ to: params.destination });
  return `${provider.baseUrl}?${query.toString()}`;
}

function buildDiscoverCarsUrl(params: AffiliateUrlParams): string | null {
  const provider = getProvider("discovercars");
  if (!provider) return null;

  const query = new URLSearchParams({
    location: `${params.destination}, ${params.country}`,
  });
  if (params.checkIn) query.set("pick_date", params.checkIn);
  if (params.checkOut) query.set("drop_date", params.checkOut);

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
