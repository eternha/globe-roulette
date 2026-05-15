/**
 * Affiliate URL builders.
 *
 * Kiwi: tracked via affilid embedded directly in the deep link URL.
 * All others: direct tpk.mx short links from Travelpayouts.
 */

import type { AffiliateUrlParams } from "../types/monetization";
import { getProvider } from "../config/monetization";

/* ── Travelpayouts affiliate identifiers (extracted from tpk.mx redirects) ── */

const KIWI_AFFILID =
  "travelpayoutsdeeplink_travel-roulette-eight.vercel.app_1391979a5f3243f9bf74b20db-728446";

const KLOOK_URL = "https://klook.tpk.mx/lan2WXzr";
const KIWITAXI_URL = "https://kiwitaxi.tpk.mx/Igpo1vSz";
const YESIM_URL = "https://yesim.tpk.mx/vAxUKvKx";
const EKTA_URL = "https://ektatraveling.tpk.mx/fu5mmnGK";
const GETRENTACAR_URL = "https://getrentacar.tpk.mx/q1hwA2DF";

/* ── Per-provider builders ───────────────────────────────── */

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

function buildKlookUrl(_params: AffiliateUrlParams): string | null {
  if (!getProvider("klook")) return null;
  return KLOOK_URL;
}

function buildYesimUrl(_params: AffiliateUrlParams): string | null {
  if (!getProvider("yesim")) return null;
  return YESIM_URL;
}

function buildEktaUrl(_params: AffiliateUrlParams): string | null {
  if (!getProvider("ekta")) return null;
  return EKTA_URL;
}

function buildKiwitaxiUrl(_params: AffiliateUrlParams): string | null {
  if (!getProvider("kiwitaxi")) return null;
  return KIWITAXI_URL;
}

function buildGetRentacarUrl(_params: AffiliateUrlParams): string | null {
  if (!getProvider("getrentacar")) return null;
  return GETRENTACAR_URL;
}

/* ── Registry ────────────────────────────────────────────── */

const builders: Record<
  string,
  (params: AffiliateUrlParams) => string | null
> = {
  kiwi: buildKiwiUrl,
  booking: buildBookingUrl,
  klook: buildKlookUrl,
  yesim: buildYesimUrl,
  ekta: buildEktaUrl,
  kiwitaxi: buildKiwitaxiUrl,
  getrentacar: buildGetRentacarUrl,
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
