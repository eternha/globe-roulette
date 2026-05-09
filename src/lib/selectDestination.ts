import type { Destination } from "../data/types";
import { destinations } from "../data/destinations";

/**
 * Pick a random destination from the pool.
 *
 * Optionally excludes a previous destination to avoid
 * landing on the same place twice in a row.
 */
export function selectRandomDestination(
  exclude?: Destination | null,
): Destination {
  const pool =
    exclude != null
      ? destinations.filter((d) => d.id !== exclude.id)
      : destinations;

  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}
