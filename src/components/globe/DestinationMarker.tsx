import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, ShaderMaterial } from "three";
import { AdditiveBlending, Color, MathUtils, DoubleSide } from "three";
import { rouletteStore } from "../../stores/rouletteStore";
import { latLngToVector3 } from "../../lib/geo";
import { Earth } from "./Earth";

/**
 * Animated marker placed on the globe surface at the selected destination.
 *
 * Appears on impact with a burst pulse, then settles into a gentle
 * breathing glow. Tracks Earth's rotation so it stays pinned to
 * the correct geographic location.
 *
 * Architecture: reads earthRotationY from the store each frame and
 * applies it to its own wrapper group, keeping it decoupled from
 * the Earth component while visually rotating in sync.
 */

/* ── core dot shader ─────────────────────────────────── */

const dotVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const dotFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;

  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float facing = max(dot(vNormal, vViewDir), 0.0);
    float core = pow(facing, 1.5) * 0.8;
    float rim = pow(1.0 - facing, 2.0) * 0.6;
    float brightness = (core + rim) * uIntensity;

    gl_FragColor = vec4(uColor * brightness, brightness);
  }
`;

/* ── pulse ring shader ───────────────────────────────── */

const ringVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ringFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;

  varying vec2 vUv;

  void main() {
    float dist = length(vUv - 0.5) * 2.0;
    float ring = smoothstep(0.7, 0.85, dist) * smoothstep(1.0, 0.9, dist);
    float glow = exp(-dist * dist * 4.0) * 0.3;
    float alpha = (ring + glow) * uOpacity;

    gl_FragColor = vec4(uColor, alpha);
  }
`;

/* ── beam shader ─────────────────────────────────────── */

const beamVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const beamFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;

  varying vec2 vUv;

  void main() {
    float xFade = 1.0 - abs(vUv.x - 0.5) * 2.0;
    xFade = pow(xFade, 3.0);

    float yFade = 1.0 - vUv.y;
    yFade = pow(yFade, 1.5);

    float alpha = xFade * yFade * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

/* ── constants ───────────────────────────────────────── */

const MARKER_COLOR = new Color("#00dbe9");
const MARKER_HOT = new Color("#e0fcff");
const DOT_RADIUS = 0.045;
const RING_SIZE = 0.35;
const BEAM_WIDTH = 0.06;
const BEAM_HEIGHT = 0.5;

/** How long the impact burst lasts (seconds) */
const BURST_DURATION = 1.2;

export function DestinationMarker() {
  const groupRef = useRef<Group>(null);
  const dotMatRef = useRef<ShaderMaterial>(null);
  const ringMatRef = useRef<ShaderMaterial>(null);
  const beamMatRef = useRef<ShaderMaterial>(null);
  const ringScaleRef = useRef<Group>(null);

  const elapsedSinceImpact = useRef(0);
  const wasImpact = useRef(false);
  const visible = useRef(false);

  /* Dot uniforms */
  const dotUniforms = useMemo(
    () => ({
      uColor: { value: MARKER_HOT.clone() },
      uIntensity: { value: 0 },
    }),
    [],
  );

  /* Ring uniforms */
  const ringUniforms = useMemo(
    () => ({
      uColor: { value: MARKER_COLOR.clone() },
      uOpacity: { value: 0 },
    }),
    [],
  );

  /* Beam uniforms */
  const beamUniforms = useMemo(
    () => ({
      uColor: { value: MARKER_COLOR.clone() },
      uOpacity: { value: 0 },
    }),
    [],
  );

  useFrame((_state, delta) => {
    const { phase, selectedDestination, earthRotationY } =
      rouletteStore.getState();

    /* ── visibility gate ──────────────────────────── */
    const shouldShow =
      selectedDestination != null &&
      (phase === "impact" || phase === "result");

    if (!shouldShow) {
      visible.current = false;
      wasImpact.current = false;
      elapsedSinceImpact.current = 0;
      if (dotMatRef.current) dotMatRef.current.uniforms.uIntensity.value = 0;
      if (ringMatRef.current) ringMatRef.current.uniforms.uOpacity.value = 0;
      if (beamMatRef.current) beamMatRef.current.uniforms.uOpacity.value = 0;
      return;
    }

    /* ── position the marker ──────────────────────── */
    if (!visible.current && selectedDestination) {
      const pos = latLngToVector3(
        selectedDestination.lat,
        selectedDestination.lng,
        Earth.RADIUS,
      );

      if (groupRef.current) {
        /* Place the marker's inner group at the sphere surface point.
           The outer group handles Earth-sync rotation. */
        const inner = groupRef.current.children[0] as Group | undefined;
        if (inner) {
          inner.position.copy(pos);
          /* Orient so the marker "up" is along the surface normal */
          inner.lookAt(0, 0, 0);
          inner.rotateY(Math.PI);
        }
      }
      visible.current = true;
    }

    /* ── sync rotation with Earth ─────────────────── */
    if (groupRef.current) {
      groupRef.current.rotation.y = earthRotationY;
    }

    /* ── impact burst timing ──────────────────────── */
    if (phase === "impact" && !wasImpact.current) {
      wasImpact.current = true;
      elapsedSinceImpact.current = 0;
    }

    elapsedSinceImpact.current += delta;
    const t = Math.min(elapsedSinceImpact.current / BURST_DURATION, 1);

    /* ── dot intensity ────────────────────────────── */
    if (dotMatRef.current) {
      /* Burst bright then settle to gentle breathing */
      const burst = t < 1 ? 1.5 * (1 - t * t) : 0;
      const breathe = 0.7 + 0.3 * Math.sin(elapsedSinceImpact.current * 2.5);
      dotMatRef.current.uniforms.uIntensity.value = burst + breathe;

      /* Transition color from white-hot to cyan */
      const colorT = Math.min(t * 2, 1);
      dotMatRef.current.uniforms.uColor.value.lerpColors(
        MARKER_HOT,
        MARKER_COLOR,
        colorT,
      );
    }

    /* ── ring pulse ───────────────────────────────── */
    if (ringMatRef.current && ringScaleRef.current) {
      if (t < 1) {
        /* Expanding pulse */
        const eased = 1 - Math.pow(1 - t, 3);
        const scale = MathUtils.lerp(0.3, 2.5, eased);
        ringScaleRef.current.scale.setScalar(scale);
        ringMatRef.current.uniforms.uOpacity.value = (1 - t) * 0.8;
      } else {
        /* Gentle ambient ring */
        const breathe =
          0.15 + 0.1 * Math.sin(elapsedSinceImpact.current * 1.8);
        ringScaleRef.current.scale.setScalar(1.2);
        ringMatRef.current.uniforms.uOpacity.value = breathe;
      }
    }

    /* ── beam opacity ─────────────────────────────── */
    if (beamMatRef.current) {
      if (t < 1) {
        /* Bright on impact, fading */
        beamMatRef.current.uniforms.uOpacity.value = (1 - t * t) * 0.7;
      } else {
        const breathe =
          0.12 + 0.08 * Math.sin(elapsedSinceImpact.current * 2.0 + 0.5);
        beamMatRef.current.uniforms.uOpacity.value = breathe;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Inner group — positioned at lat/lng point, oriented outward */}
      <group>
        {/* Core dot */}
        <mesh>
          <sphereGeometry args={[DOT_RADIUS, 16, 16]} />
          <shaderMaterial
            ref={dotMatRef}
            vertexShader={dotVertexShader}
            fragmentShader={dotFragmentShader}
            uniforms={dotUniforms}
            transparent
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Pulse ring (billboard facing outward from surface) */}
        <group ref={ringScaleRef} scale={0.3}>
          <mesh rotation={[0, 0, 0]}>
            <planeGeometry args={[RING_SIZE, RING_SIZE]} />
            <shaderMaterial
              ref={ringMatRef}
              vertexShader={ringVertexShader}
              fragmentShader={ringFragmentShader}
              uniforms={ringUniforms}
              transparent
              blending={AdditiveBlending}
              side={DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </group>

        {/* Light beam extending outward from surface */}
        <mesh position={[0, 0, BEAM_HEIGHT / 2]}>
          <planeGeometry args={[BEAM_WIDTH, BEAM_HEIGHT]} />
          <shaderMaterial
            ref={beamMatRef}
            vertexShader={beamVertexShader}
            fragmentShader={beamFragmentShader}
            uniforms={beamUniforms}
            transparent
            blending={AdditiveBlending}
            side={DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* Cross beam (perpendicular) for depth */}
        <mesh
          position={[0, 0, BEAM_HEIGHT / 2]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <planeGeometry args={[BEAM_WIDTH, BEAM_HEIGHT]} />
          <shaderMaterial
            vertexShader={beamVertexShader}
            fragmentShader={beamFragmentShader}
            uniforms={beamUniforms}
            transparent
            blending={AdditiveBlending}
            side={DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}
