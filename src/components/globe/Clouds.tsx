import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import type { Mesh } from "three";
import { TextureLoader } from "three";
import { Earth } from "./Earth";
import { rouletteStore } from "../../stores/rouletteStore";

/** Clouds sit just above the Earth surface */
const CLOUD_ALTITUDE = 1.015;

/** Clouds rotate slightly faster than Earth for parallax depth */
const CLOUD_SPEED_OFFSET = 0.012;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uCloudMap;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float cloudAlpha = texture2D(uCloudMap, vUv).r;

    /* Threshold to sharpen cloud edges slightly */
    cloudAlpha = smoothstep(0.15, 0.7, cloudAlpha);

    /* Fixed light direction — matches Earth shader */
    vec3 lightDir = normalize(vec3(0.6, 0.35, 0.7));

    /* Diffuse lighting on clouds */
    float NdotL = dot(vNormal, lightDir);
    float diffuse = max(NdotL, 0.0);
    float ambient = 0.3;

    /* Slightly silver/white — clouds are high albedo */
    vec3 cloudColor = vec3(1.0, 1.0, 1.0) * (ambient + diffuse * 0.7);

    /* Subtle rim glow for atmospheric depth */
    float rim = 1.0 - max(dot(vNormal, vViewDir), 0.0);
    cloudColor += vec3(0.4, 0.65, 1.0) * pow(rim, 4.0) * 0.2;

    /* Fade at the limb to prevent edge ring */
    float limb = max(dot(vNormal, vViewDir), 0.0);
    float limbFade = smoothstep(0.0, 0.25, limb);
    cloudAlpha *= limbFade;

    gl_FragColor = vec4(cloudColor, cloudAlpha * 0.65);
  }
`;

export function Clouds() {
  const meshRef = useRef<Mesh>(null);
  const cloudMap = useLoader(TextureLoader, "/textures/earth_clouds.jpg");

  const uniforms = useMemo(
    () => ({
      uCloudMap: { value: cloudMap },
    }),
    [cloudMap],
  );

  useFrame(() => {
    if (!meshRef.current) return;

    /* Follow Earth rotation + slight offset for parallax */
    const earthY = rouletteStore.getState().earthRotationY;
    meshRef.current.rotation.y = earthY + CLOUD_SPEED_OFFSET;
  });

  return (
    <mesh ref={meshRef} scale={CLOUD_ALTITUDE}>
      <sphereGeometry args={[Earth.RADIUS, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
