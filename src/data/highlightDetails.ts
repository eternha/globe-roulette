/**
 * Rich detail data for individual destination highlights.
 *
 * Each entry is keyed by a normalized highlight name (lowercase, trimmed).
 * Only highlights with curated content appear here — the rest remain
 * simple text labels in the result card.
 *
 * Data is split across alphabetical chunk files for maintainability.
 */

export interface HighlightDetail {
  /** Display title */
  readonly title: string;
  /** Rich description (2-4 sentences) */
  readonly description: string;
  /** Quick facts displayed as label → value pairs */
  readonly facts: readonly { readonly label: string; readonly value: string }[];
  /** Optional external link for "Learn more" */
  readonly externalUrl?: string;
}

/**
 * Normalize a highlight name for lookup.
 * Strips whitespace, lowercases, removes accents.
 */
export function normalizeHighlightKey(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/**
 * Look up curated detail for a highlight.
 * Returns undefined if no curated content exists.
 */
export function getHighlightDetail(
  highlightName: string,
): HighlightDetail | undefined {
  return highlightDetailsMap[normalizeHighlightKey(highlightName)];
}

/* ── Lazy-loaded chunk registry ────────────────────────────── */

import { highlightsA } from "./highlights/highlights-a";
import { highlightsB } from "./highlights/highlights-b";
import { highlightsC } from "./highlights/highlights-c";
import { highlightsD } from "./highlights/highlights-d";
import { highlightsE } from "./highlights/highlights-e";
import { highlightsF } from "./highlights/highlights-f";
import { highlightsG } from "./highlights/highlights-g";
import { highlightsH } from "./highlights/highlights-h";
import { highlightsI } from "./highlights/highlights-i";
import { highlightsJ } from "./highlights/highlights-j";
import { highlightsK } from "./highlights/highlights-k";
import { highlightsL } from "./highlights/highlights-l";
import { highlightsM } from "./highlights/highlights-m";
import { highlightsN } from "./highlights/highlights-n";
import { highlightsO } from "./highlights/highlights-o";
import { highlightsP } from "./highlights/highlights-p";
import { highlightsQ } from "./highlights/highlights-q";
import { highlightsR } from "./highlights/highlights-r";
import { highlightsS } from "./highlights/highlights-s";
import { highlightsT } from "./highlights/highlights-t";
import { highlightsU } from "./highlights/highlights-u";
import { highlightsV } from "./highlights/highlights-v";
import { highlightsW } from "./highlights/highlights-w";
import { highlightsXYZ } from "./highlights/highlights-xyz";

const highlightDetailsMap: Record<string, HighlightDetail> = {
  ...highlightsA,
  ...highlightsB,
  ...highlightsC,
  ...highlightsD,
  ...highlightsE,
  ...highlightsF,
  ...highlightsG,
  ...highlightsH,
  ...highlightsI,
  ...highlightsJ,
  ...highlightsK,
  ...highlightsL,
  ...highlightsM,
  ...highlightsN,
  ...highlightsO,
  ...highlightsP,
  ...highlightsQ,
  ...highlightsR,
  ...highlightsS,
  ...highlightsT,
  ...highlightsU,
  ...highlightsV,
  ...highlightsW,
  ...highlightsXYZ,
};
