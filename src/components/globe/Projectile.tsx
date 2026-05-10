import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Group, ShaderMaterial } from "three";
import { AdditiveBlending, Color, Vector3, DoubleSide } from "three";
import { rouletteStore } from "../../stores/rouletteStore";
import { latLngToVector3 } from "../../lib/geo";
import { Earth } from "./Earth";

/* ── Configuration ──────────────────────────────────────── */

/**
 * The projectile becomes visible after this much launch progress.
 * Gives the CSS arrow-launch animation time to fly upward first.
 */
const APPEAR_AT = 0.08;

/**
 * The projectile arrives at the destination at this progress.
 * Slightly before 1.0 so impact effects can trigger cleanly.
 */
const ARRIVE_AT = 0.95;

/** How far below center the projectile starts (world units) */
const START_Y_OFFSET = -3.5;
const START_Z_OFFSET = 1.5;

/** Arc height above the straight-line path */
const ARC_HEIGHT = 3.0;

/* ── Shaders ────────────────────────────────────────────── */

const coreVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const coreFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;

  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float facing = max(dot(vNormal, vViewDir), 0.0);
    float core = pow(facing, 1.5) * 0.9;
    float rim = pow(1.0 - facing, 2.0) * 0.5;
    float brightness = (core + rim) * uIntensity;

    gl_FragColor = vec4(uColor * brightness, brightness);
  }
`;

const trailVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const trailFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;

  varying vec2 vUv;

  void main() {
    /* Taper from center outward (X) */
    float xFade = 1.0 - abs(vUv.x - 0.5) * 2.0;
    xFade = pow(xFade, 2.5);

    /* Fade along trail length (Y = 0 is head, Y = 1 is tail) */
    float yFade = pow(1.0 - vUv.y, 1.2);

    float alpha = xFade * yFade * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

/* ── Helpers ────────────────────────────────────────────── */

const _startPos = new Vector3();
const _endPos = new Vector3();
const _currentPos = new Vector3();
const _prevPos = new Vector3();
const _direction = new Vector3();
const PROJECTILE_COLOR = new Color("#00dbe9");
const PROJECTILE_HOT = new Color("#e0fcff");

/**
 * Quadratic Bézier with adjustable arc.
 * P0 = start, P2 = end, P1 = midpoint lifted by arcHeight.
 */
function bezierArc(
  out: Vector3,
  start: Vector3,
  end: Vector3,
  t: number,
  arcHeight: number,
): Vector3 {
  /* Control point: midpoint + Y offset for arc */
  const midX = (start.x + end.x) * 0.5;
  const midY = (start.y + end.y) * 0.5 + arcHeight;
  const midZ = (start.z + end.z) * 0.5;

  const u = 1 - t;
  out.x = u * u * start.x + 2 * u * t * midX + t * t * end.x;
  out.y = u * u * start.y + 2 * u * t * midY + t * t * end.y;
  out.z = u * u * start.z + 2 * u * t * midZ + t * t * end.z;

  return out;
}

/* ── Component ──────────────────────────────────────────── */

export function Projectile() {
  const groupRef = useRef<Group>(null);
  const coreMatRef = useRef<ShaderMaterial>(null);
  const trailMatRef = useRef<ShaderMaterial>(null);

  const { camera } = useThree();

  const coreUniforms = useMemo(
    () => ({
      uColor: { value: PROJECTILE_HOT.clone() },
      uIntensity: { value: 0 },
    }),
    [],
  );

  const trailUniforms = useMemo(
    () => ({
      uColor: { value: PROJECTILE_COLOR.clone() },
      uOpacity: { value: 0 },
    }),
    [],
  );

  useFrame(() => {
    const {
      phase,
      launchProgress,
      selectedDestination,
      targetRotationY,
      earthRotationY,
    } = rouletteStore.getState();

    if (!groupRef.current) return;

    /* Only visible during launching phase */
    const isLaunching = phase === "launching";
    const inRange =
      isLaunching && launchProgress >= APPEAR_AT && launchProgress < 1.0;

    if (!inRange || !selectedDestination) {
      groupRef.current.visible = false;
      if (coreMatRef.current) coreMatRef.current.uniforms.uIntensity.value = 0;
      if (trailMatRef.current) trailMatRef.current.uniforms.uOpacity.value = 0;
      return;
    }

    groupRef.current.visible = true;

    /* ── Compute start position (below camera center) ──── */
    _startPos.set(0, START_Y_OFFSET, camera.position.z + START_Z_OFFSET);

    /* ── Compute destination position on the globe ─────── */
    const surfaceLocal = latLngToVector3(
      selectedDestination.lat,
      selectedDestination.lng,
      Earth.RADIUS,
    );

    /*
     * The destination point on the globe rotates as the Earth spins.
     * During launch, the Earth steers toward targetRotationY.
     * We interpolate the endpoint using the CURRENT Earth rotation
     * so the projectile visually tracks toward where the point IS,
     * and naturally converges as the globe settles.
     *
     * For the final portion (launchProgress > 0.7), blend toward
     * the final rotation so the projectile arrives precisely.
     */
    const finalRotY = targetRotationY ?? earthRotationY;
    const blendT = Math.max(0, (launchProgress - 0.5) / 0.5);
    const easedBlend = blendT * blendT;
    const rotY =
      earthRotationY + (finalRotY - earthRotationY) * easedBlend;

    /* Apply Earth rotation to the surface point */
    const cosR = Math.cos(rotY);
    const sinR = Math.sin(rotY);
    _endPos.set(
      surfaceLocal.x * cosR + surfaceLocal.z * sinR,
      surfaceLocal.y,
      -surfaceLocal.x * sinR + surfaceLocal.z * cosR,
    );

    /* ── Normalize progress within visible range ──────── */
    const normalizedT = Math.min(
      (launchProgress - APPEAR_AT) / (ARRIVE_AT - APPEAR_AT),
      1,
    );

    /* Ease: start fast, decelerate toward destination */
    const easedT = 1 - Math.pow(1 - normalizedT, 2.5);

    /* ── Position along arc ───────────────────────────── */
    _prevPos.copy(_currentPos);
    bezierArc(_currentPos, _startPos, _endPos, easedT, ARC_HEIGHT);

    groupRef.current.position.copy(_currentPos);

    /* ── Orient toward travel direction ───────────────── */
    if (normalizedT > 0.01) {
      /* Compute forward direction from the bezier tangent */
      const tNext = Math.min(easedT + 0.02, 1);
      bezierArc(_direction, _startPos, _endPos, tNext, ARC_HEIGHT);
      _direction.sub(_currentPos).normalize();

      /* lookAt toward travel direction */
      groupRef.current.lookAt(
        _currentPos.x + _direction.x,
        _currentPos.y + _direction.y,
        _currentPos.z + _direction.z,
      );
    }

    /* ── Scale: shrink as it approaches ────────────────── */
    const scale = 0.8 + (1 - normalizedT) * 0.5;
    groupRef.current.scale.setScalar(scale);

    /* ── Material intensity ───────────────────────────── */
    /* Fade in at start, full brightness in middle, dim slightly at end */
    const fadeIn = Math.min(normalizedT / 0.15, 1);
    const fadeOut = normalizedT > 0.85 ? (1 - normalizedT) / 0.15 : 1;
    const intensity = fadeIn * fadeOut;

    if (coreMatRef.current) {
      coreMatRef.current.uniforms.uIntensity.value = intensity * 2.5;

      /* Color shift: start white-hot, transition to cyan */
      const colorT = Math.min(normalizedT * 1.5, 1);
      coreMatRef.current.uniforms.uColor.value.lerpColors(
        PROJECTILE_HOT,
        PROJECTILE_COLOR,
        colorT,
      );
    }

    if (trailMatRef.current) {
      trailMatRef.current.uniforms.uOpacity.value = intensity * 1.2;
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      {/* Core glow sphere */}
      <mesh>
        <sphereGeometry args={[0.06, 12, 12]} />
        <shaderMaterial
          ref={coreMatRef}
          vertexShader={coreVertexShader}
          fragmentShader={coreFragmentShader}
          uniforms={coreUniforms}
          transparent
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Trail — stretched plane behind the projectile */}
      <mesh position={[0, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.06, 0.8]} />
        <shaderMaterial
          ref={trailMatRef}
          vertexShader={trailVertexShader}
          fragmentShader={trailFragmentShader}
          uniforms={trailUniforms}
          transparent
          blending={AdditiveBlending}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Cross trail for depth */}
      <mesh
        position={[0, 0, -0.4]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      >
        <planeGeometry args={[0.06, 0.8]} />
        <shaderMaterial
          vertexShader={trailVertexShader}
          fragmentShader={trailFragmentShader}
          uniforms={trailUniforms}
          transparent
          blending={AdditiveBlending}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
