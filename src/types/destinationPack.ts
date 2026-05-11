/**
 * Destination pack type definitions.
 *
 * Packs are curated collections of destinations that users can
 * optionally choose instead of the full random roulette.
 *
 * IMPORTANT:
 *  - Packs do NOT change the default roulette behavior.
 *  - The default mode always uses the full destination pool
 *    with unbiased random selection.
 *  - Packs are an optional, clearly labeled alternative mode.
 */

/* ── Pack types ────────────────────────────────────────────── */

export type DestinationPackType =
  | "editorial"
  | "creator"
  | "premium"
  | "sponsored"
  | "seasonal";

/* ── Cover style ───────────────────────────────────────────── */

export interface PackCoverStyle {
  /** CSS gradient or solid color. */
  readonly background: string;
  /** Emoji displayed on the cover. */
  readonly emoji: string;
}

/* ── Destination pack ──────────────────────────────────────── */

export interface DestinationPack {
  /** Unique pack identifier. */
  readonly id: string;
  /** Display name (e.g. "Romantic Europe Roulette"). */
  readonly name: string;
  /** Short description of what this pack contains. */
  readonly description: string;
  /** Pack category. */
  readonly type: DestinationPackType;
  /** Creator or curator name (for creator/editorial packs). */
  readonly creatorName?: string;
  /** Whether this pack requires Pro or payment. */
  readonly isPremium: boolean;
  /** IDs of destinations included in this pack. */
  readonly destinationIds: readonly string[];
  /** Searchable tags. */
  readonly tags: readonly string[];
  /** Visual cover style for the pack card. */
  readonly coverStyle?: PackCoverStyle;
  /** External cover image URL (future use). */
  readonly coverImage?: string;
  /** Whether this pack is available. */
  readonly enabled: boolean;
}

/* ── Feature flags ─────────────────────────────────────────── */

export type DestinationPackFeatureFlag =
  | "enable_destination_packs"
  | "enable_creator_packs"
  | "enable_premium_packs"
  | "enable_pack_teaser";
