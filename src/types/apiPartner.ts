/**
 * API partner integration type definitions.
 *
 * IMPORTANT — Security rules for API integrations:
 *
 *  1. PUBLIC affiliate IDs (e.g. Kiwi, Booking.com partner IDs)
 *     can safely be stored as VITE_ frontend environment variables.
 *     These are embedded in the JS bundle and visible to users —
 *     they are partner identifiers, not secret keys.
 *
 *  2. SECRET API keys (e.g. OpenAI, weather APIs, visa APIs)
 *     MUST stay server-side. They should NEVER be stored in
 *     VITE_ env vars or committed to the repository.
 *
 *  3. Real API integrations that require secret keys should go
 *     through backend or serverless functions (e.g. Vercel Edge
 *     Functions, Cloudflare Workers, or a dedicated API server).
 *
 *  4. The `publicConfigAllowed` flag on each partner indicates
 *     whether its configuration can live on the frontend.
 *     Partners with `publicConfigAllowed: false` require a
 *     backend proxy.
 */

/* ── API categories ────────────────────────────────────────── */

export type ApiPartnerCategory =
  | "flights"
  | "hotels"
  | "experiences"
  | "weather"
  | "visa"
  | "currency"
  | "maps"
  | "ai_itinerary"
  | "destination_enrichment"
  | "airport_transfer"
  | "car_rental";

/* ── Integration status ────────────────────────────────────── */

export type ApiPartnerStatus = "placeholder" | "planned" | "active";

/* ── Partner configuration ─────────────────────────────────── */

export interface ApiPartner {
  /** Unique partner identifier. */
  readonly id: string;
  /** Display name of the API partner. */
  readonly name: string;
  /** Service category. */
  readonly category: ApiPartnerCategory;
  /** Whether this integration is enabled. */
  readonly enabled: boolean;
  /** Whether a backend/serverless proxy is required. */
  readonly requiresBackend: boolean;
  /** Whether the integration needs a secret API key. */
  readonly requiresApiKey: boolean;
  /**
   * Whether the partner's configuration (IDs, base URLs)
   * can safely live in frontend env vars.
   *
   * true  → partner/affiliate IDs are public identifiers
   * false → secret API key required, must use backend proxy
   */
  readonly publicConfigAllowed: boolean;
  /** Base URL for the API (if known). */
  readonly baseUrl?: string;
  /** Link to the partner's API documentation. */
  readonly documentationUrl?: string;
  /** Current integration status. */
  readonly status: ApiPartnerStatus;
  /** Implementation notes or context. */
  readonly notes?: string;
}
