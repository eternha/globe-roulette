/**
 * Affiliate URL builders.
 *
 * Kiwi: tracked via affilid embedded directly in the deep link URL.
 * All others: clean search URLs for now. Tracking activates via
 * tp.media/r redirects once the Travelpayouts programs are subscribed
 * (Airalo p=8310, Booking p=84, Viator p=1922 — need TRS=728446 approved
 * in the Travelpayouts dashboard for each before they can go live).
 */

import type { AffiliateUrlParams } from "../types/monetization";
import { getProvider } from "../config/monetization";

/* ── Travelpayouts affiliate identifiers (extracted from tpk.mx redirects) ── */

const KIWI_AFFILID =
  "travelpayoutsdeeplink_travel-roulette-eight.vercel.app_1391979a5f3243f9bf74b20db-728446";

const KLOOK_AID = "api|13694|ae2f9ff348c747fb9bb53b71c-728446|pid|728446";

const KIWITAXI_TPO = "4c420dcf8872410aaa44541a8-728446";

const YESIM_PARTNER_ID = "636";
const YESIM_SUB_ID = "56482eb2e748413fa362e1aea-728446";

const EKTA_SUB_ID = "432d6c4ff46344c784b65004c-728446";

const GETRENTACAR_TRACK_ID = "37037d5b3299456ab8157a0ca-728446";

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

function buildKlookUrl(params: AffiliateUrlParams): string | null {
  if (!getProvider("klook")) return null;

  const kSite = `https://www.klook.com/activity/search?query=${encodeURIComponent(params.destination)}`;
  const query = new URLSearchParams({ aid: KLOOK_AID, k_site: kSite });
  return `https://affiliate.klook.com/redirect?${query.toString()}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function buildYesimUrl(_params: AffiliateUrlParams): string | null {
  if (!getProvider("yesim")) return null;

  const query = new URLSearchParams({
    af_sub1: YESIM_PARTNER_ID,
    c: "Partners",
    partner_id: YESIM_PARTNER_ID,
    pid: `partner${YESIM_PARTNER_ID}`,
    sub_id: YESIM_SUB_ID,
  });
  return `https://yesim.tech?${query.toString()}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function buildEktaUrl(_params: AffiliateUrlParams): string | null {
  if (!getProvider("ekta")) return null;

  const query = new URLSearchParams({
    sub_id: EKTA_SUB_ID,
    utm_source: "travelpayouts",
  });
  return `https://ektatraveling.com?${query.toString()}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function buildKiwitaxiUrl(_params: AffiliateUrlParams): string | null {
  if (!getProvider("kiwitaxi")) return null;

  const query = new URLSearchParams({
    tpo: KIWITAXI_TPO,
    utm_source: "travelpayouts",
  });
  return `https://kiwitaxi.com?${query.toString()}`;
}

function buildGetRentacarUrl(params: AffiliateUrlParams): string | null {
  if (!getProvider("getrentacar")) return null;

  const query = new URLSearchParams({
    track_id: GETRENTACAR_TRACK_ID,
    utm_campaign: "partner",
    utm_medium: "partner_cpa",
    utm_source: "travelpayouts",
    location: params.destination,
  });
  return `https://getrentacar.com?${query.toString()}`;
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
