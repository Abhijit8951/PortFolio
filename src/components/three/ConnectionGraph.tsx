"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The signature visual: a sparse network of nodes that connect, pulse,
 * and occasionally drop — modeled loosely on what a WebRTC/Socket.IO
 * signaling mesh looks like (peers establishing and tearing down links).
 * This is the one deliberate 3D risk in the design; everything else stays quiet.
 */

const NODE_COUNT = 22;
const CONNECT_DISTANCE = 3.4;

function useNodePositions(count: number) {
  return useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4
        )
      );
    }
    return positions;
  }, [count]);
}

function Nodes() {
  const basePositions = useNodePositions(NODE_COUNT);
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const velocities = useMemo(
    () =>
      basePositions.map(
        () =>
          new THREE.Vector3(
            (Math.random() - 0.5) * 0.12,
            (Math.random() - 0.5) * 0.12,
            (Math.random() - 0.5) * 0.08
          )
      ),
    [basePositions]
  );

  const positionsArray = useMemo(
    () => new Float32Array(NODE_COUNT * 3),
    []
  );

  const maxLines = NODE_COUNT * 6;
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(maxLines * 2 * 3), 3)
    );
    return geo;
  }, [maxLines]);

  const livePositions = useRef(basePositions.map((p) => p.clone()));

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const live = livePositions.current;

    for (let i = 0; i < NODE_COUNT; i++) {
      const p = live[i];
      const v = velocities[i];
      p.add(v.clone().multiplyScalar(0.04));

      // soft bounding box so nodes drift but don't escape
      if (Math.abs(p.x) > 5.5) v.x *= -1;
      if (Math.abs(p.y) > 3.2) v.y *= -1;
      if (Math.abs(p.z) > 2.2) v.z *= -1;

      positionsArray[i * 3] = p.x;
      positionsArray[i * 3 + 1] = p.y;
      positionsArray[i * 3 + 2] = p.z;
    }

    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      attr.array.set(positionsArray);
      attr.needsUpdate = true;
    }

    // rebuild connection lines each frame based on proximity
    if (linesRef.current) {
      const linePositions = lineGeometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      let idx = 0;
      for (let i = 0; i < NODE_COUNT && idx < maxLines; i++) {
        for (let j = i + 1; j < NODE_COUNT && idx < maxLines; j++) {
          const dist = live[i].distanceTo(live[j]);
          if (dist < CONNECT_DISTANCE) {
            linePositions.array[idx * 6] = live[i].x;
            linePositions.array[idx * 6 + 1] = live[i].y;
            linePositions.array[idx * 6 + 2] = live[i].z;
            linePositions.array[idx * 6 + 3] = live[j].x;
            linePositions.array[idx * 6 + 4] = live[j].y;
            linePositions.array[idx * 6 + 5] = live[j].z;
            idx++;
          }
        }
      }
      // zero out unused segments
      for (let k = idx; k < maxLines; k++) {
        linePositions.array[k * 6] = 0;
        linePositions.array[k * 6 + 1] = 0;
        linePositions.array[k * 6 + 2] = 0;
        linePositions.array[k * 6 + 3] = 0;
        linePositions.array[k * 6 + 4] = 0;
        linePositions.array[k * 6 + 5] = 0;
      }
      linePositions.needsUpdate = true;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.15;
      groupRef.current.rotation.x = Math.cos(t * 0.04) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positionsArray, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ff6b4a"
          size={0.09}
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#4a9eff" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

export default function ConnectionGraph() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#4a9eff" />
      <Nodes />
    </Canvas>
  );
}
