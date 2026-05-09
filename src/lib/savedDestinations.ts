const STORAGE_KEY = "travel-roulette-saved";

export interface SavedEntry {
  readonly id: string;
  readonly savedAt: number;
}

/** Read saved destination IDs from localStorage. */
export function getSavedDestinations(): readonly SavedEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is SavedEntry =>
        typeof e === "object" &&
        e !== null &&
        typeof e.id === "string" &&
        typeof e.savedAt === "number",
    );
  } catch {
    return [];
  }
}

/** Check whether a destination is already saved. */
export function isDestinationSaved(id: string): boolean {
  return getSavedDestinations().some((e) => e.id === id);
}

/**
 * Toggle a destination's saved state.
 * Returns `true` if the destination is now saved, `false` if removed.
 */
export function toggleSavedDestination(id: string): boolean {
  const current = getSavedDestinations();
  const exists = current.some((e) => e.id === id);

  const next = exists
    ? current.filter((e) => e.id !== id)
    : [...current, { id, savedAt: Date.now() }];

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* Storage full or unavailable — fail silently */
    return !exists;
  }

  return !exists;
}
