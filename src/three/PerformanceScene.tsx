import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* rising noisy trend used as the "strategy growth" curve */
function buildPath() {
  const pts: THREE.Vector3[] = [];
  let y = 0.2;
  for (let i = 0; i < 200; i++) {
    const x = (i / 199) * 12 - 6;
    y += (Math.random() - 0.46) * 0.05;
    y = Math.max(y, 0.05);
    pts.push(new THREE.Vector3(x, y * 1.6 + 0.3, 0));
  }
  const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal");
  return curve;
}

function TravelingChart({ scroll }: { scroll: MutableRefObject<number> }) {
  const curve = useMemo(buildPath, []);
  const group = useRef<THREE.Group>(null);
  const comet = useRef<THREE.Mesh>(null);
  const headGlow = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    if (group.current) {
      group.current.rotation.x = 0.1 + state.pointer.y * 0.05 - s * 0.5;
      group.current.rotation.y = state.pointer.x * 0.1 + s * 0.3;
    }
    const p = (t * 0.12) % 1;
    const pos = curve.getPointAt(p);
    if (comet.current) comet.current.position.copy(pos);
    if (headGlow.current) {
      headGlow.current.position.copy(pos);
      headGlow.current.scale.setScalar(0.5 + Math.sin(t * 5) * 0.1);
    }
  });

  return (
    <>
      {/* grid floor */}
      <Grid
        position={[0, -1.5, -2]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#132a45"
        sectionSize={2.5}
        sectionThickness={1}
        sectionColor="#1c4f6e"
        fadeDistance={22}
        fadeStrength={1.5}
        infiniteGrid
      />
      {/* subtle reference ribbon */}
      <mesh position={[0, -0.4, -0.3]}>
        <planeGeometry args={[14, 0.01]} />
        <meshBasicMaterial color="#2cf0a6" transparent opacity={0.12} toneMapped={false} />
      </mesh>

      <group ref={group} position={[0, 0.4, -0.6]}>
        {/* glow tube path */}
        <mesh>
          <tubeGeometry args={[curve, 220, 0.02, 6, false]} />
          <meshBasicMaterial color="#34e6a0" transparent opacity={0.55} toneMapped={false} />
        </mesh>
        {/* inner bright core */}
        <mesh>
          <tubeGeometry args={[curve, 220, 0.006, 5, false]} />
          <meshBasicMaterial color="#eafffb" toneMapped={false} />
        </mesh>
        {/* head */}
        <mesh ref={headGlow}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#2cf0a6" transparent opacity={0.14} toneMapped={false} />
        </mesh>
        <mesh ref={comet}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>
      </group>

      <Sparkles count={120} scale={[16, 7, 6]} size={2} speed={0.25} color="#62c8ff" opacity={0.45} />
    </>
  );
}

export default function PerformanceScene({ scroll }: { scroll: MutableRefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 1.4, 7], fov: 45, near: 0.1, far: 80 }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 6, 5]} intensity={60} color="#8fd6ff" />
      <pointLight position={[-6, -2, 4]} intensity={40} color="#2cf0a6" />
      <TravelingChart scroll={scroll} />
    </Canvas>
  );
}
