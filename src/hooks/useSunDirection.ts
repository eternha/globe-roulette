import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { rouletteStore } from "../stores/rouletteStore";
import {
  getSunDirection,
  getSolarElevation,
  getDaylightFactor,
} from "../lib/sunPosition";

/**
 * Default fallback position when geolocation is unavailable.
 * Uses the device's timezone offset to estimate longitude,
 * and assumes ~45° latitude (mid-latitudes).
 */
function estimatePositionFromTimezone(): { lat: number; lng: number } {
  const offsetMinutes = new Date().getTimezoneOffset();
  // Timezone offset is in minutes *west* of UTC, so negate for longitude
  const lng = -offsetMinutes / 4; // 4 minutes per degree
  return { lat: 45, lng };
}

/**
 * R3F hook: updates the sun direction vector and daylight factor
 * in the roulette store every second based on the device clock.
 *
 * Optionally requests geolocation for accurate solar elevation.
 * Falls back to timezone-based estimate if denied or unavailable.
 */
export function useSunDirection() {
  const userPosition = useRef<{ lat: number; lng: number }>(
    estimatePositionFromTimezone(),
  );
  const lastUpdateTime = useRef(0);

  /* ── Request geolocation once (optional, non-blocking) ───── */
  useEffect(() => {
    if (!("geolocation" in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        userPosition.current = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        // Immediately recompute with accurate position
        const sunDir = getSunDirection();
        const elevation = getSolarElevation(
          sunDir,
          userPosition.current.lat,
          userPosition.current.lng,
        );
        rouletteStore.setSunDirection(sunDir);
        rouletteStore.setDaylightFactor(getDaylightFactor(elevation));
      },
      () => {
        // Permission denied or error — keep timezone estimate
      },
      { timeout: 5000, maximumAge: 300_000 },
    );
  }, []);

  /* ── Update sun direction every ~2 seconds ──────────────── */
  useFrame(() => {
    const now = performance.now();
    // Only recompute every 2 seconds (sun moves very slowly)
    if (now - lastUpdateTime.current < 2000) return;
    lastUpdateTime.current = now;

    const sunDir = getSunDirection();
    const { lat, lng } = userPosition.current;
    const elevation = getSolarElevation(sunDir, lat, lng);

    rouletteStore.setSunDirection(sunDir);
    rouletteStore.setDaylightFactor(getDaylightFactor(elevation));
  });
}
