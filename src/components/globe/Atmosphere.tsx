import { useMemo } from "react";
import { BackSide, AdditiveBlending } from "three";
import { Earth } from "./Earth";

/** Atmosphere shell — just barely above the surface */
const ATM_SCALE = 1.04;

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float facing = dot(vNormal, vViewDir);

    /* Very thin Rayleigh-style rim — sharp falloff */
    float rim = pow(max(0.6 - facing, 0.0), 4.0);
    float intensity = clamp(rim, 0.0, 1.0);

    /* Subtle blue atmospheric scatter */
    vec3 atmColor = vec3(0.3, 0.55, 1.0);

    gl_FragColor = vec4(atmColor, intensity * 0.2);
  }
`;

export function Atmosphere() {
  const uniforms = useMemo(() => ({}), []);

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
