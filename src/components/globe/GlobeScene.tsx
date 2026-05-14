import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Earth } from "./Earth";
import { Clouds } from "./Clouds";
import { Atmosphere } from "./Atmosphere";
import { SpaceBackground } from "./SpaceBackground";
import { CameraRig } from "./CameraRig";
import { DestinationMarker } from "./DestinationMarker";
import { Projectile } from "./Projectile";
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
        top: 0,
        left: 0,
        right: 0,
        /*
         * Extend past the iOS home-indicator safe area so WebGL renders
         * all the way to the physical screen edge — no native iOS gray
         * background can bleed through.
         */
        bottom: "calc(-1 * env(safe-area-inset-bottom, 0px))",
        zIndex: 0,
        background: "#000",
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
        {/* Simple static lighting — always bright */}
        <directionalLight position={[5, 3, 5]} intensity={1.6} />
        <directionalLight
          position={[-3, -1, 3]}
          intensity={0.15}
          color="#4488cc"
        />
        <ambientLight intensity={0.06} />

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
