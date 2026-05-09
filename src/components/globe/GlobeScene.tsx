import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Earth } from "./Earth";
import { Atmosphere } from "./Atmosphere";
import { EarthGlow } from "./EarthGlow";
import { SpaceBackground } from "./SpaceBackground";
import { CameraRig } from "./CameraRig";
import { DestinationMarker } from "./DestinationMarker";
import { getInitialCameraZ } from "../../lib/responsive";

export const BASE_CAMERA_Z = 6.5;
const CAMERA_FOV = 60;

export function GlobeScene() {
  /*
   * Compute the initial camera Z once at mount time.
   * CameraRig takes over on subsequent frames and handles resizing.
   */
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
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 3, 4]} intensity={1.5} />
        <directionalLight
          position={[-3, -1, 2]}
          intensity={0.15}
          color="#4488cc"
        />

        <CameraRig />
        <SpaceBackground />
        <EarthGlow />
        <Earth />
        <Atmosphere />
        <DestinationMarker />
      </Canvas>
    </div>
  );
}
