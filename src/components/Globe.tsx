import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Html, Points, PointMaterial, Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";

// Sample destinations with lat/lon converted to 3D positions
const DESTINATIONS = [
  { name: "Tokyo", lat: 35.6762, lon: 139.6503, color: "#ec4899" },
  { name: "Paris", lat: 48.8566, lon: 2.3522, color: "#a855f7" },
  { name: "New York", lat: 40.7128, lon: -74.006, color: "#38bdf8" },
  { name: "Sydney", lat: -33.8688, lon: 151.2093, color: "#22d3ee" },
  { name: "Dubai", lat: 25.2048, lon: 55.2708, color: "#f59e0b" },
  { name: "Rio", lat: -22.9068, lon: -43.1729, color: "#10b981" },
  { name: "Cape Town", lat: -33.9249, lon: 18.4241, color: "#f43f5e" },
  { name: "Mumbai", lat: 19.076, lon: 72.8777, color: "#8b5cf6" },
  { name: "London", lat: 51.5074, lon: -0.1278, color: "#06b6d4" },
  { name: "Bangkok", lat: 13.7563, lon: 100.5018, color: "#fb7185" },
  { name: "LA", lat: 34.0522, lon: -118.2437, color: "#60a5fa" },
  { name: "Singapore", lat: 1.3521, lon: 103.8198, color: "#34d399" },
];

// Convert lat/lon degrees to position on a sphere of given radius
const latLonToVec3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

// Draw a curved arc between two points on sphere
const createArc = (a: THREE.Vector3, b: THREE.Vector3, segments = 64) => {
  const dist = a.distanceTo(b);
  const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(a.length() + dist * 0.3);
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  return curve.getPoints(segments);
};

// Animated particle field
function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const count = 800;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 2.5;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, []);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.02;
      ref.current.rotation.x += dt * 0.005;
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#c4b5fd" size={0.02} sizeAttenuation depthWrite={false} opacity={0.7} />
    </Points>
  );
}

// Globe mesh with wireframe overlay
function GlobeSphere() {
  const ref = useRef<THREE.Mesh>(null!);
  const wire = useRef<THREE.LineSegments>(null!);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.05;
    if (wire.current) wire.current.rotation.y += dt * 0.05;
  });
  return (
    <group>
      <Sphere ref={ref} args={[2, 96, 96]}>
        <meshStandardMaterial
          color="#0b0f2a"
          emissive="#1e1b4b"
          emissiveIntensity={0.25}
          metalness={0.4}
          roughness={0.6}
        />
      </Sphere>
      <Torus args={[2.01, 0.004, 8, 120]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
      </Torus>
      <Torus args={[2.02, 0.003, 8, 80]} rotation={[Math.PI / 3, 0.6, 0.2]}>
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
      </Torus>
    </group>
  );
}

// Destination markers
function Markers() {
  return (
    <>
      {DESTINATIONS.map((d, i) => {
        const pos = latLonToVec3(d.lat, d.lon, 2.05);
        const n = pos.clone().normalize();
        return (
          <group key={d.name} position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <group position={pos}>
              <mesh lookAt={new THREE.Vector3(0, 0, 0)}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshBasicMaterial color={d.color} />
              </mesh>
              <Html
                position={[0, 0.18, 0]}
                center
                distanceFactor={8}
                style={{ pointerEvents: "none" }}
              >
                <div
                  className="px-2 py-1 rounded-md text-[10px] font-medium whitespace-nowrap"
                  style={{
                    background: "rgba(10,10,30,0.7)",
                    border: `1px solid ${d.color}66`,
                    color: "#fff",
                    backdropFilter: "blur(8px)",
                    boxShadow: `0 0 20px ${d.color}55`,
                  }}
                >
                  {d.name}
                </div>
              </Html>
            </group>
            {/* Pulsing ring */}
            <PulseRing position={pos} color={d.color} delay={i * 0.3} normal={n} />
          </group>
        );
      })}
    </>
  );
}

function PulseRing({ position, color, delay, normal }: { position: THREE.Vector3; color: string; delay: number; normal: THREE.Vector3 }) {
  const ref = useRef<THREE.Mesh>(null!);
  const start = useRef(delay);
  useFrame((_, dt) => {
    start.current += dt;
    if (ref.current) {
      const t = (start.current % 2) / 2;
      const s = 1 + t * 4;
      ref.current.scale.set(s, s, s);
      (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.6 * (1 - t);
    }
  });
  // Orient ring tangent to sphere
  const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal.clone().normalize());
  return (
    <mesh ref={ref} position={position} quaternion={quat}>
      <ringGeometry args={[0.08, 0.09, 32]} />
      <meshBasicMaterial color={color} transparent side={THREE.DoubleSide} opacity={0.6} />
    </mesh>
  );
}

// Flight routes
function Routes() {
  const pairs = [
    [0, 1], [1, 2], [2, 5], [0, 11], [3, 11], [4, 7], [7, 9], [8, 1], [2, 10], [6, 5],
  ];
  return (
    <>
      {pairs.map(([a, b], i) => {
        const A = latLonToVec3(DESTINATIONS[a].lat, DESTINATIONS[a].lon, 2.04);
        const B = latLonToVec3(DESTINATIONS[b].lat, DESTINATIONS[b].lon, 2.04);
        const points = createArc(A, B, 80);
        const geom = useMemo(() => {
          const g = new THREE.BufferGeometry().setFromPoints(points);
          return g;
        }, [a, b]);
        return <FlightLine key={i} geometry={geom} points={points} color={DESTINATIONS[a].color} index={i} />;
      })}
    </>
  );
}

function FlightLine({ geometry, points, color, index }: { geometry: THREE.BufferGeometry; points: THREE.Vector3[]; color: string; index: number }) {
  const lineRef = useRef<THREE.Line>(null!);
  const plane = useRef<THREE.Mesh>(null!);
  const t = useRef((index % 5) * 0.2);
  useFrame((_, dt) => {
    t.current = (t.current + dt * 0.15) % 1;
    if (plane.current) {
      const idx = Math.floor(t.current * (points.length - 1));
      const p = points[idx];
      plane.current.position.copy(p);
      const next = points[Math.min(idx + 1, points.length - 1)];
      plane.current.lookAt(next);
    }
  });
  return (
    <group>
      <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 }))} ref={lineRef} />
      <mesh ref={plane}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

// Parallax camera based on mouse
function ParallaxCamera() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.03;
    camera.position.y += (mouse.current.y * 0.5 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  // Mouse listener via window
  if (typeof window !== "undefined") {
    window.onmousemove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
  }
  return null;
}

export default function Globe() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#05060f"]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} color="#a78bfa" />
        <pointLight position={[-5, -2, -5]} intensity={0.8} color="#22d3ee" />
        <pointLight position={[0, 5, 0]} intensity={0.6} color="#ec4899" />
        <Suspense fallback={null}>
          <Stars radius={30} depth={20} count={4000} factor={2} saturation={0} fade speed={0.5} />
          <ParallaxCamera />
          <ParticleField />
          <GlobeSphere />
          <Markers />
          <Routes />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} rotateSpeed={0.3} />
      </Canvas>
    </div>
  );
}
