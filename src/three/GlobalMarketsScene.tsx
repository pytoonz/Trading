import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import earthUrl from "../assets/earth-nights.png";

const R = 1.9;

const CITIES: { name: string; lat: number; lon: number }[] = [
  { name: "New York", lat: 40.71, lon: -74.0 },
  { name: "London", lat: 51.5, lon: -0.12 },
  { name: "Dubai", lat: 25.2, lon: 55.27 },
  { name: "Singapore", lat: 1.35, lon: 103.82 },
  { name: "Tokyo", lat: 35.68, lon: 139.69 },
  { name: "Hong Kong", lat: 22.3, lon: 114.17 },
];

const LINKS: [number, number][] = [
  [0, 1], // NY-London
  [1, 2], // London-Dubai
  [2, 3], // Dubai-Singapore
  [3, 5], // Singapore-HK
  [5, 4], // HK-Tokyo
  [4, 0], // Tokyo-NY (cross pacific)
  [0, 3], // NY-Singapore
];

function latLon(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function slerpVec(v1: THREE.Vector3, v2: THREE.Vector3, t: number) {
  const dot = THREE.MathUtils.clamp(v1.dot(v2), -1, 1);
  const theta = Math.acos(dot);
  if (theta < 1e-6) return v1.clone();
  const sinT = Math.sin(theta);
  const a = Math.sin((1 - t) * theta) / sinT;
  const b = Math.sin(t * theta) / sinT;
  return v1.clone().multiplyScalar(a).add(v2.clone().multiplyScalar(b));
}

function buildArcCurve(a: THREE.Vector3, b: THREE.Vector3, height = R * 0.5, seg = 46) {
  const ua = a.clone().normalize();
  const ub = b.clone().normalize();
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= seg; i++) {
    const t = i / seg;
    const v = slerpVec(ua, ub, t);
    const rad = R + height * Math.sin(Math.PI * t);
    pts.push(v.multiplyScalar(rad));
  }
  return new THREE.CatmullRomCurve3(pts, false, "centripetal");
}

function Arc({ a, b, color, speed }: { a: THREE.Vector3; b: THREE.Vector3; color: string; speed: number }) {
  const curve = useMemo(() => buildArcCurve(a, b), [a, b]);
  const comet = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = (t * speed) % 1;
    const pos = curve.getPointAt(p);
    if (comet.current) comet.current.position.copy(pos);
    if (glow.current) {
      glow.current.position.copy(pos);
      const s = 0.25 + Math.sin(t * 6 + p * 20) * 0.06;
      glow.current.scale.setScalar(s);
    }
  });
  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 90, 0.006, 6, false]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} toneMapped={false} />
      </mesh>
      <mesh ref={glow}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} toneMapped={false} />
      </mesh>
      <mesh ref={comet}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshBasicMaterial color="#eafffb" toneMapped={false} />
      </mesh>
    </group>
  );
}

function Node({ pos, color }: { pos: THREE.Vector3; color: string }) {
  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[0.045, 14, 14]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <Float speed={3} floatIntensity={1} rotationIntensity={0}>
        <mesh scale={0.6}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color={color} transparent opacity={0.12} toneMapped={false} />
        </mesh>
      </Float>
    </group>
  );
}

function Globe() {
  const texture = useLoader(THREE.TextureLoader, earthUrl);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  const group = useRef<THREE.Group>(null);

  const points = useMemo(
    () => CITIES.map((c) => latLon(c.lat, c.lon, R).clone()),
    []
  );
  const arcs = useMemo(
    () =>
      LINKS.map(([ia, ib], i) => ({
        a: points[ia].clone(),
        b: points[ib].clone(),
        color: i % 2 === 0 ? "#3e9cff" : "#2cf0a6",
        speed: 0.05 + Math.random() * 0.05,
      })),
    [points]
  );

  useFrame((_state, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.11;
  });

  return (
    <group ref={group}>
      {/* earth sphere */}
      <mesh>
        <sphereGeometry args={[R, 96, 96]} />
        <meshStandardMaterial
          map={texture}
          color="#cfe6ff"
          roughness={0.9}
          metalness={0.05}
          emissive="#0a1c2f"
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* atmosphere rim */}
      <mesh scale={1.03}>
        <sphereGeometry args={[R, 48, 48]} />
        <meshBasicMaterial color="#2a6fdc" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
      {/* nodes */}
      {points.map((p, i) => (
        <Node key={i} pos={p} color={i % 2 === 0 ? "#62c8ff" : "#2cf0a6"} />
      ))}
      {/* links + streams */}
      {arcs.map((ar, i) => (
        <Arc key={i} a={ar.a} b={ar.b} color={ar.color} speed={ar.speed} />
      ))}
    </group>
  );
}

function Environment() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 4]} intensity={1.3} color="#cfe4ff" />
      <pointLight position={[-4, -2, 3]} intensity={40} color="#3e9cff" />
      <pointLight position={[4, 3, -2]} intensity={30} color="#2cf0a6" />
      <Globe />
      <Float speed={1.6} rotationIntensity={0} floatIntensity={0.5}>
        <mesh position={[-4.4, 0.4, 2.4]} rotation={[0.6, 0.4, 0]}>
          <torusGeometry args={[0.7, 0.012, 10, 80]} />
          <meshBasicMaterial color="#3e9cff" transparent opacity={0.7} toneMapped={false} />
        </mesh>
      </Float>
    </>
  );
}

export default function GlobalMarketsScene() {
  return (
    <Canvas
      dpr={[1, 1.7]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.4, 6.2], fov: 45, near: 0.1, far: 60 }}
    >
      <Suspense fallback={null}>
        <Environment />
      </Suspense>
    </Canvas>
  );
}
