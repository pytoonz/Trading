import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const UP = "#34e6a0";
const DOWN = "#ff5f6d";

interface CandleData {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  bodyW: number;
  bodyH: number;
  bodyD: number;
  color: string;
  phase: number;
  speed: number;
  bob: number;
}

const between = (a: number, b: number) => a + Math.random() * (b - a);

const CLUSTERS: { origin: [number, number, number]; count: number; spread: number }[] = [
  { origin: [-3.5, 0.3, -1.5], count: 9, spread: 1.1 },
  { origin: [2.7, -1.5, -0.5], count: 7, spread: 0.9 },
  { origin: [3.5, 2.3, -2.6], count: 5, spread: 0.7 },
];

function makeCluster(count: number, spread: number): CandleData[] {
  const out: CandleData[] = [];
  for (let i = 0; i < count; i++) {
    const isUp = Math.random() > 0.34;
    out.push({
      x: between(-spread, spread),
      y: between(-0.4, 0.4),
      z: between(-0.5, 0.5),
      rx: between(-0.06, 0.06),
      ry: between(-0.2, 0.2),
      bodyW: between(0.07, 0.13),
      bodyH: between(0.32, 0.95),
      bodyD: between(0.07, 0.12),
      color: isUp ? UP : DOWN,
      phase: Math.random() * Math.PI * 2,
      speed: between(0.4, 0.9),
      bob: between(0.03, 0.09),
    });
  }
  return out;
}

function Candle({ d }: { d: CandleData }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.position.y = d.y + Math.sin(t * d.speed + d.phase) * d.bob;
    g.rotation.y = d.ry + Math.sin(t * 0.3 + d.phase) * 0.08;
  });
  return (
    <group ref={group} position={[d.x, d.y, d.z]} rotation={[d.rx, d.ry, 0]}>
      <mesh>
        <boxGeometry args={[d.bodyW, d.bodyH, d.bodyD]} />
        <meshPhysicalMaterial
          color={d.color}
          roughness={0.28}
          metalness={0.5}
          clearcoat={0.7}
          transparent
          opacity={0.96}
          emissive={d.color}
          emissiveIntensity={0.65}
        />
      </mesh>
      <mesh position={[0, d.bodyH / 2 + 0.09, 0]}>
        <boxGeometry args={[0.02, 0.18, 0.02]} />
        <meshPhysicalMaterial
          color="#cdd9e6"
          roughness={0.3}
          metalness={0.5}
          emissive="#9fb4cc"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function CandleCluster({ origin, count, spread }: { origin: [number, number, number]; count: number; spread: number }) {
  const data = useMemo(() => makeCluster(count, spread), [count, spread]);
  return (
    <group position={origin}>
      {data.map((d, i) => (
        <Candle key={i} d={d} />
      ))}
    </group>
  );
}

function NetworkGlobe({
  radius = 1.7,
  position = [0, 0, 0] as [number, number, number],
  color = "#3e9cff",
}) {
  const g = useRef<THREE.Group>(null);
  useFrame((_state, dt) => {
    if (g.current) g.current.rotation.y += dt * 0.06;
  });
  return (
    <group ref={g} position={position} scale={radius}>
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.13} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1, 4]} />
        <meshBasicMaterial color="#2cf0a6" wireframe transparent opacity={0.05} />
      </mesh>
      <mesh scale={0.92}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color="#071422" transparent opacity={0.7} />
      </mesh>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh scale={0.32} position={[0.9, 0.5, 0.5]}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial color="#9fffcb" emissive="#2cf0a6" emissiveIntensity={2.4} toneMapped={false} />
        </mesh>
      </Float>
    </group>
  );
}

function OrbitRing({ radius, color, tilt }: { radius: number; color: string; tilt: number }) {
  const dots = 26;
  const sphereRefs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    for (let i = 0; i < dots; i++) {
      const dir = i % 2 === 0 ? 0.6 : -0.5;
      const a = (i / dots) * Math.PI * 2 + t * dir;
      const m = sphereRefs.current[i];
      if (m) {
        m.position.x = Math.cos(a) * radius;
        m.position.z = Math.sin(a) * radius;
      }
    }
    void dt;
  });
  return (
    <group rotation={[tilt, 0, 0]} position={[3.6, 1.3, -3]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 140]} />
        <meshBasicMaterial color={color} transparent opacity={0.16} side={THREE.DoubleSide} />
      </mesh>
      {Array.from({ length: dots }).map((_, i) => (
        <mesh key={i} ref={(el) => (sphereRefs.current[i] = el)}>
          <sphereGeometry args={[0.032, 8, 8]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function DataStream() {
  const group = useRef<THREE.Group>(null);
  const geo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 90; i++) {
      pts.push(new THREE.Vector3((i / 90) * 22 - 11, Math.sin(i * 0.35) * 0.5 - 3.4, -7));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 120, 0.02, 6, false);
  }, []);
  useFrame((state, dt) => {
    if (group.current) {
      group.current.position.x = ((state.clock.elapsedTime * 3) % 6) - 3;
    }
    void dt;
  });
  return (
    <group ref={group}>
      <mesh geometry={geo}>
        <meshBasicMaterial color="#22c98d" transparent opacity={0.5} toneMapped={false} />
      </mesh>
    </group>
  );
}

function MarketEnvironment({ scroll }: { scroll: MutableRefObject<number> }) {
  const root = useRef<THREE.Group>(null);
  const cam = useRef<THREE.Group>(null);

  useFrame((state) => {
    const s = scroll.current;
    const t = state.clock.elapsedTime;
    if (root.current) {
      root.current.rotation.x = state.pointer.y * 0.06 + s * 0.4;
      root.current.rotation.y = state.pointer.x * 0.1 + s * 0.25;
      root.current.position.y = Math.sin(t * 0.2) * 0.1 - s * 0.4;
    }
    if (cam.current) {
      cam.current.rotation.x = -s * 0.5;
      cam.current.position.z = -s * 2.4;
      cam.current.position.y = s * 1.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 8, 5]} intensity={1.35} color="#eaf1f9" />
      <pointLight position={[-6, -2, 3]} intensity={90} distance={34} color="#3e9cff" />
      <pointLight position={[6, 3, -2]} intensity={80} distance={30} color="#2cf0a6" />
      <pointLight position={[0, -5, 4]} intensity={40} distance={26} color="#1c3550" />

      <group ref={cam}>
        <group ref={root}>
          <NetworkGlobe radius={1.9} position={[3.7, 1.4, -3]} color="#3e9cff" />
          <NetworkGlobe radius={0.8} position={[-4.6, 2.4, -4.2]} color="#2cf0a6" />

          {CLUSTERS.map((c, i) => (
            <CandleCluster key={i} origin={c.origin} count={c.count} spread={c.spread} />
          ))}

          <OrbitRing radius={2.7} color="#3e9cff" tilt={0.5} />
          <OrbitRing radius={3.3} color="#2cf0a6" tilt={-0.4} />

          <DataStream />

          <Sparkles count={170} scale={[22, 13, 10]} size={2.4} speed={0.3} color="#8fd6ff" opacity={0.5} />
          <Sparkles count={120} scale={[18, 11, 8]} size={1.7} speed={0.2} color="#3ce8b0" opacity={0.45} />
        </group>
      </group>
    </>
  );
}

export default function HeroScene({ scroll }: { scroll: MutableRefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 1.7]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 9], fov: 42, near: 0.1, far: 90 }}
    >
      <MarketEnvironment scroll={scroll} />
    </Canvas>
  );
}
