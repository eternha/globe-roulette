import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Earth } from "./Earth";
import { Clouds } from "./Clouds";
import { Atmosphere } from "./Atmosphere";
// EarthGlow removed — Earth shader rim + Atmosphere BackSide is sufficient
import { SpaceBackground } from "./SpaceBackground";
import { CameraRig } from "./CameraRig";
import { DestinationMarker } from "./DestinationMarker";
import { getInitialCameraZ } from "../../lib/responsive";

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

export function GlobeScene() {
  const initialZ = useMemo(() => getInitialCameraZ(BASE_CAMERA_Z), []);

  return (
    <div
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
        {/* Key light — warm sunlight */}
        <directionalLight position={[5, 3, 4]} intensity={1.8} />
        {/* Fill light — cool blue from opposite side */}
        <directionalLight
          position={[-4, -1, 2]}
          intensity={0.08}
          color="#4488cc"
        />
        {/* Minimal ambient for deep shadows */}
        <ambientLight intensity={0.04} />

        <CameraRig />
        <SpaceBackground />
        <Suspense fallback={<EarthFallback />}>
          <Earth />
          <Clouds />
        </Suspense>

        <Atmosphere />
        <DestinationMarker />
      </Canvas>
    </div>
  );
}
