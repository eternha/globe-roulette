/**
 * Group Trip Room type definitions.
 *
 * Frontend-only architecture for group travel planning.
 * No backend, no auth, no real-time — just local/mock data
 * to prototype the UI and interaction model.
 */

import type { Continent } from "../data/types";

/* ── Feature flags ─────────────────────────────────────────── */

export type GroupTripFeatureFlag =
  | "enable_group_rooms"
  | "enable_mock_group_rooms"
  | "enable_group_room_pro_gate"
  | "enable_group_voting"
  | "enable_group_preference_matching"
  | "enable_invite_placeholder";

/* ── Trip Room ─────────────────────────────────────────────── */

export type TripRoomStatus = "draft" | "collecting" | "voting" | "decided";

export interface TripRoom {
  readonly id: string;
  readonly name: string;
  readonly createdAt: number;
  readonly status: TripRoomStatus;
  readonly members: readonly TripMember[];
  readonly votes: readonly GroupVote[];
  /** The winning destination ID after voting completes. */
  readonly decidedDestinationId?: string;
}

/* ── Members ───────────────────────────────────────────────── */

export interface TripMember {
  readonly id: string;
  readonly displayName: string;
  readonly emoji: string;
  readonly isHost: boolean;
  readonly preferences: TripPreference | null;
  readonly joinedAt: number;
}

/* ── Preferences ───────────────────────────────────────────── */

export type BudgetLevel = "budget" | "moderate" | "luxury";
export type ClimatePreference = "warm" | "mild" | "cold" | "any";
export type NightlifeLevel = "none" | "some" | "lots";
export type TripCategory = "beach" | "city" | "nature" | "adventure" | "culture";

export interface TripPreference {
  /** Departure city (free text, optional). */
  readonly departureCity?: string;
  /** Budget tier. */
  readonly budget: BudgetLevel;
  /** Preferred trip duration in days. */
  readonly duration: number;
  /** Travel style / vibe (free text, optional). */
  readonly vibe?: string;
  /** Climate preference. */
  readonly climate: ClimatePreference;
  /** Preferred continents (empty = no preference). */
  readonly continents: readonly Continent[];
  /** Whether a passport is available. */
  readonly hasPassport: boolean;
  /** Prefer short flights only. */
  readonly avoidLongFlights: boolean;
  /** Selected trip categories. */
  readonly categories: readonly TripCategory[];
  /** Nightlife level preference. */
  readonly nightlife: NightlifeLevel;
  /** Is the trip family friendly? */
  readonly familyFriendly: boolean;
  /** Destination IDs to exclude. */
  readonly alreadyVisited: readonly string[];
}

/* ── Voting ─────────────────────────────────────────────────── */

export interface GroupVote {
  readonly memberId: string;
  readonly destinationId: string;
  /** 1 = like, -1 = dislike, 0 = neutral */
  readonly score: -1 | 0 | 1;
  readonly votedAt: number;
}

/* ── Group destination match ────────────────────────────────── */

export interface GroupDestinationMatch {
  readonly destinationId: string;
  readonly destinationName: string;
  /** 0–100 score based on group preference overlap. */
  readonly matchScore: number;
  /** Which preferences matched well. */
  readonly matchReasons: readonly string[];
  /** Which preferences conflicted. */
  readonly conflicts: readonly string[];
}
