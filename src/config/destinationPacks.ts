/**
 * Destination pack definitions.
 *
 * Curated collections of destinations for themed roulette modes.
 * These are an optional alternative to the default random pool —
 * the default roulette behavior is NEVER changed.
 *
 * Pack types:
 *  - editorial: curated by the Globe Roulette team
 *  - creator: curated by travel influencers or partners
 *  - premium: available only to Pro subscribers
 *  - sponsored: funded by a destination partner (clearly labeled)
 *  - seasonal: time-limited thematic collections
 */

import type { DestinationPack } from "../types/destinationPack";

/* ── Pack definitions ──────────────────────────────────────── */

export const DESTINATION_PACKS: readonly DestinationPack[] = [
  {
    id: "romantic_europe",
    name: "Romantic Europe Roulette",
    description: "Dreamy European escapes for couples",
    type: "editorial",
    isPremium: false,
    destinationIds: [],
    tags: ["romantic", "europe", "couples"],
    coverStyle: { background: "linear-gradient(135deg, #e8a0bf, #d4a5c4)", emoji: "💕" },
    enabled: false,
  },
  {
    id: "italian_summer",
    name: "Italian Summer Roulette",
    description: "Sun-drenched Italian destinations from coast to countryside",
    type: "editorial",
    isPremium: false,
    destinationIds: [],
    tags: ["italy", "summer", "mediterranean"],
    coverStyle: { background: "linear-gradient(135deg, #f5c842, #e87d3e)", emoji: "🇮🇹" },
    enabled: false,
  },
  {
    id: "foodie_cities",
    name: "Foodie City Roulette",
    description: "Cities with world-class dining scenes",
    type: "editorial",
    isPremium: false,
    destinationIds: [],
    tags: ["food", "city", "culinary"],
    coverStyle: { background: "linear-gradient(135deg, #ff7043, #d84315)", emoji: "🍽" },
    enabled: false,
  },
  {
    id: "digital_nomad",
    name: "Digital Nomad Roulette",
    description: "Remote-work-friendly destinations with fast wifi and great cafes",
    type: "editorial",
    isPremium: false,
    destinationIds: [],
    tags: ["nomad", "remote", "wifi", "coworking"],
    coverStyle: { background: "linear-gradient(135deg, #42a5f5, #1565c0)", emoji: "💻" },
    enabled: false,
  },
  {
    id: "luxury_escape",
    name: "Luxury Escape Roulette",
    description: "Premium destinations for unforgettable indulgence",
    type: "premium",
    isPremium: true,
    destinationIds: [],
    tags: ["luxury", "premium", "exclusive"],
    coverStyle: { background: "linear-gradient(135deg, #e9c176, #b8860b)", emoji: "💎" },
    enabled: false,
  },
  {
    id: "adventure",
    name: "Adventure Roulette",
    description: "Adrenaline-fueled destinations for thrill seekers",
    type: "editorial",
    isPremium: false,
    destinationIds: [],
    tags: ["adventure", "hiking", "outdoor"],
    coverStyle: { background: "linear-gradient(135deg, #66bb6a, #2e7d32)", emoji: "🧗" },
    enabled: false,
  },
  {
    id: "honeymoon",
    name: "Honeymoon Roulette",
    description: "Perfect first trips together",
    type: "premium",
    isPremium: true,
    destinationIds: [],
    tags: ["honeymoon", "romantic", "couples"],
    coverStyle: { background: "linear-gradient(135deg, #f48fb1, #c2185b)", emoji: "💒" },
    enabled: false,
  },
  {
    id: "beach_escape",
    name: "Beach Escape Roulette",
    description: "Sandy shores and turquoise waters around the world",
    type: "editorial",
    isPremium: false,
    destinationIds: [],
    tags: ["beach", "tropical", "island"],
    coverStyle: { background: "linear-gradient(135deg, #26c6da, #00838f)", emoji: "🏖" },
    enabled: false,
  },
  {
    id: "girls_trip",
    name: "Girls Trip Roulette",
    description: "Fun, safe and vibrant destinations for group trips",
    type: "creator",
    creatorName: "Globe Roulette Team",
    isPremium: false,
    destinationIds: [],
    tags: ["girls", "group", "fun", "nightlife"],
    coverStyle: { background: "linear-gradient(135deg, #ab47bc, #6a1b9a)", emoji: "👯" },
    enabled: false,
  },
  {
    id: "weekend_europe",
    name: "Weekend Europe Roulette",
    description: "Quick European getaways for a 2-3 day trip",
    type: "editorial",
    isPremium: false,
    destinationIds: [],
    tags: ["weekend", "europe", "short"],
    coverStyle: { background: "linear-gradient(135deg, #7e57c2, #4527a0)", emoji: "⚡" },
    enabled: false,
  },
];

/* ── Helpers ───────────────────────────────────────────────── */

/** Get all enabled packs. */
export function getEnabledPacks(): readonly DestinationPack[] {
  return DESTINATION_PACKS.filter((p) => p.enabled);
}

/** Get all free (non-premium) enabled packs. */
export function getFreePacks(): readonly DestinationPack[] {
  return getEnabledPacks().filter((p) => !p.isPremium);
}

/** Get all premium enabled packs. */
export function getPremiumPacks(): readonly DestinationPack[] {
  return getEnabledPacks().filter((p) => p.isPremium);
}

/** Get a pack by ID. */
export function getPackById(id: string): DestinationPack | undefined {
  return DESTINATION_PACKS.find((p) => p.id === id);
}

/** Get all pack definitions (including disabled) for admin/teaser display. */
export function getAllPacks(): readonly DestinationPack[] {
  return DESTINATION_PACKS;
}
