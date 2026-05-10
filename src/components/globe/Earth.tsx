import { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import type { Mesh, ShaderMaterial } from "three";
import { MathUtils, TextureLoader, SRGBColorSpace } from "three";
import { rouletteStore } from "../../stores/rouletteStore";
import { LAUNCH_DURATION_MS } from "../../hooks/useRouletteMachine";

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

/* ── Custom PBR-like shader with day/night, specular, bump ── */

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying vec3 vViewDir;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vPosition = worldPos.xyz;
    vUv = uv;

    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPos.xyz);

    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uDayMap;
  uniform sampler2D uNightMap;
  uniform sampler2D uSpecularMap;
  uniform sampler2D uBumpMap;
  uniform vec3 uSunDir;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying vec3 vViewDir;

  void main() {
    /* ── Sample textures ────────────────────────────────── */
    vec3 dayColor = texture2D(uDayMap, vUv).rgb;
    vec3 nightColor = texture2D(uNightMap, vUv).rgb;
    float specMask = texture2D(uSpecularMap, vUv).r;

    /* ── Bump-mapped normal (finite differences) ────────── */
    float bumpScale = 0.015;
    float texelSize = 1.0 / 2048.0;
    float hL = texture2D(uBumpMap, vUv - vec2(texelSize, 0.0)).r;
    float hR = texture2D(uBumpMap, vUv + vec2(texelSize, 0.0)).r;
    float hD = texture2D(uBumpMap, vUv - vec2(0.0, texelSize)).r;
    float hU = texture2D(uBumpMap, vUv + vec2(0.0, texelSize)).r;

    vec3 bumpNormal = normalize(vNormal +
      bumpScale * ((hR - hL) * cross(vNormal, vec3(0.0, 1.0, 0.0)) +
                   (hU - hD) * cross(vec3(1.0, 0.0, 0.0), vNormal)));

    /* ── Diffuse lighting ───────────────────────────────── */
    float NdotL = dot(bumpNormal, uSunDir);
    float diffuse = max(NdotL, 0.0);

    /* ── Specular (Blinn-Phong) — oceans only ───────────── */
    vec3 halfDir = normalize(uSunDir + vViewDir);
    float spec = pow(max(dot(bumpNormal, halfDir), 0.0), 80.0);
    spec *= specMask * diffuse;

    /* ── Day / night blend ──────────────────────────────── */
    float terminator = smoothstep(-0.15, 0.2, NdotL);
    vec3 litDay = dayColor * (0.06 + diffuse * 0.94);
    litDay += vec3(0.85, 0.95, 1.0) * spec * 0.6;

    /* Night lights: boost brightness and warm them up */
    vec3 litNight = nightColor * 1.8;

    vec3 color = mix(litNight, litDay, terminator);

    /* ── Subtle atmospheric rim tint (thin limb glow) ──── */
    float rim = 1.0 - max(dot(vNormal, vViewDir), 0.0);
    float rimGlow = pow(rim, 5.0) * 0.2;
    vec3 rimColor = vec3(0.3, 0.55, 1.0);
    color += rimColor * rimGlow * terminator;

    gl_FragColor = vec4(color, 1.0);
  }
`;

/* ── Component ──────────────────────────────────────────── */

export function Earth() {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const currentSpeed = useRef(IDLE_SPEED);

  /* Load textures */
  const [dayMap, nightMap, specularMap, bumpMap] = useLoader(TextureLoader, [
    "/textures/earth_day.jpg",
    "/textures/earth_night.jpg",
    "/textures/earth_specular.jpg",
    "/textures/earth_normal.jpg",
  ]);

  /* Ensure day map renders in correct color space */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability -- Three.js textures require mutable colorSpace assignment
    dayMap.colorSpace = SRGBColorSpace;
    // eslint-disable-next-line react-hooks/immutability
    nightMap.colorSpace = SRGBColorSpace;
  }, [dayMap, nightMap]);

  const uniforms = useMemo(
    () => ({
      uDayMap: { value: dayMap },
      uNightMap: { value: nightMap },
      uSpecularMap: { value: specularMap },
      uBumpMap: { value: bumpMap },
      uSunDir: { value: [0.8, 0.4, 0.5] },
      uTime: { value: 0 },
    }),
    [dayMap, nightMap, specularMap, bumpMap],
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
      launchStartTime,
      lastPullStrength,
      targetRotationY,
    } = rouletteStore.getState();

    /* Compute live launch progress from start time */
    const launchProgress =
      phase === "launching" && launchStartTime > 0
        ? Math.min(
            (performance.now() - launchStartTime) / LAUNCH_DURATION_MS,
            1,
          )
        : 0;

    /* ── Stopped phases: globe is locked on the destination ── */
    const isStopped =
      phase === "impact" || phase === "landed" || phase === "result";

    if (isStopped) {
      /* Decelerate smoothly to zero */
      const brakeAlpha = 1 - Math.exp(-6 * delta);
      currentSpeed.current = MathUtils.lerp(currentSpeed.current, 0, brakeAlpha);

      /* Lock rotation to the target so destination faces camera */
      if (meshRef.current && targetRotationY != null) {
        const lockAlpha = 1 - Math.exp(-4 * delta);
        meshRef.current.rotation.y = MathUtils.lerp(
          meshRef.current.rotation.y,
          targetRotationY,
          lockAlpha,
        );
        rouletteStore.setEarthRotationY(meshRef.current.rotation.y);
      }
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value += delta;
      }
      return;
    }

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
       */

      if (phase === "launching" && !launchStarted.current) {
        launchStartRotation.current = meshRef.current.rotation.y;
        launchStarted.current = true;
      }

      if (phase !== "launching") {
        launchStarted.current = false;
      }

      const shouldSteer =
        phase === "launching" &&
        targetRotationY != null &&
        launchProgress > 0.4;

      if (shouldSteer) {
        const steerT = (launchProgress - 0.4) / 0.6;
        const easedSteer = steerT * steerT * steerT;

        const freeRotation =
          meshRef.current.rotation.y + delta * currentSpeed.current;

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
