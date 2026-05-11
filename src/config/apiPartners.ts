/**
 * API partner integration registry.
 *
 * This file documents all planned and active API integrations.
 * No real API keys are stored here — this is a configuration
 * registry that describes each partner's integration requirements.
 *
 * SECURITY REMINDER:
 *  - Public affiliate/partner IDs → VITE_ frontend env vars (safe)
 *  - Secret API keys → server-side only (Vercel Edge, backend)
 *  - See src/types/apiPartner.ts for the full security model
 */

import type { ApiPartner } from "../types/apiPartner";

/* ── Partner registry ──────────────────────────────────────── */

export const API_PARTNERS: readonly ApiPartner[] = [
  /* ── Travel booking (affiliate — public IDs) ─────────────── */
  {
    id: "kiwi",
    name: "Kiwi.com",
    category: "flights",
    enabled: true,
    requiresBackend: false,
    requiresApiKey: false,
    publicConfigAllowed: true,
    baseUrl: "https://www.kiwi.com",
    documentationUrl: "https://partners.kiwi.com",
    status: "active",
    notes: "Affiliate link builder. Public partner ID in VITE_KIWI_AFFILIATE_ID.",
  },
  {
    id: "booking",
    name: "Booking.com",
    category: "hotels",
    enabled: true,
    requiresBackend: false,
    requiresApiKey: false,
    publicConfigAllowed: true,
    baseUrl: "https://www.booking.com",
    documentationUrl: "https://www.booking.com/affiliate-program.html",
    status: "active",
    notes: "Affiliate link builder. Public partner ID in VITE_BOOKING_AFFILIATE_ID.",
  },
  {
    id: "gyg",
    name: "GetYourGuide",
    category: "experiences",
    enabled: true,
    requiresBackend: false,
    requiresApiKey: false,
    publicConfigAllowed: true,
    baseUrl: "https://www.getyourguide.com",
    documentationUrl: "https://partner.getyourguide.com",
    status: "active",
    notes: "Affiliate link builder. Public partner ID in VITE_GYG_PARTNER_ID.",
  },
  {
    id: "bookaway",
    name: "Bookaway",
    category: "airport_transfer",
    enabled: true,
    requiresBackend: false,
    requiresApiKey: false,
    publicConfigAllowed: true,
    baseUrl: "https://www.bookaway.com",
    documentationUrl: "https://www.bookaway.com/affiliates",
    status: "active",
    notes: "Affiliate link builder. Public partner ID in VITE_BOOKAWAY_AFFILIATE_ID.",
  },
  {
    id: "discovercars",
    name: "DiscoverCars",
    category: "car_rental",
    enabled: true,
    requiresBackend: false,
    requiresApiKey: false,
    publicConfigAllowed: true,
    baseUrl: "https://www.discovercars.com",
    documentationUrl: "https://www.discovercars.com/affiliate",
    status: "active",
    notes: "Affiliate link builder. Public partner ID in VITE_DISCOVERCARS_AFFILIATE_ID.",
  },

  /* ── Travel utilities (affiliate — public IDs) ───────────── */
  {
    id: "airalo",
    name: "Airalo",
    category: "destination_enrichment",
    enabled: true,
    requiresBackend: false,
    requiresApiKey: false,
    publicConfigAllowed: true,
    baseUrl: "https://www.airalo.com",
    documentationUrl: "https://www.airalo.com/partner",
    status: "active",
    notes: "eSIM affiliate. Public partner ID in VITE_AIRALO_AFFILIATE_ID.",
  },
  {
    id: "safetywing",
    name: "SafetyWing",
    category: "destination_enrichment",
    enabled: true,
    requiresBackend: false,
    requiresApiKey: false,
    publicConfigAllowed: true,
    baseUrl: "https://safetywing.com",
    documentationUrl: "https://safetywing.com/nomad-insurance/affiliates",
    status: "active",
    notes: "Travel insurance affiliate. Public partner ID in VITE_SAFETYWING_AFFILIATE_ID.",
  },

  /* ── Data APIs (require backend proxy) ───────────────────── */
  {
    id: "openweather",
    name: "OpenWeatherMap",
    category: "weather",
    enabled: false,
    requiresBackend: true,
    requiresApiKey: true,
    publicConfigAllowed: false,
    baseUrl: "https://api.openweathermap.org/data/3.0",
    documentationUrl: "https://openweathermap.org/api",
    status: "placeholder",
    notes: "Weather data for destination cards. Requires backend proxy — API key must not be exposed client-side.",
  },
  {
    id: "visa_api",
    name: "Visa Requirements API",
    category: "visa",
    enabled: false,
    requiresBackend: true,
    requiresApiKey: true,
    publicConfigAllowed: false,
    documentationUrl: undefined,
    status: "placeholder",
    notes: "Passport/visa checker. Multiple providers available. Requires backend proxy.",
  },
  {
    id: "exchange_rate",
    name: "ExchangeRate API",
    category: "currency",
    enabled: false,
    requiresBackend: true,
    requiresApiKey: true,
    publicConfigAllowed: false,
    baseUrl: "https://api.exchangerate-api.com/v4",
    documentationUrl: "https://www.exchangerate-api.com/docs",
    status: "placeholder",
    notes: "Currency conversion for budget estimates. Some providers offer free tiers. Requires backend proxy for keyed access.",
  },
  {
    id: "mapbox",
    name: "Mapbox",
    category: "maps",
    enabled: false,
    requiresBackend: false,
    requiresApiKey: true,
    publicConfigAllowed: true,
    baseUrl: "https://api.mapbox.com",
    documentationUrl: "https://docs.mapbox.com",
    status: "placeholder",
    notes: "Map tiles and geocoding. Public token is URL-restricted (safe for frontend). Secret token for server-side operations.",
  },

  /* ── AI APIs (require backend proxy) ─────────────────────── */
  {
    id: "openai",
    name: "OpenAI",
    category: "ai_itinerary",
    enabled: false,
    requiresBackend: true,
    requiresApiKey: true,
    publicConfigAllowed: false,
    baseUrl: "https://api.openai.com/v1",
    documentationUrl: "https://platform.openai.com/docs",
    status: "planned",
    notes: "AI itinerary generation via GPT-4. MUST use backend proxy — API key is a billing secret. See itineraryService.ts for prompt builder.",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    category: "ai_itinerary",
    enabled: false,
    requiresBackend: true,
    requiresApiKey: true,
    publicConfigAllowed: false,
    baseUrl: "https://api.anthropic.com/v1",
    documentationUrl: "https://docs.anthropic.com",
    status: "planned",
    notes: "Alternative AI provider for itinerary generation. MUST use backend proxy.",
  },

  /* ── Destination enrichment (require backend proxy) ──────── */
  {
    id: "wikimedia",
    name: "Wikimedia / Wikipedia",
    category: "destination_enrichment",
    enabled: false,
    requiresBackend: false,
    requiresApiKey: false,
    publicConfigAllowed: true,
    baseUrl: "https://en.wikipedia.org/api/rest_v1",
    documentationUrl: "https://www.mediawiki.org/wiki/REST_API",
    status: "placeholder",
    notes: "Destination descriptions, images, and facts. Free API with rate limits. Can be called from frontend.",
  },
];

/* ── Helpers ───────────────────────────────────────────────── */

/** Get all partners with a given status. */
export function getPartnersByStatus(status: ApiPartner["status"]): readonly ApiPartner[] {
  return API_PARTNERS.filter((p) => p.status === status);
}

/** Get all partners in a category. */
export function getPartnersByCategory(category: ApiPartner["category"]): readonly ApiPartner[] {
  return API_PARTNERS.filter((p) => p.category === category);
}

/** Get all currently active partner integrations. */
export function getActivePartners(): readonly ApiPartner[] {
  return API_PARTNERS.filter((p) => p.enabled && p.status === "active");
}

/** Get partners that require a backend proxy. */
export function getBackendRequiredPartners(): readonly ApiPartner[] {
  return API_PARTNERS.filter((p) => p.requiresBackend);
}
