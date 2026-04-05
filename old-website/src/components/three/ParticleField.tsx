"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Line } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 2000 }) {
  const ref = useRef<THREE.Points>(null);

  // Generate random positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;

    // Slow rotation
    ref.current.rotation.x = state.clock.elapsedTime * 0.02;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;

    // Subtle mouse influence
    const mouseX = (state.mouse.x * Math.PI) / 10;
    const mouseY = (state.mouse.y * Math.PI) / 10;
    ref.current.rotation.x += mouseY * 0.01;
    ref.current.rotation.y += mouseX * 0.01;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00bfff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function Lines({ count = 100 }) {
  const ref = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const lineData: Array<[THREE.Vector3, THREE.Vector3]> = [];
    for (let i = 0; i < count; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
      const end = new THREE.Vector3(
        start.x + (Math.random() - 0.5) * 2,
        start.y + (Math.random() - 0.5) * 2,
        start.z + (Math.random() - 0.5) * 2
      );
      lineData.push([start, end]);
    }
    return lineData;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <group ref={ref}>
      {lines.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#00bfff"
          lineWidth={1}
          opacity={0.15}
          transparent
        />
      ))}
    </group>
  );
}

export function ParticleField() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <Particles count={1500} />
        <Lines count={80} />
      </Canvas>
    </div>
  );
}
