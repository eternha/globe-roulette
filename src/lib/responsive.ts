/**
 * Responsive camera utilities.
 *
 * Three.js uses vertical FOV, which means portrait screens get a very
 * narrow horizontal FOV. On a 390×844 phone (aspect 0.46), a globe
 * at Z=6.5 overflows the viewport horizontally.
 *
 * These utilities compute an aspect-ratio-aware camera distance so the
 * globe fits comfortably (about 80% of viewport width) on any screen.
 */

/** Aspect ratio above which the default camera values work well */
const BREAKPOINT_ASPECT = 0.65;

/** Maximum scale factor to avoid pushing the globe too far away */
const MAX_SCALE = 1.35;

/**
 * Compute a multiplier for camera Z distances based on viewport aspect.
 *
 * Returns 1.0 on landscape/desktop, up to MAX_SCALE on narrow phones.
 * All camera Z values (idle, pull, impact, result) should be multiplied
 * by this factor for consistent framing.
 */
export function getCameraZScale(aspect: number): number {
  if (aspect >= BREAKPOINT_ASPECT) return 1;
  return Math.min(BREAKPOINT_ASPECT / aspect, MAX_SCALE);
}

/**
 * Compute the initial camera Z for the Canvas element.
 * Uses window dimensions since the camera is created before R3F mounts.
 */
export function getInitialCameraZ(baseZ: number): number {
  if (typeof window === "undefined") return baseZ;
  const aspect = window.innerWidth / window.innerHeight;
  return baseZ * getCameraZScale(aspect);
}
