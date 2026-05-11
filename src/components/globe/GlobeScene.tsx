import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { DirectionalLight, AmbientLight } from "three";
import { MathUtils } from "three";
import { Earth } from "./Earth";
import { Clouds } from "./Clouds";
import { Atmosphere } from "./Atmosphere";
// EarthGlow removed — Earth shader rim + Atmosphere BackSide is sufficient
import { SpaceBackground } from "./SpaceBackground";
import { CameraRig } from "./CameraRig";
import { DestinationMarker } from "./DestinationMarker";
import { Projectile } from "./Projectile";
import { getInitialCameraZ } from "../../lib/responsive";
import { useSunDirection } from "../../hooks/useSunDirection";
import { rouletteStore } from "../../stores/rouletteStore";

export const BASE_CAMERA_Z = 6.5;
const CAMERA_FOV = 60;

/**
 * Fallback Earth while textures load — simple dark sphere
 * so the scene doesn't flash white during loading.
 */
function EarthFallback() {
  return (
    <mesh>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial color="#0a1628" />
    </mesh>
  );
}

/**
 * Dynamic lighting rig that adjusts scene brightness based on the
 * real sun position (device clock + optional geolocation).
 *
 * - Key light follows the sun direction and dims at night
 * - Fill light provides subtle counter-illumination
 * - Ambient raises during twilight so the globe never goes fully black
 * - Star brightness inversely tracks daylight
 */
function DynamicLighting() {
  const keyRef = useRef<DirectionalLight>(null);
  const fillRef = useRef<DirectionalLight>(null);
  const ambientRef = useRef<AmbientLight>(null);

  /* Initialise + continuously update sun direction in the store */
  useSunDirection();

  /* Current lerped value to avoid popping */
  const currentDaylight = useRef(0.5);

  useFrame((_state, delta) => {
    const { daylightFactor } = rouletteStore.getState();

    /* Smooth transitions (exponential convergence) */
    const alpha = 1 - Math.exp(-1.5 * delta);
    currentDaylight.current = MathUtils.lerp(
      currentDaylight.current,
      daylightFactor,
      alpha,
    );

    const dl = currentDaylight.current;

    /* ── Key light: fixed front-right position, intensity varies ──
     *  The Earth shader already handles realistic day/night via uSunDir.
     *  Scene lights provide pleasant illumination of the camera-facing
     *  hemisphere, with intensity/warmth driven by the viewer's local
     *  time of day (daylightFactor). */
    if (keyRef.current) {
      keyRef.current.position.set(5, 3, 4);
      // Night: 0.5, Day: 1.8
      keyRef.current.intensity = MathUtils.lerp(0.5, 1.8, dl);
    }

    /* ── Fill light: fixed left-low, subtle counter-illumination ── */
    if (fillRef.current) {
      fillRef.current.position.set(-4, -1, 2);
      // Night: 0.2 (more fill to see features), Day: 0.08
      fillRef.current.intensity = MathUtils.lerp(0.2, 0.08, dl);
    }

    /* ── Ambient: slightly brighter at night for visibility ── */
    if (ambientRef.current) {
      // Night: 0.1, Day: 0.04
      ambientRef.current.intensity = MathUtils.lerp(0.1, 0.04, dl);
    }
  });

  return (
    <>
      {/* Key light — warm sunlight */}
      <directionalLight ref={keyRef} position={[5, 3, 4]} intensity={1.8} />
      {/* Fill light — cool blue from opposite side */}
      <directionalLight
        ref={fillRef}
        position={[-4, -1, 2]}
        intensity={0.08}
        color="#4488cc"
      />
      {/* Minimal ambient for deep shadows */}
      <ambientLight ref={ambientRef} intensity={0.04} />
    </>
  );
}

/**
 * Interpolate between night and day background CSS colors.
 * Returns a radial gradient string.
 */
function getBackgroundGradient(daylightFactor: number): string {
  // Night: deep blue-black. Day: slightly brighter blue-navy.
  // We keep it dark even during day (the globe is in space) but
  // tint it warmer and brighter to suggest scattered sunlight.
  const t = daylightFactor;

  // Center color: #0a1628 (night) → #101e38 (day)
  const c1r = Math.round(MathUtils.lerp(0x0a, 0x10, t));
  const c1g = Math.round(MathUtils.lerp(0x16, 0x1e, t));
  const c1b = Math.round(MathUtils.lerp(0x28, 0x38, t));

  // Mid color: #060d18 (night) → #0a1424 (day)
  const c2r = Math.round(MathUtils.lerp(0x06, 0x0a, t));
  const c2g = Math.round(MathUtils.lerp(0x0d, 0x14, t));
  const c2b = Math.round(MathUtils.lerp(0x18, 0x24, t));

  // Edge color: #020408 (night) → #040810 (day)
  const c3r = Math.round(MathUtils.lerp(0x02, 0x04, t));
  const c3g = Math.round(MathUtils.lerp(0x04, 0x08, t));
  const c3b = Math.round(MathUtils.lerp(0x08, 0x10, t));

  const hex = (r: number, g: number, b: number) =>
    `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  return `radial-gradient(ellipse at 50% 50%, ${hex(c1r, c1g, c1b)} 0%, ${hex(c2r, c2g, c2b)} 40%, ${hex(c3r, c3g, c3b)} 100%)`;
}

export function GlobeScene() {
  const initialZ = useMemo(() => getInitialCameraZ(BASE_CAMERA_Z), []);
  const bgRef = useRef<HTMLDivElement>(null);

  /* Update background gradient based on daylight (low frequency) */
  useEffect(() => {
    let frame: number;
    let lastDl = -1;

    function tick() {
      const dl = rouletteStore.getState().daylightFactor;
      // Only update DOM when the factor changes noticeably
      if (bgRef.current && Math.abs(dl - lastDl) > 0.01) {
        lastDl = dl;
        bgRef.current.style.background = getBackgroundGradient(dl);
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={bgRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background:
          "radial-gradient(ellipse at 50% 50%, #0a1628 0%, #060d18 40%, #020408 100%)",
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, initialZ],
          fov: CAMERA_FOV,
          near: 0.1,
          far: 200,
        }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <DynamicLighting />
        <CameraRig />
        <SpaceBackground />
        <Suspense fallback={<EarthFallback />}>
          <Earth />
          <Clouds />
        </Suspense>

        <Atmosphere />
        <Projectile />
        <DestinationMarker />
      </Canvas>
    </div>
  );
}
