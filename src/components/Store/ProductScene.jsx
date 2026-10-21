"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Turntable({ spinning, children }) {
  const group = useRef(null);
  const drag = useRef({ active: false, x: 0 });

  useFrame((_, delta) => {
    if (spinning && group.current && !drag.current.active) {
      group.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group
      ref={group}
      onPointerDown={(event) => {
        drag.current.active = true;
        drag.current.x = event.clientX;
        event.stopPropagation();
      }}
      onPointerMove={(event) => {
        if (!drag.current.active || !group.current) return;
        const deltaX = event.clientX - drag.current.x;
        drag.current.x = event.clientX;
        group.current.rotation.y += deltaX * 0.012;
      }}
      onPointerUp={() => {
        drag.current.active = false;
      }}
      onPointerLeave={() => {
        drag.current.active = false;
      }}
    >
      {children}
    </group>
  );
}

function stoneMaterial(bead) {
  if (bead.glass) {
    return (
      <meshPhysicalMaterial
        color={bead.color}
        transparent
        opacity={0.45}
        roughness={0.04}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0.05}
      />
    );
  }
  return (
    <meshPhysicalMaterial
      color={bead.color}
      roughness={bead.rough}
      metalness={bead.metal}
      clearcoat={bead.clear}
      clearcoatRoughness={0.14}
    />
  );
}

function Bracelet({ beads }) {
  const sequence = useMemo(() => {
    const list = [];
    const pattern = [];
    beads.forEach((bead) => {
      const copies = bead.id === "gold" ? 1 : 3;
      for (let i = 0; i < copies; i += 1) pattern.push(bead);
    });
    const rounds = Math.max(2, Math.ceil(21 / pattern.length));
    for (let i = 0; i < rounds; i += 1) list.push(...pattern);
    return list.slice(0, 21);
  }, [beads]);

  const radius = 2.15;
  return (
    <group rotation={[0.62, 0.2, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.045, 12, 80]} />
        <meshStandardMaterial color="#2a241c" roughness={0.7} metalness={0.05} />
      </mesh>
      {sequence.map((bead, index) => {
        const angle = (index / sequence.length) * Math.PI * 2;
        const scale = bead.metal > 0.8 ? 0.2 : 0.32;
        return (
          <mesh
            key={`${bead.id}-${index}`}
            position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
            scale={scale}
          >
            <sphereGeometry args={[1, 40, 28]} />
            {stoneMaterial(bead)}
          </mesh>
        );
      })}
    </group>
  );
}

function CrystalGroup({ tone, glass }) {
  const pieces = [
    { pos: [-0.7, 0.15, 0.2], scale: [0.55, 0.9, 0.5], geo: "octa" },
    { pos: [0.15, 0.35, -0.1], scale: [0.45, 1.15, 0.42], geo: "octa" },
    { pos: [0.85, 0.05, 0.25], scale: [0.5, 0.7, 0.48], geo: "octa" },
    { pos: [-0.2, -0.15, 0.85], scale: 0.28, geo: "sphere" },
    { pos: [0.45, -0.2, 0.95], scale: 0.22, geo: "sphere" },
    { pos: [1.05, -0.18, 0.7], scale: 0.24, geo: "sphere" },
  ];
  return (
    <group position={[0, -0.15, 0]}>
      {pieces.map((piece, index) => (
        <mesh key={index} position={piece.pos} scale={piece.scale}>
          {piece.geo === "octa" ? <octahedronGeometry args={[1, 0]} /> : <sphereGeometry args={[1, 32, 24]} />}
          {stoneMaterial({ color: tone, rough: glass ? 0.05 : 0.22, metal: 0.04, clear: glass ? 1 : 0.65, glass })}
        </mesh>
      ))}
    </group>
  );
}

function Rudraksha({ tone, faces }) {
  const ridges = Math.min(faces || 7, 10);
  return (
    <group position={[0, 0.15, 0]}>
      <mesh position={[0, -0.95, 0]}>
        <cylinderGeometry args={[1.35, 1.45, 0.28, 40]} />
        <meshStandardMaterial color="#e6d7c3" roughness={0.85} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.72, 40, 28]} />
        <meshStandardMaterial color={tone} roughness={0.78} metalness={0.02} />
      </mesh>
      {Array.from({ length: ridges }).map((_, index) => (
        <mesh key={index} rotation={[0, (index / ridges) * Math.PI, 0.15]}>
          <torusGeometry args={[0.62, 0.035, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#4a2818" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Pyramid({ tone }) {
  return (
    <group position={[0, -0.2, 0]}>
      <mesh rotation={[0, Math.PI / 4, 0]} position={[0, 0.15, 0]}>
        <coneGeometry args={[1.25, 1.9, 4]} />
        <meshPhysicalMaterial
          color={tone}
          transparent
          opacity={0.55}
          roughness={0.08}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.82, 0]}>
        <circleGeometry args={[1.7, 40]} />
        <meshStandardMaterial color="#c4a574" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Stage({ product, spinning }) {
  return (
    <Turntable spinning={spinning}>
      {product.view === "bracelet" ? <Bracelet beads={product.beads} /> : null}
      {product.view === "crystal" ? <CrystalGroup tone={product.tone} glass={product.glass} /> : null}
      {product.view === "rudraksha" ? <Rudraksha tone={product.tone} faces={product.faces} /> : null}
      {product.view === "pyramid" ? <Pyramid tone={product.tone} /> : null}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]}>
        <circleGeometry args={[3.2, 40]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.28} />
      </mesh>
    </Turntable>
  );
}

export default function ProductScene({ product, spinning = true }) {
  return (
    <Canvas camera={{ position: [0, 1.1, 6.2], fov: 32 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.45} />
      <hemisphereLight args={["#fff4e4", "#3d4a44", 0.4]} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} />
      <pointLight position={[-3, 1.5, 2]} intensity={6} color="#ffe0b0" />
      <Stage product={product} spinning={spinning} />
    </Canvas>
  );
}
