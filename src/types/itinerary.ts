/**
 * Itinerary type definitions.
 *
 * Describes the structure of AI-generated (or mock) travel itineraries,
 * including day plans, individual items, and style presets.
 */

/* ── Itinerary styles ───────────────────────────────────────── */

export type ItineraryStyle =
  | "first_time"
  | "romantic"
  | "budget"
  | "food"
  | "adventure"
  | "family"
  | "luxury"
  | "weekend";

/* ── Itinerary structure ────────────────────────────────────── */

export interface ItineraryItem {
  /** Time of day hint (e.g. "Morning", "Afternoon", "Evening") */
  readonly timeOfDay: string;
  /** Activity title */
  readonly title: string;
  /** Short description of the activity */
  readonly description: string;
  /** Optional emoji for visual flair */
  readonly emoji: string;
  /** Optional estimated duration (e.g. "2-3 hours") */
  readonly duration?: string;
  /** Optional tip or insider note */
  readonly tip?: string;
}

export interface ItineraryDay {
  /** Day number (1-indexed) */
  readonly dayNumber: number;
  /** Day theme/title (e.g. "Arrival & Old Town") */
  readonly theme: string;
  /** Activities for this day */
  readonly items: readonly ItineraryItem[];
}

export interface TravelItinerary {
  /** Destination name */
  readonly destination: string;
  /** Country */
  readonly country: string;
  /** Selected style */
  readonly style: ItineraryStyle;
  /** Number of days */
  readonly duration: number;
  /** Day-by-day plan */
  readonly days: readonly ItineraryDay[];
  /** When this itinerary was generated (ms timestamp) */
  readonly generatedAt: number;
  /** Whether this was generated from mock data or a real AI call */
  readonly isMock: boolean;
}

/* ── Generation options ─────────────────────────────────────── */

export interface ItineraryOptions {
  readonly duration: number;
  readonly style: ItineraryStyle;
}

/* ── Itinerary feature flag keys ────────────────────────────── */

export type ItineraryFeatureFlag =
  | "enable_ai_itinerary"
  | "enable_mock_itinerary"
  | "enable_ai_itinerary_pro_gate"
  | "enable_itinerary_purchase_placeholder";
