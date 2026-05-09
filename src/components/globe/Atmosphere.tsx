import { useMemo } from "react";
import { BackSide, Color, AdditiveBlending } from "three";
import { Earth } from "./Earth";

const ATM_SCALE = 1.08;
const ATM_COLOR = new Color("#00dbe9");

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
    float facing = dot(vNormal, vViewDir);
    float rim = pow(0.7 - facing, 2.5);
    float edge = pow(0.5 - facing, 5.0) * 2.0;
    float intensity = clamp(rim + edge, 0.0, 1.0) * 0.75;

    gl_FragColor = vec4(uColor, intensity);
  }
`;

export function Atmosphere() {
  const uniforms = useMemo(
    () => ({
      uColor: { value: ATM_COLOR },
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
