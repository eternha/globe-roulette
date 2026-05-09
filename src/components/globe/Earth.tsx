import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh, ShaderMaterial } from "three";
import { Color, MathUtils } from "three";
import { rouletteStore } from "../../stores/rouletteStore";

const RADIUS = 2;
const SEGMENTS = 64;

/** Rotation speeds in radians per second */
const IDLE_SPEED = 0.08;
const MAX_PULL_SPEED = 0.6;
const LAUNCH_PEAK_SPEED = 3.5;

/**
 * How quickly the current speed converges toward the target.
 * Higher = snappier response. 4–6 feels cinematic.
 */
const LERP_RATE = 5;

const LAND_COLOR = new Color("#1a6b4a");
const OCEAN_COLOR = new Color("#0a2a4a");
const ICE_COLOR = new Color("#c8dce8");
const COAST_COLOR = new Color("#2a8b6a");

/**
 * Procedural Earth shader.
 * Generates a recognizable globe with continents, oceans, and ice caps
 * using layered simplex-like noise. Designed to be replaced with real
 * textures once available — just swap the material.
 */
const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uLandColor;
  uniform vec3 uOceanColor;
  uniform vec3 uIceColor;
  uniform vec3 uCoastColor;
  uniform vec3 uLightDir;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  // simplex-style hash
  vec3 hash3(vec3 p) {
    p = vec3(
      dot(p, vec3(127.1, 311.7, 74.7)),
      dot(p, vec3(269.5, 183.3, 246.1)),
      dot(p, vec3(113.5, 271.9, 124.6))
    );
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise3d(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(
        mix(dot(hash3(i + vec3(0,0,0)), f - vec3(0,0,0)),
            dot(hash3(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
        mix(dot(hash3(i + vec3(0,1,0)), f - vec3(0,1,0)),
            dot(hash3(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
      mix(
        mix(dot(hash3(i + vec3(0,0,1)), f - vec3(0,0,1)),
            dot(hash3(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
        mix(dot(hash3(i + vec3(0,1,1)), f - vec3(0,1,1)),
            dot(hash3(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y),
      u.z
    );
  }

  float fbm(vec3 p) {
    float val = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 5; i++) {
      val += amp * noise3d(p * freq);
      amp *= 0.5;
      freq *= 2.0;
    }
    return val;
  }

  void main() {
    vec3 spherePos = normalize(vPosition) * 3.0;
    float n = fbm(spherePos + vec3(0.0, 0.0, 1.5));

    float landMask = smoothstep(-0.02, 0.05, n);
    float iceMask = smoothstep(0.75, 0.85, abs(vUv.y - 0.5) * 2.0);

    vec3 land = mix(uLandColor, uCoastColor, smoothstep(0.0, 0.15, n));
    vec3 color = mix(uOceanColor, land, landMask);
    color = mix(color, uIceColor, iceMask * 0.8);

    // Lighting
    float diffuse = max(dot(vNormal, uLightDir), 0.0);
    float ambient = 0.12;
    float rim = pow(1.0 - max(dot(vNormal, normalize(cameraPosition - vPosition)), 0.0), 3.0);

    vec3 lit = color * (ambient + diffuse * 0.88);
    lit += vec3(0.0, 0.85, 0.92) * rim * 0.15;

    gl_FragColor = vec4(lit, 1.0);
  }
`;

export function Earth() {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const currentSpeed = useRef(IDLE_SPEED);

  const uniforms = useMemo(
    () => ({
      uLandColor: { value: LAND_COLOR },
      uOceanColor: { value: OCEAN_COLOR },
      uIceColor: { value: ICE_COLOR },
      uCoastColor: { value: COAST_COLOR },
      uLightDir: { value: [0.8, 0.6, 0.5] },
      uTime: { value: 0 },
    }),
    [],
  );

  /**
   * Rotation captured at the moment the launch begins.
   * Used as the "start" for the steering interpolation.
   */
  const launchStartRotation = useRef(0);
  const launchStarted = useRef(false);

  useFrame((_state, delta) => {
    const {
      phase,
      pullStrength,
      launchProgress,
      lastPullStrength,
      targetRotationY,
    } = rouletteStore.getState();

    /* Compute target speed based on current phase */
    let targetSpeed = IDLE_SPEED;
    if (phase === "pulling") {
      /* Ease-in curve: gentle at first, accelerates toward full pull */
      const eased = pullStrength * pullStrength;
      targetSpeed = MathUtils.lerp(IDLE_SPEED, MAX_PULL_SPEED, eased);
    } else if (phase === "launching") {
      /*
       * Launch curve: burst up quickly then decelerate.
       * The peak speed scales with how hard the user pulled.
       * Uses a bell-like curve: ramps up in the first 30%,
       * then decelerates through the remaining 70%.
       */
      const intensity = 0.4 + lastPullStrength * 0.6;
      const peak = LAUNCH_PEAK_SPEED * intensity;

      let speedCurve: number;
      if (launchProgress < 0.3) {
        /* Ramp up */
        const t = launchProgress / 0.3;
        speedCurve = t * t;
      } else {
        /* Decelerate with ease-out */
        const t = (launchProgress - 0.3) / 0.7;
        speedCurve = 1 - t * t;
      }

      targetSpeed = IDLE_SPEED + peak * speedCurve;
    }

    /* Smoothly converge toward target speed (frame-rate independent) */
    const lerpFactor = phase === "launching" ? 8 : LERP_RATE;
    const lerpAlpha = 1 - Math.exp(-lerpFactor * delta);
    currentSpeed.current = MathUtils.lerp(
      currentSpeed.current,
      targetSpeed,
      lerpAlpha,
    );

    if (meshRef.current) {
      /*
       * Globe orientation toward destination during launch.
       *
       * Strategy: for the first ~40% of the launch we let the globe
       * spin freely (dramatic acceleration). In the final ~60% we
       * smoothly interpolate rotation toward the pre-computed target
       * so the selected destination faces the camera on impact.
       *
       * The blend uses a cubic ease-in so the steering is invisible
       * at first and increasingly dominant as the globe decelerates.
       *
       * TODO: v2 — add latitude alignment via camera polar tilt or
       * Earth X-rotation for full lat/lng orientation.
       */

      if (phase === "launching" && !launchStarted.current) {
        launchStartRotation.current = meshRef.current.rotation.y;
        launchStarted.current = true;
      }

      if (phase !== "launching" && phase !== "impact" && phase !== "result") {
        launchStarted.current = false;
      }

      const shouldSteer =
        phase === "launching" &&
        targetRotationY != null &&
        launchProgress > 0.4;

      if (shouldSteer) {
        /*
         * steerT goes 0→1 as launchProgress goes 0.4→1.0
         * Cubic ease-in: slow start, strong finish.
         */
        const steerT = (launchProgress - 0.4) / 0.6;
        const easedSteer = steerT * steerT * steerT;

        /* Free-spin position (what rotation would be without steering) */
        const freeRotation =
          meshRef.current.rotation.y + delta * currentSpeed.current;

        /* Blend between free-spin and target */
        meshRef.current.rotation.y = MathUtils.lerp(
          freeRotation,
          targetRotationY,
          easedSteer,
        );
      } else {
        meshRef.current.rotation.y += delta * currentSpeed.current;
      }

      rouletteStore.setEarthRotationY(meshRef.current.rotation.y);
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[RADIUS, SEGMENTS, SEGMENTS]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

Earth.RADIUS = RADIUS;
