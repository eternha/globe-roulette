import { useMemo } from "react";
import { BackSide, AdditiveBlending } from "three";
import { Earth } from "./Earth";

/** Atmosphere shell — just barely above the surface */
const ATM_SCALE = 1.04;

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPos;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uSunDir;

  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPos;

  void main() {
    float facing = dot(vNormal, vViewDir);

    /* Very thin Rayleigh-style rim — sharp falloff */
    float rim = pow(max(0.6 - facing, 0.0), 4.0);
    float intensity = clamp(rim, 0.0, 1.0);

    /* Sun-facing side slightly brighter */
    float sunFacing = max(dot(normalize(vWorldPos), uSunDir), 0.0);
    float sunBoost = 0.7 + sunFacing * 0.3;

    /* Subtle blue atmospheric scatter */
    vec3 atmColor = vec3(0.3, 0.55, 1.0);

    gl_FragColor = vec4(atmColor, intensity * sunBoost * 0.2);
  }
`;

export function Atmosphere() {
  const uniforms = useMemo(
    () => ({
      uSunDir: { value: [0.8, 0.4, 0.5] },
    }),
    [],
  );

  return (
    <mesh scale={ATM_SCALE}>
      <sphereGeometry args={[Earth.RADIUS, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        blending={AdditiveBlending}
        side={BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}
