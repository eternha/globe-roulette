import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points as PointsType, ShaderMaterial } from "three";
import { AdditiveBlending } from "three";

/**
 * Reduce star count on mobile for GPU performance.
 * 3500 is visually indistinguishable from 6000 on a small screen.
 */
const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 500;
const STAR_COUNT = IS_MOBILE ? 3500 : 6000;
const SPREAD = 100;

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aTemp;

  uniform float uTime;
  uniform float uPixelRatio;

  varying float vAlpha;
  varying float vTemp;

  void main() {
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPos;

    float twinkle = sin(uTime * (0.4 + aPhase * 1.6) + aPhase * 62.83) * 0.5 + 0.5;
    twinkle = mix(0.3, 1.0, twinkle * twinkle);

    float dist = -mvPos.z;
    float attenuation = 200.0 / (dist * dist + 1.0);

    gl_PointSize = aSize * attenuation * uPixelRatio * twinkle;
    gl_PointSize = clamp(gl_PointSize, 0.5, 4.0);

    vAlpha = twinkle * smoothstep(400.0, 60.0, dist);
    vTemp = aTemp;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying float vTemp;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float circle = 1.0 - smoothstep(0.0, 1.0, d);
    float glow = exp(-d * d * 3.0);
    float shape = circle * 0.6 + glow * 0.4;

    vec3 cool = vec3(0.75, 0.85, 1.0);
    vec3 warm = vec3(1.0, 0.92, 0.8);
    vec3 color = mix(cool, warm, vTemp);

    gl_FragColor = vec4(color, shape * vAlpha * 0.9);
  }
`;

export function SpaceBackground() {
  const ref = useRef<PointsType>(null);
  const matRef = useRef<ShaderMaterial>(null);

  const { positions, sizes, phases, temps } = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    const sz = new Float32Array(STAR_COUNT);
    const ph = new Float32Array(STAR_COUNT);
    const tp = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;
      const r = SPREAD * (0.3 + 0.7 * Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);

      const mag = Math.pow(Math.random(), 2.5);
      sz[i] = 0.4 + mag * 3.0;
      ph[i] = Math.random();
      tp[i] = Math.random();
    }

    return { positions: pos, sizes: sz, phases: ph, temps: tp };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    }),
    [],
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.001;
    }
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        <bufferAttribute attach="attributes-aTemp" args={[temps, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
