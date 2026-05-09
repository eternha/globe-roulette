import { useMemo } from "react";
import { AdditiveBlending, FrontSide, Color } from "three";
import { Earth } from "./Earth";

const GLOW_SCALE = 2.8;
const GLOW_COLOR = new Color("#00a0d6");

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
  uniform vec3 uColor;

  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float rim = 1.0 - max(dot(vNormal, vViewDir), 0.0);
    float glow = pow(rim, 3.0) * 0.35;
    float inner = pow(rim, 6.0) * 0.5;
    float intensity = glow + inner;

    gl_FragColor = vec4(uColor, intensity);
  }
`;

export function EarthGlow() {
  const uniforms = useMemo(
    () => ({
      uColor: { value: GLOW_COLOR },
    }),
    [],
  );

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
