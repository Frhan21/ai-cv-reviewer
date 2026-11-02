'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { MotionValue } from 'framer-motion';
import { Component, ReactNode, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Printed, Rounded } from './application-story';

function ReviewObjects({
  progress,
  reduced,
  palette,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
  palette: string[];
}) {
  const cv = useRef<THREE.Group>(null);
  const vacancy = useRef<THREE.Group>(null);
  const lens = useRef<THREE.Group>(null);
  const notes = useRef<THREE.Group>(null);
  const current = useRef(0);
  const [ink, blue, violet, paper, pale] = palette;
  useFrame((_, delta) => {
    const target = reduced ? 1 : progress.get();
    current.current = THREE.MathUtils.damp(
      current.current,
      target,
      7,
      Math.min(delta, 0.05),
    );
    const p = current.current;
    const match = THREE.MathUtils.smoothstep(p, 0.14, 0.37);
    const scan = THREE.MathUtils.smoothstep(p, 0.39, 0.7);
    const result = THREE.MathUtils.smoothstep(p, 0.69, 0.94);
    if (cv.current) {
      cv.current.position.set(
        -0.35 - match * 0.9 + result * 0.25,
        0.35 + Math.sin(p * Math.PI) * 0.16,
        0.6,
      );
      cv.current.rotation.set(0.03, -0.16 + p * 0.22, -0.09 + p * 0.15);
    }
    if (vacancy.current) {
      vacancy.current.position.set(2.4 - match * 0.7, -0.3 + match * 0.8, -0.2);
      vacancy.current.scale.setScalar(0.65 + match * 0.35);
      vacancy.current.rotation.z = 0.12 - match * 0.04;
    }
    if (lens.current) {
      lens.current.position.set(-3.1 + scan * 5.1, 1.1 - scan * 1.6, 2);
      lens.current.scale.setScalar(Math.max(0.001, (1 - result) * scan));
      lens.current.visible = scan > 0.01 && result < 0.99;
      lens.current.rotation.z = -0.3 + scan * 0.25;
    }
    if (notes.current) {
      notes.current.position.set(1.05, -2.9 + result * 2.7, 2.2);
      notes.current.scale.setScalar(0.65 + result * 0.35);
      notes.current.visible = result > 0.01;
      notes.current.rotation.z = 0.08 - result * 0.13;
    }
  });
  return (
    <group rotation={[-0.07, -0.12, 0]}>
      <group ref={cv} position={[-0.35, 0.35, 0.6]}>
        <Rounded size={[2.85, 3.8, 0.16]} color={paper} radius={0.1} />
        <Printed
          width={2.85}
          height={3.8}
          color={ink}
          lines={[
            'Maya Putri',
            'Product designer',
            '',
            'Experience',
            'Checkout redesign',
            'Design systems',
            '',
            'Selected work',
            'Research / prototypes',
          ]}
        />
      </group>
      <group ref={vacancy} position={[2.4, -0.3, -0.2]}>
        <Rounded size={[2.8, 3.35, 0.28]} color={pale} radius={0.12} />
        <Rounded
          size={[1.05, 0.27, 0.15]}
          color={blue}
          position={[0, 1.72, 0.08]}
          radius={0.07}
        />
        <Printed
          width={2.8}
          height={3.35}
          color={ink}
          lines={[
            'The target role',
            'Product designer',
            '',
            'Research',
            'Systems',
            'Prototyping',
            'Outcomes',
          ]}
        />
      </group>
      <group ref={lens} position={[-3.1, 1.1, 2]}>
        <mesh castShadow>
          <torusGeometry args={[0.77, 0.13, 20, 64]} />
          <meshStandardMaterial
            color={violet}
            roughness={0.28}
            metalness={0.14}
          />
        </mesh>
        <Rounded
          size={[0.27, 1.15, 0.26]}
          color={violet}
          position={[0.64, -0.85, 0]}
          rotation={[0, 0, 0.62]}
          radius={0.1}
        />
        <mesh position={[0, 0, -0.02]}>
          <circleGeometry args={[0.65, 64]} />
          <meshPhysicalMaterial
            color={pale}
            transparent
            opacity={0.2}
            roughness={0.1}
            depthWrite={false}
          />
        </mesh>
      </group>
      <group ref={notes} position={[1.05, -2.9, 2.2]}>
        <Rounded size={[3.15, 2.5, 0.2]} color={blue} radius={0.12} />
        <Printed
          width={3.15}
          height={2.5}
          color={paper}
          lines={[
            'Revise before sending',
            '74 / 100',
            '',
            'Add project outcomes',
            'Show system ownership',
            'Check missing skills',
          ]}
        />
      </group>
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.8, 0]}
      >
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.1} />
      </mesh>
    </group>
  );
}

class ReviewBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="review-scene-fallback">
        Your CV, the target role, and the next edits.
        <br />
        Follow the review alongside this illustration.
      </div>
    ) : (
      this.props.children
    );
  }
}

export function ReviewScene({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const [palette, setPalette] = useState<string[] | null>(null);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const css = getComputedStyle(document.documentElement);
      setPalette(
        ['--navy', '--blue', '--violet', '--paper', '--pale'].map((name) =>
          css.getPropertyValue(name).trim(),
        ),
      );
    });
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (root.current) observer.observe(root.current);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);
  return (
    <div className="review-scene" ref={root} aria-hidden="true">
      {palette && (
        <ReviewBoundary>
          <Canvas
            shadows
            camera={{ position: [2, 2.2, 12], fov: 35 }}
            dpr={[1, 1.5]}
            frameloop={visible ? 'always' : 'demand'}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={2.4} />
            <directionalLight
              position={[-3, 8, 7]}
              intensity={3.5}
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-camera-left={-8}
              shadow-camera-right={8}
              shadow-camera-top={8}
              shadow-camera-bottom={-8}
              shadow-bias={-0.001}
            />
            <ReviewObjects
              progress={progress}
              reduced={reduced}
              palette={palette}
            />
          </Canvas>
        </ReviewBoundary>
      )}
    </div>
  );
}
