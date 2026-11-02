'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function OrbitScene({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const document = useRef<THREE.Mesh>(null);

  const elapsed = useRef(0);

  useFrame((_state, delta) => {
    if (reducedMotion) return;
    elapsed.current += delta;
    const t = elapsed.current;
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x = Math.sin(t * 0.35) * 0.05;
    }
    if (document.current)
      document.current.position.y = Math.sin(t * 0.7) * 0.08;
  });

  const nodes = [
    [-2.45, 1.05, -0.25],
    [2.2, 1.25, -0.55],
    [-2.2, -1.15, 0.1],
    [2.35, -0.85, -0.2],
    [0.2, 2.05, -0.8],
  ] as const;

  return (
    <group ref={group} rotation={[0.08, -0.35, 0.03]}>
      <mesh ref={document} rotation={[-0.05, 0.22, -0.06]}>
        <boxGeometry args={[2.35, 3.15, 0.12]} />
        <meshStandardMaterial
          color="#f8f9ff"
          roughness={0.58}
          metalness={0.08}
        />
        <mesh position={[-0.52, 0.82, 0.07]}>
          <boxGeometry args={[0.72, 0.12, 0.025]} />
          <meshBasicMaterial color="#0037b0" />
        </mesh>
        {[0.4, 0.05, -0.3, -0.65].map((y, index) => (
          <mesh key={y} position={[index === 3 ? -0.34 : 0, y, 0.071]}>
            <boxGeometry args={[index === 3 ? 1.3 : 1.65, 0.055, 0.02]} />
            <meshBasicMaterial color={index === 1 ? '#712ae2' : '#9aa9c2'} />
          </mesh>
        ))}
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.75, 0.018, 8, 96]} />
        <meshBasicMaterial color="#0037b0" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2.45, 0.1, 0.65]}>
        <torusGeometry args={[3.15, 0.012, 8, 96]} />
        <meshBasicMaterial color="#712ae2" transparent opacity={0.42} />
      </mesh>

      {nodes.map((position, index) => (
        <group key={index} position={position}>
          <mesh>
            <sphereGeometry args={[index === 1 ? 0.18 : 0.12, 18, 18]} />
            <meshStandardMaterial
              color={index % 2 ? '#712ae2' : '#0037b0'}
              emissive={index % 2 ? '#712ae2' : '#0037b0'}
              emissiveIntensity={0.35}
            />
          </mesh>
          <mesh position={[0, -0.28, 0]}>
            <boxGeometry args={[index === 1 ? 0.86 : 0.62, 0.12, 0.04]} />
            <meshBasicMaterial color="#0b1c30" transparent opacity={0.72} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function ApplicationOrbit() {
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return (
    <div className="orbit-stage" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 38 }}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight
          position={[4, 6, 5]}
          intensity={3.2}
          color="#dce9ff"
        />
        <pointLight
          position={[-4, -2, 3]}
          intensity={18}
          color="#712ae2"
          distance={9}
        />
        <OrbitScene reducedMotion={reducedMotion} />
      </Canvas>
      <div className="orbit-caption">CV · role · evidence · fit</div>
    </div>
  );
}
