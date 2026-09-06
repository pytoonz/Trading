import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

function Object3D() {
  const g = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    if (g.current) {
      g.current.rotation.y += dt * 0.12;
      g.current.rotation.x += Math.sin(state.clock.elapsedTime * 0.2) * 0.001;
      g.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
    if (inner.current) {
      inner.current.rotation.z += dt * 0.4;
      inner.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.4;
    }
  });
  return (
    <>
      <group ref={g} position={[0, 0, -2]} scale={1.15}>
        <mesh>
          <torusGeometry args={[1.7, 0.02, 12, 120]} />
          <meshBasicMaterial color="#2cf0a6" transparent opacity={0.8} toneMapped={false} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.015, 12, 120]} />
          <meshBasicMaterial color="#3e9cff" transparent opacity={0.5} toneMapped={false} />
        </mesh>
        <mesh rotation={[0, 0.6, 1.1]}>
          <torusGeometry args={[2.6, 0.012, 12, 120]} />
          <meshBasicMaterial color="#62c8ff" transparent opacity={0.3} toneMapped={false} />
        </mesh>
        <group ref={inner}>
          <mesh scale={1.1}>
            <icosahedronGeometry args={[0.9, 1]} />
            <meshStandardMaterial color="#0a1730" emissive="#0e2a55" emissiveIntensity={1.4} metalness={0.7} roughness={0.2} wireframe />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.5, 24, 24]} />
            <meshStandardMaterial color="#34e6a0" emissive="#2cf0a6" emissiveIntensity={2.6} toneMapped={false} />
          </mesh>
        </group>
      </group>
      <Sparkles count={90} scale={[14, 9, 9]} size={2} speed={0.2} color="#8fd6ff" opacity={0.5} />
    </>
  );
}

export default function CtaScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 60 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 5, 4]} intensity={60} color="#8fd6ff" />
      <pointLight position={[-6, -3, 3]} intensity={50} color="#2cf0a6" />
      <Object3D />
    </Canvas>
  );
}
