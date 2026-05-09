import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, PerspectiveCamera } from "three";
import { rouletteStore } from "../../stores/rouletteStore";
import { getCameraZScale } from "../../lib/responsive";

/* ── Base camera Z positions (designed for landscape / ~1:1 aspect) ── */

const Z_IDLE = 6.5;
const Z_PULL_CLOSEST = 5.8;
const Z_IMPACT = 4.0;
const Z_RESULT = 4.6;

/**
 * Lerp rates per phase.
 * Higher = snappier convergence toward the target.
 *
 *   pulling:   gentle drift closer as user drags
 *   launching: driven by launchProgress curve, not lerp
 *   impact:    quick snap to close-up
 *   result:    slow ease-back to give room for the card
 *   idle:      smooth return to resting distance
 */
const RATE_DEFAULT = 3;
const RATE_IMPACT = 6;
const RATE_RESULT = 2.5;
const RATE_RESET = 2;

/**
 * Animates the camera Z position based on the current phase.
 *
 * All Z positions are scaled by the viewport aspect ratio so the globe
 * fits comfortably on portrait phones (where horizontal FOV is narrow).
 *
 * idle      → resting distance
 * pulling   → slight approach proportional to pullStrength
 * launching → cinematic zoom driven by launchProgress (ease-out cubic)
 * impact    → snaps close for dramatic hit
 * result    → eases back slightly to make room for the destination card
 * idle      → smooth glide back to resting distance on reset
 *
 * All transitions use frame-rate-independent exponential lerp.
 */
export function CameraRig() {
  const { camera } = useThree();
  const currentZ = useRef(camera.position.z);

  // eslint-disable-next-line react-hooks/immutability -- R3F useFrame mutates camera each frame by design
  useFrame((_state, delta) => {
    const { phase, pullStrength, launchProgress } = rouletteStore.getState();

    /*
     * Recompute scale factor each frame so orientation changes
     * (and resize events) are handled without remounting.
     */
    const aspect = (camera as PerspectiveCamera).aspect ?? 1;
    const scale = getCameraZScale(aspect);

    const idleZ = Z_IDLE * scale;
    const pullZ = Z_PULL_CLOSEST * scale;
    const impactZ = Z_IMPACT * scale;
    const resultZ = Z_RESULT * scale;

    let targetZ: number;
    let rate: number;

    switch (phase) {
      case "pulling": {
        /* Subtle approach: full pull brings camera ~0.7 units closer */
        const eased = pullStrength * pullStrength;
        targetZ = MathUtils.lerp(idleZ, pullZ, eased);
        rate = RATE_DEFAULT;
        break;
      }

      case "launching": {
        /*
         * Ease-out cubic driven by the rAF launch timer.
         * Fast initial zoom, gentle arrival — feels like
         * the camera is being pulled toward the globe.
         */
        const eased = 1 - Math.pow(1 - launchProgress, 3);
        targetZ = MathUtils.lerp(idleZ, impactZ, eased);
        /* Bypass lerp — write the eased value directly so
           the zoom tracks the launch timeline exactly. */
        currentZ.current = targetZ;
        camera.position.z = targetZ; // eslint-disable-line react-hooks/immutability -- R3F requires direct camera mutation
        return;
      }

      case "impact": {
        targetZ = impactZ;
        rate = RATE_IMPACT;
        break;
      }

      case "result": {
        targetZ = resultZ;
        rate = RATE_RESULT;
        break;
      }

      default: {
        /* idle — includes the reset-from-result glide */
        targetZ = idleZ;
        rate = currentZ.current < idleZ - 0.1 ? RATE_RESET : RATE_DEFAULT;
        break;
      }
    }

    const alpha = 1 - Math.exp(-rate * delta);
    currentZ.current = MathUtils.lerp(currentZ.current, targetZ, alpha);
    camera.position.z = currentZ.current;
  });

  return null;
}
