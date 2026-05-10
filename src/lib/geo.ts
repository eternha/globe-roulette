import { Vector3 } from "three";

const DEG2RAD = Math.PI / 180;

/**
 * Convert geographic coordinates to a point on a sphere surface.
 *
 * Three.js uses Y-up, so we map:
 *   latitude  → elevation from the equator (Y axis)
 *   longitude → rotation around the Y axis (X-Z plane)
 *
 * The resulting coordinate system matches a standard Three.js sphere
 * where the prime meridian (lng 0) faces the camera at (0, 0, radius).
 */
export function latLngToVector3(
  lat: number,
  lng: number,
  radius: number = 1,
): Vector3 {
  const phi = (90 - lat) * DEG2RAD;
  const theta = (lng + 180) * DEG2RAD;

  return new Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/**
 * Compute the globe Y-rotation (in radians) needed to face a given longitude.
 * Used to animate the globe so a destination rotates into view.
 *
 * Must be consistent with `latLngToVector3` which uses
 * `theta = (lng + 180) * DEG2RAD`.  The rotation that places
 * the destination's surface point at Z+ (facing the camera) is
 * the negative of `atan2(x, z)` for that point on the equator.
 */
export function lngToGlobeRotationY(lng: number): number {
  const theta = (lng + 180) * DEG2RAD;
  /* x and z of the unrotated surface point (equator, radius = 1) */
  const x = -Math.cos(theta);
  const z = Math.sin(theta);
  return -Math.atan2(x, z);
}

/**
 * Compute a camera latitude tilt (polar angle offset) for a given latitude.
 * Returns a value suitable for adjusting the camera's polar angle so it
 * looks at the correct latitude band on the globe.
 */
export function latToCameraPolar(lat: number): number {
  return lat * DEG2RAD;
}

/**
 * Spherical linear interpolation factor for smooth globe rotation.
 * Returns the great-circle angular distance (radians) between two points.
 */
export function angularDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const phi1 = lat1 * DEG2RAD;
  const phi2 = lat2 * DEG2RAD;
  const dPhi = (lat2 - lat1) * DEG2RAD;
  const dLambda = (lng2 - lng1) * DEG2RAD;

  const a =
    Math.sin(dPhi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) ** 2;

  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
