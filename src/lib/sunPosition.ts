/**
 * Simplified solar position calculator.
 *
 * Computes the sun's direction vector in 3D space based on the current
 * UTC time. This uses the standard astronomical approximation for solar
 * declination and hour angle — accurate enough for realistic lighting
 * without pulling in an ephemeris library.
 *
 * Reference: Jean Meeus, "Astronomical Algorithms" (simplified)
 */

/** Degrees → radians */
const DEG2RAD = Math.PI / 180;

/**
 * Compute the sun's unit direction vector in world space.
 *
 * The returned vector points FROM the Earth TOWARD the sun.
 * Coordinate convention (matching the globe's orientation):
 *   x = toward 0° longitude (Prime Meridian)
 *   y = toward North Pole
 *   z = toward 90°E longitude
 *
 * @param date  - Current date/time (defaults to now)
 * @returns [x, y, z] unit vector pointing toward the sun
 */
export function getSunDirection(date: Date = new Date()): [number, number, number] {
  /* ── Day of year ───────────────────────────────────────── */
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = diff / 86_400_000;

  /* ── Solar declination (axial tilt effect) ─────────────── */
  // Approximation: δ ≈ -23.44° × cos(360/365 × (dayOfYear + 10))
  const declination =
    -23.44 * DEG2RAD * Math.cos((2 * Math.PI / 365) * (dayOfYear + 10));

  /* ── Hour angle from UTC ───────────────────────────────── */
  // The sun is at solar noon over the longitude where
  // local solar time equals 12:00. From UTC, this longitude is:
  //   subsolarLng = (12 - utcHours) × 15°
  const utcHours =
    date.getUTCHours() +
    date.getUTCMinutes() / 60 +
    date.getUTCSeconds() / 3600;

  // Subsolar longitude (where the sun is directly overhead)
  const subsolarLng = ((12 - utcHours) * 15) * DEG2RAD;

  /* ── Convert to Cartesian direction ────────────────────── */
  // Sun latitude = declination, sun longitude = subsolarLng
  const cosDecl = Math.cos(declination);

  const x = cosDecl * Math.cos(subsolarLng);
  const y = Math.sin(declination);
  const z = -cosDecl * Math.sin(subsolarLng);

  // Normalize (should already be unit, but be safe)
  const len = Math.sqrt(x * x + y * y + z * z);

  return [x / len, y / len, z / len];
}

/**
 * Solar elevation angle at a given geographic position.
 *
 * Returns the angle in radians above (positive) or below (negative) the
 * horizon. Used to determine "time of day" for the viewer:
 *
 *   > 0.1   → day
 *   0 to 0.1 → golden hour / civil twilight
 *   -0.1 to 0 → civil twilight / dusk
 *   < -0.1  → night
 *
 * If no position is provided, returns the elevation at the subsolar point
 * (always ~π/2), which isn't useful — caller should provide real coords.
 *
 * @param sunDir  - Sun direction vector from getSunDirection()
 * @param lat     - Observer latitude in degrees
 * @param lng     - Observer longitude in degrees
 * @returns elevation angle in radians
 */
export function getSolarElevation(
  sunDir: [number, number, number],
  lat: number,
  lng: number,
): number {
  // Convert observer position to unit vector (same coord system as sunDir)
  const latRad = lat * DEG2RAD;
  const lngRad = lng * DEG2RAD;

  const obsX = Math.cos(latRad) * Math.cos(lngRad);
  const obsY = Math.sin(latRad);
  const obsZ = -Math.cos(latRad) * Math.sin(lngRad);

  // Dot product = cosine of angle between observer zenith and sun direction
  const dot = obsX * sunDir[0] + obsY * sunDir[1] + obsZ * sunDir[2];

  // Elevation = π/2 - angle from zenith = asin(dot)
  return Math.asin(Math.max(-1, Math.min(1, dot)));
}

/**
 * Compute a 0–1 "daylight factor" from solar elevation.
 *
 * Smoothly transitions through twilight zones:
 *   1.0 → full daylight (elevation > ~6°)
 *   0.5 → sunrise/sunset (elevation ≈ 0°)
 *   0.0 → deep night (elevation < -12°)
 *
 * This drives ambient brightness, star visibility, etc.
 */
export function getDaylightFactor(elevationRad: number): number {
  // Map elevation from [-12°, +6°] → [0, 1]
  const DEG6 = 6 * DEG2RAD;
  const DEG12 = 12 * DEG2RAD;

  if (elevationRad >= DEG6) return 1;
  if (elevationRad <= -DEG12) return 0;

  // Smooth S-curve through twilight
  const t = (elevationRad + DEG12) / (DEG6 + DEG12);
  // Smoothstep for natural transition
  return t * t * (3 - 2 * t);
}
