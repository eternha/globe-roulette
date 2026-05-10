import { useMemo } from "react";
import { AdditiveBlending, FrontSide } from "three";
import { Earth } from "./Earth";

/** Subtle outer halo — much smaller than before */
const GLOW_SCALE = 1.3;

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
    float rim = 1.0 - max(dot(vNormal, vViewDir), 0.0);

    /* Very soft, barely visible glow */
    float glow = pow(rim, 6.0) * 0.1;
    float inner = pow(rim, 12.0) * 0.15;
    float intensity = glow + inner;

    vec3 glowColor = vec3(0.2, 0.45, 0.9);

    gl_FragColor = vec4(glowColor, intensity);
  }
`;

export function EarthGlow() {
  const uniforms = useMemo(() => ({}), []);

  return (
    <mesh scale={GLOW_SCALE}>
      <sphereGeometry args={[Earth.RADIUS, 48, 48]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        blending={AdditiveBlending}
        side={FrontSide}
        depthWrite={false}
      />
    </mesh>
  );
}
