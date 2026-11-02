'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Pause, Play } from 'lucide-react';
import Link from 'next/link';
import {
  Component,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import * as THREE from 'three';

const chapters = [
  {
    label: 'Create',
    title: 'You put your experience on paper.',
    body: 'The projects, the skills, the late nights. A CV you are ready to send.',
  },
  {
    label: 'Send',
    title: 'You send it. And hope.',
    body: 'Your application leaves your hands and lands in another inbox.',
  },
  {
    label: 'Wait',
    title: 'Then comes the waiting.',
    body: 'You check your inbox. Still waiting for someone to see what you can do.',
  },
  {
    label: 'Reply',
    title: '“We won’t be moving forward.”',
    body: 'An illustrative reply. A rejection rarely tells you which part of your CV needs work.',
  },
  {
    label: 'Improve',
    title: 'Make your next application clearer.',
    body: 'Review your CV with HireLens. Find missing evidence and revise before sending again.',
  },
];

export function Rounded({
  size,
  color,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  radius = 0.12,
}: {
  size: [number, number, number];
  color: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  radius?: number;
}) {
  const geometry = useMemo(() => {
    const [w, h, d] = size;
    const r = Math.min(radius, w / 3, h / 3, d / 3);
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: d - r,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: r / 2,
      bevelThickness: r / 2,
      curveSegments: 12,
    });
    geo.translate(0, 0, -d / 2);
    return geo;
  }, [size, radius]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh
      geometry={geometry}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color={color} roughness={0.38} metalness={0.08} />
    </mesh>
  );
}

export function Printed({
  lines,
  color,
  width = 2.7,
  height = 3.6,
}: {
  lines: string[];
  color: string;
  width?: number;
  height?: number;
}) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 768;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = color;
    lines.forEach((line, i) => {
      ctx.font = `${i === 0 ? '600 62' : '400 36'}px Arial`;
      ctx.fillText(line, 68, 125 + i * 91);
    });
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    return map;
  }, [lines, color]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <mesh position={[0, 0, 0.2]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
}

function Scene({
  stage,
  still,
  palette,
}: {
  stage: number;
  still: boolean;
  palette: string[];
}) {
  const paper = useRef<THREE.Group>(null);
  const laptop = useRef<THREE.Group>(null);
  const envelope = useRef<THREE.Group>(null);
  const clock = useRef<THREE.Group>(null);
  const hand = useRef<THREE.Group>(null);
  const time = useRef(0);
  useFrame((_, delta) => {
    if (!still) time.current += Math.min(delta, 0.05);
    const t = time.current;
    const smooth = still ? 1 : 1 - Math.exp(-delta * 5);
    if (paper.current) {
      const target = new THREE.Vector3(
        stage === 1 ? 0.1 : stage === 2 ? -1.35 : 0.65,
        stage === 1 ? -0.3 : stage === 2 ? 0.2 : 0.8,
        stage === 1 ? 0.4 : 1.3,
      );
      paper.current.position.lerp(target, smooth);
      paper.current.rotation.z = THREE.MathUtils.lerp(
        paper.current.rotation.z,
        (stage === 1 ? -0.24 : -0.09) +
          (still ? 0 : Math.sin(t * 0.65) * 0.025),
        smooth,
      );
      paper.current.rotation.y = THREE.MathUtils.lerp(
        paper.current.rotation.y,
        stage === 1 ? -0.3 : -0.16,
        smooth,
      );
      paper.current.scale.lerp(
        new THREE.Vector3().setScalar(
          stage === 1 ? 0.6 : stage === 2 ? 0.67 : 1,
        ),
        smooth,
      );
    }
    if (laptop.current) {
      laptop.current.position.y = THREE.MathUtils.lerp(
        laptop.current.position.y,
        stage === 0 ? -1.15 : -2.3,
        smooth,
      );
      laptop.current.scale.lerp(
        new THREE.Vector3().setScalar(stage === 0 ? 1 : 0.72),
        smooth,
      );
    }
    if (envelope.current) {
      envelope.current.position.x = THREE.MathUtils.lerp(
        envelope.current.position.x,
        stage === 1 ? 0.55 : 2.05,
        smooth,
      );
      envelope.current.rotation.z =
        -0.12 + (still ? 0 : Math.sin(t * 0.6) * 0.035);
    }
    if (clock.current)
      clock.current.scale.lerp(
        new THREE.Vector3().setScalar(stage === 2 ? 1 : 0.65),
        smooth,
      );
    if (hand.current)
      hand.current.rotation.z = still ? -0.2 : -0.2 + Math.sin(t * 2.5) * 0.045;
  });
  const [ink, blue, violet, paperColor, pale, skin] = palette;
  return (
    <group rotation={[-0.06, -0.16, -0.02]}>
      <group
        ref={laptop}
        position={[-1.2, -1.15, -0.4]}
        rotation={[0.1, 0.1, -0.05]}
      >
        <Rounded size={[4.8, 0.2, 2.8]} color={blue} />
        <Rounded
          size={[4.8, 2.9, 0.22]}
          color={blue}
          position={[0, 1.8, -1.1]}
          rotation={[-0.16, 0, 0]}
        />
        <Rounded
          size={[4.35, 2.45, 0.06]}
          color={pale}
          position={[0, 1.83, -0.9]}
          rotation={[-0.16, 0, 0]}
        />
        {Array.from({ length: 4 }, (_, row) =>
          Array.from({ length: 10 }, (_, col) => (
            <Rounded
              key={`${row}-${col}`}
              size={[0.32, 0.07, 0.24]}
              radius={0.025}
              color={paperColor}
              position={[-1.85 + col * 0.41, 0.17, -0.55 + row * 0.36]}
            />
          )),
        )}
        <Rounded
          size={[1.3, 0.05, 0.45]}
          color={pale}
          position={[0, 0.17, 1]}
        />
      </group>
      <group
        ref={paper}
        position={[0.65, 0.8, 1.3]}
        rotation={[0.04, -0.16, -0.09]}
      >
        <Rounded size={[2.7, 3.6, 0.13]} color={paperColor} radius={0.08} />
        <Printed
          color={ink}
          lines={
            stage === 3
              ? [
                  'Your application',
                  '',
                  'Thank you for applying.',
                  'We won’t be moving',
                  'forward at this time.',
                  '',
                  'Recruitment team',
                ]
              : stage === 4
                ? [
                    'Your next draft',
                    'Experience',
                    'Show the outcome.',
                    '',
                    'Skills',
                    'Match the role.',
                    '',
                    'Reviewed with HireLens',
                  ]
                : [
                    'My curriculum vitae',
                    'Experience',
                    'Full-stack developer',
                    '',
                    'Projects',
                    'Payroll application',
                    '',
                    'Skills',
                    'React / TypeScript',
                  ]
          }
        />
        {stage === 4 && (
          <Rounded
            size={[2.3, 0.06, 0.05]}
            color={violet}
            position={[0, 0.53, 0.13]}
          />
        )}
      </group>
      <group
        ref={envelope}
        position={[2.05, -1.1, 1.4]}
        rotation={[0.04, -0.12, -0.12]}
      >
        <Rounded size={[3.1, 2, 0.28]} color={stage === 3 ? violet : blue} />
        <mesh position={[0, 0.24, 0.19]} castShadow>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([-1.5, 0.72, 0, 0, -0.5, 0.12, 1.5, 0.72, 0]),
                3,
              ]}
            />
          </bufferGeometry>
          <meshStandardMaterial
            color={stage === 3 ? violet : blue}
            roughness={0.45}
            side={THREE.DoubleSide}
          />
        </mesh>
        <Rounded
          size={[0.45, 0.4, 0.06]}
          color={pale}
          position={[1.04, 0.57, 0.22]}
        />
      </group>
      <group ref={clock} position={[2.7, 1.6, -0.2]} rotation={[0, -0.15, 0.1]}>
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.95, 0.95, 0.32, 64]} />
          <meshStandardMaterial color={violet} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.18]}>
          <circleGeometry args={[0.81, 64]} />
          <meshStandardMaterial color={paperColor} />
        </mesh>
        <Rounded
          size={[0.07, 0.55, 0.04]}
          color={ink}
          position={[0, 0.21, 0.22]}
        />
        <Rounded
          size={[0.43, 0.07, 0.04]}
          color={ink}
          position={[0.18, 0, 0.22]}
        />
        <mesh position={[0, 0, 0.25]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={blue} />
        </mesh>
      </group>
      {stage === 0 && (
        <group
          ref={hand}
          position={[-2.4, -0.4, 2.1]}
          rotation={[0.45, 0.1, -0.2]}
        >
          <Rounded size={[0.76, 1.1, 0.4]} color={skin} radius={0.18} />
          {[0, 1, 2, 3].map((i) => (
            <Rounded
              key={i}
              size={[0.16, 0.63 - Math.abs(i - 1.5) * 0.08, 0.22]}
              color={skin}
              radius={0.08}
              position={[-0.26 + i * 0.18, 0.68, 0]}
            />
          ))}
          <Rounded
            size={[0.85, 0.8, 0.46]}
            color={violet}
            radius={0.12}
            position={[0, -0.77, 0]}
          />
        </group>
      )}
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.6, 0]}
      >
        <planeGeometry args={[200, 200]} />
        <shadowMaterial opacity={0.08} />
      </mesh>
    </group>
  );
}

class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="story-fallback">
        Create your CV. Send it. Wait for a reply.
        <br />
        Review the next draft with HireLens.
      </div>
    ) : (
      this.props.children
    );
  }
}

export function ApplicationStory() {
  const [currentStage, setStage] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(true);
  const [palette, setPalette] = useState<string[] | null>(null);
  const [reduced, setReduced] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);
  const stage = reduced ? 4 : currentStage;
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const css = getComputedStyle(document.documentElement);
      setPalette(
        [
          '--navy',
          '--blue',
          '--violet',
          '--paper',
          '--pale',
          '--story-skin',
        ].map((name) => css.getPropertyValue(name).trim()),
      );
    });
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (root.current) observer.observe(root.current);
    const change = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', change);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', change);
    };
  }, []);
  useEffect(() => {
    if (!playing || reduced || !visible) return;
    const timer = setTimeout(
      () => setStage((s) => (s + 1) % chapters.length),
      stage === 4 ? 2800 : 1800,
    );
    return () => clearTimeout(timer);
  }, [stage, playing, reduced, visible]);
  const still = !playing || !!reduced || !visible;
  return (
    <div className="application-story" ref={root}>
      <div className="story-canvas" aria-hidden="true">
        {palette && (
          <SceneBoundary>
            <Canvas
              shadows
              camera={{ position: [3, 3.8, 13], fov: 33 }}
              dpr={[1, 1.5]}
              frameloop={still ? 'demand' : 'always'}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={2} />
              <directionalLight
                position={[-3, 9, 6]}
                intensity={3.5}
                castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                shadow-bias={-0.001}
              />
              <Scene stage={stage} still={still} palette={palette} />
            </Canvas>
          </SceneBoundary>
        )}
      </div>
      <div className="story-caption" aria-live={playing ? 'off' : 'polite'}>
        <strong>{chapters[stage].title}</strong>
        <p>{chapters[stage].body}</p>
        {stage === 4 && <Link href="/analyze">Review my CV</Link>}
      </div>
      <div
        className="story-controls"
        aria-label="Illustrative application story"
      >
        <ol className="story-progress" aria-label="Application stages">
          {chapters.map((chapter, index) => (
            <li
              key={chapter.label}
              aria-current={stage === index ? 'step' : undefined}
              className={
                index < stage
                  ? 'is-complete'
                  : stage === index
                    ? 'is-current'
                    : ''
              }
            >
              <span className="story-progress-track" aria-hidden="true">
                <i
                  key={`${stage}-${index}`}
                  style={{
                    animationDuration: stage === 4 ? '2800ms' : '1800ms',
                    animationPlayState: still ? 'paused' : 'running',
                  }}
                />
              </span>
              <span>{chapter.label}</span>
            </li>
          ))}
        </ol>
        {!reduced && (
          <button
            className="story-play"
            type="button"
            aria-label={playing ? 'Pause story' : 'Play story'}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? <Pause size={17} /> : <Play size={17} />}
          </button>
        )}
      </div>
      <span className="story-disclaimer">
        An illustrative application, not a prediction of your result.
      </span>
    </div>
  );
}
