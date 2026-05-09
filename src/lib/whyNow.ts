import type { Destination } from "../data/types";

/* ── Month utilities ─────────────────────────────────────── */

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const MONTH_MAP: Record<string, number> = {};
for (let i = 0; i < MONTH_NAMES.length; i++) {
  MONTH_MAP[MONTH_NAMES[i].toLowerCase()] = i + 1;
  MONTH_MAP[MONTH_NAMES[i].toLowerCase().slice(0, 3)] = i + 1;
}

/** 1-indexed current month (1 = January). */
export function getCurrentMonth(): number {
  return new Date().getMonth() + 1;
}

/* ── Season parsing ──────────────────────────────────────── */

interface MonthRange {
  readonly start: number;
  readonly end: number;
}

/**
 * Extract month ranges from a bestSeason string.
 *
 * Handles patterns like:
 *   "April to June and September to October …"
 *   "May to September …"
 *   "November to March …" (wraps around year)
 *   "March to May or October to November …"
 *   "Year-round …"
 */
function parseMonthRanges(bestSeason: string): readonly MonthRange[] {
  const lower = bestSeason.toLowerCase();

  if (lower.startsWith("year-round")) {
    return [{ start: 1, end: 12 }];
  }

  const ranges: MonthRange[] = [];

  /*
   * Match "month to month" patterns.
   * The regex captures the two month names on either side of "to" / "–" / "-".
   */
  const rangePattern =
    /\b(january|february|march|april|may|june|july|august|september|october|november|december)\b\s*(?:to|–|-)\s*\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/gi;

  let match: RegExpExecArray | null;
  while ((match = rangePattern.exec(bestSeason)) !== null) {
    const start = MONTH_MAP[match[1].toLowerCase()];
    const end = MONTH_MAP[match[2].toLowerCase()];
    if (start !== undefined && end !== undefined) {
      ranges.push({ start, end });
    }
  }

  return ranges;
}

/** Check whether a month falls inside a range (handles year-wrapping). */
function isMonthInRange(month: number, range: MonthRange): boolean {
  if (range.start <= range.end) {
    return month >= range.start && month <= range.end;
  }
  /* Wraps around year boundary, e.g. November(11) to March(3) */
  return month >= range.start || month <= range.end;
}

function isInSeason(month: number, ranges: readonly MonthRange[]): boolean {
  return ranges.some((r) => isMonthInRange(month, r));
}

/* ── Proximity helpers ───────────────────────────────────── */

/** Months until the start of the nearest upcoming range. */
function monthsUntilSeason(
  month: number,
  ranges: readonly MonthRange[],
): number {
  let nearest = 13; /* sentinel */
  for (const r of ranges) {
    const diff = (r.start - month + 12) % 12;
    /* diff === 0 means we're at the start month — that's "now", not 12 months */
    const distance = diff === 0 ? 0 : diff;
    if (distance < nearest) {
      nearest = distance;
    }
  }
  return nearest;
}

/** Find the range whose start is closest to `month`. */
function nextRange(
  month: number,
  ranges: readonly MonthRange[],
): MonthRange | undefined {
  let best: MonthRange | undefined;
  let bestDist = 13;
  for (const r of ranges) {
    const diff = (r.start - month + 12) % 12 || 12;
    if (diff < bestDist) {
      bestDist = diff;
      best = r;
    }
  }
  return best;
}

/* ── Vibe classification ─────────────────────────────────── */

type DestinationFlavor =
  | "beach"
  | "city"
  | "nature"
  | "cultural"
  | "adventure"
  | "general";

const FLAVOR_KEYWORDS: readonly [DestinationFlavor, readonly string[]][] = [
  [
    "beach",
    [
      "beach",
      "tropical",
      "island",
      "coastal",
      "paradise",
      "idyllic",
      "lagoon",
      "overwater",
      "surf",
    ],
  ],
  [
    "adventure",
    [
      "adrenaline",
      "adventure",
      "epic",
      "wild",
      "alpine",
      "trek",
      "remote",
      "rugged",
    ],
  ],
  [
    "nature",
    [
      "pristine",
      "geothermal",
      "volcanic",
      "arctic",
      "otherworldly",
      "untouched",
      "lush",
      "sacred",
      "stark",
    ],
  ],
  [
    "cultural",
    [
      "historic",
      "ancient",
      "cultural",
      "artistic",
      "literary",
      "musical",
      "regal",
      "traditional",
      "spiritual",
    ],
  ],
  [
    "city",
    [
      "cosmopolitan",
      "dynamic",
      "futuristic",
      "progressive",
      "urban",
      "hip",
      "electric",
      "relentless",
    ],
  ],
];

function classifyFlavor(destination: Destination): DestinationFlavor {
  const haystack =
    `${destination.vibe} ${destination.shortDescription}`.toLowerCase();
  for (const [flavor, keywords] of FLAVOR_KEYWORDS) {
    if (keywords.some((kw) => haystack.includes(kw))) {
      return flavor;
    }
  }
  return "general";
}

/* ── Message templates ───────────────────────────────────── */

const IN_SEASON_MESSAGES: Record<DestinationFlavor, readonly string[]> = {
  beach: [
    "Right now is ideal — warm waters, sunny skies and perfect beach conditions await.",
    "Peak beach season is here. Expect calm seas, warm sand and golden sunsets.",
    "This is prime time — crystal-clear water and long sunny days are at their best.",
  ],
  city: [
    "Great timing — pleasant weather makes exploring on foot a joy right now.",
    "You're hitting the sweet spot. Comfortable temperatures and lively streets await.",
    "Ideal conditions for wandering neighborhoods, outdoor dining and soaking it all in.",
  ],
  nature: [
    "Conditions are perfect right now — clear skies and the landscape at its most dramatic.",
    "This is the window. Trails are open, visibility is high and nature is putting on a show.",
    "Peak season for the outdoors — expect vivid scenery and ideal conditions.",
  ],
  cultural: [
    "Perfect timing for cultural exploration — comfortable weather and vibrant local life.",
    "This is when the city comes alive. Festivals, events and pleasant weather converge.",
    "Ideal season to explore — mild days, active cultural calendars and fewer tourist crowds.",
  ],
  adventure: [
    "Conditions are prime for adventure — dry trails, clear weather and long days ahead.",
    "This is go time. The best weather window for outdoor pursuits is right now.",
    "Peak adventure season — expect reliable conditions and unforgettable experiences.",
  ],
  general: [
    "Right now is an ideal time to visit — weather and conditions are at their best.",
    "You've picked a great window. Expect favorable weather and a welcoming atmosphere.",
    "This is peak season — conditions are excellent for making the most of your visit.",
  ],
};

const SHOULDER_MESSAGES: readonly string[] = [
  "Just outside peak season — enjoy thinner crowds, lower prices and a more local feel.",
  "Shoulder season means fewer tourists, better deals and a more authentic experience.",
  "Slightly off-peak, but that's a plus — less crowded, more affordable and still enjoyable.",
];

function offSeasonMessage(
  monthsAway: number,
  nextStart: number,
): string {
  const targetMonth = MONTH_NAMES[nextStart - 1];

  if (monthsAway <= 2) {
    return `Peak season starts soon in ${targetMonth}. Visit now for lower prices and a head start on the crowds.`;
  }

  if (monthsAway <= 4) {
    return `Not peak season, but a quieter visit with better prices. Ideal conditions return around ${targetMonth}.`;
  }

  return `Off-season means lower prices and fewer crowds. The best window opens in ${targetMonth} — plan ahead for prime conditions.`;
}

/* ── Public API ───────────────────────────────────────────── */

/**
 * Generate a dynamic "why now" message for a destination
 * based on the current month and the destination's best-season data.
 *
 * Falls back to the static `destination.whyNow` if parsing fails.
 */
export function getWhyNow(
  destination: Destination,
  month: number = getCurrentMonth(),
): string {
  const ranges = parseMonthRanges(destination.bestSeason);

  /* If we couldn't parse any ranges, return the static field */
  if (ranges.length === 0) {
    return destination.whyNow;
  }

  /* Year-round destinations */
  if (ranges.length === 1 && ranges[0].start === 1 && ranges[0].end === 12) {
    return "Great any time of year — conditions are reliably good no matter when you visit.";
  }

  if (isInSeason(month, ranges)) {
    const flavor = classifyFlavor(destination);
    const pool = IN_SEASON_MESSAGES[flavor];
    /* Deterministic pick based on destination id, so the same destination
       always gets the same message within a given month */
    const hash = simpleHash(destination.id + month);
    return pool[hash % pool.length];
  }

  /* Check for shoulder season (1 month outside any range) */
  const gap = monthsUntilSeason(month, ranges);
  if (gap === 1) {
    const hash = simpleHash(destination.id);
    return SHOULDER_MESSAGES[hash % SHOULDER_MESSAGES.length];
  }

  /* Off-season */
  const upcoming = nextRange(month, ranges);
  if (upcoming) {
    return offSeasonMessage(gap, upcoming.start);
  }

  return destination.whyNow;
}

/* ── Deterministic hash ──────────────────────────────────── */

/** Simple string hash for deterministic message selection. */
function simpleHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}
