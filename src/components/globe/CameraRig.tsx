import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, PerspectiveCamera, Vector3 } from "three";
import { rouletteStore } from "../../stores/rouletteStore";
import { getCameraZScale } from "../../lib/responsive";
import { latLngToVector3 } from "../../lib/geo";
import { Earth } from "./Earth";

/* ── Base camera Z positions (designed for landscape / ~1:1 aspect) ── */

const Z_IDLE = 6.5;
const Z_PULL_CLOSEST = 5.8;
const Z_IMPACT = 3.2;
const Z_LANDED = 3.4;
const Z_RESULT = 4.0;

/**
 * Lerp rates per phase.
 * Higher = snappier convergence toward the target.
 */
const RATE_DEFAULT = 3;
const RATE_IMPACT = 6;
const RATE_RESULT = 2.5;
const RATE_RESET = 2;

/** How far up/down the camera tilts toward the destination latitude */
const MAX_CAMERA_Y_OFFSET = 1.2;

/** Scratch vector to avoid allocations in useFrame */
const _surfacePoint = new Vector3();

/**
 * Animates camera position based on the current phase.
 *
 * During impact/landed phases, the camera also tilts vertically
 * toward the destination's latitude so the marker is centered
 * on screen rather than hidden at the pole or equator edge.
 */
export function CameraRig() {
  const { camera } = useThree();
  const currentZ = useRef(camera.position.z);
  const currentY = useRef(0);

  // eslint-disable-next-line react-hooks/immutability -- R3F useFrame mutates camera each frame by design
  useFrame((_state, delta) => {
    const { phase, pullStrength, launchProgress, selectedDestination, earthRotationY } =
      rouletteStore.getState();

    const aspect = (camera as PerspectiveCamera).aspect ?? 1;
    const scale = getCameraZScale(aspect);

    const idleZ = Z_IDLE * scale;
    const pullZ = Z_PULL_CLOSEST * scale;
    const impactZ = Z_IMPACT * scale;
    const landedZ = Z_LANDED * scale;
    const resultZ = Z_RESULT * scale;

    let targetZ: number;
    let targetY = 0;
    let rate: number;

    const isZoomedIn =
      phase === "impact" || phase === "landed" || phase === "result";

    switch (phase) {
      case "pulling": {
        const eased = pullStrength * pullStrength;
        targetZ = MathUtils.lerp(idleZ, pullZ, eased);
        rate = RATE_DEFAULT;
        break;
      }

      case "launching": {
        const eased = 1 - Math.pow(1 - launchProgress, 3);
        targetZ = MathUtils.lerp(idleZ, impactZ, eased);
        currentZ.current = targetZ;
        camera.position.z = targetZ; // eslint-disable-line react-hooks/immutability -- R3F requires direct camera mutation
        return;
      }

      case "impact": {
        targetZ = impactZ;
        rate = RATE_IMPACT;
        break;
      }

      case "landed": {
        targetZ = landedZ;
        rate = RATE_RESULT;
        break;
      }

      case "result": {
        targetZ = resultZ;
        rate = RATE_RESULT;
        break;
      }

      default: {
        targetZ = idleZ;
        rate = currentZ.current < idleZ - 0.1 ? RATE_RESET : RATE_DEFAULT;
        break;
      }
    }

    /*
     * During zoomed-in phases, tilt the camera Y toward
     * the destination's surface point so it's centered.
     */
    if (isZoomedIn && selectedDestination) {
      const surfaceLocal = latLngToVector3(
        selectedDestination.lat,
        selectedDestination.lng,
        Earth.RADIUS,
      );

      /* Apply current Earth rotation to get world position */
      const cosR = Math.cos(earthRotationY);
      const sinR = Math.sin(earthRotationY);
      _surfacePoint.set(
        surfaceLocal.x * cosR + surfaceLocal.z * sinR,
        surfaceLocal.y,
        -surfaceLocal.x * sinR + surfaceLocal.z * cosR,
      );

      /* Clamp so the camera doesn't go too far up/down */
      targetY = MathUtils.clamp(
        _surfacePoint.y * 0.5,
        -MAX_CAMERA_Y_OFFSET,
        MAX_CAMERA_Y_OFFSET,
      );
    }

    const alpha = 1 - Math.exp(-rate * delta);
    currentZ.current = MathUtils.lerp(currentZ.current, targetZ, alpha);
    currentY.current = MathUtils.lerp(currentY.current, targetY, alpha);

    camera.position.z = currentZ.current;
    camera.position.y = currentY.current;
  });

  return null;
}
