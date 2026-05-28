"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  MeshDistortMaterial, 
  MeshWobbleMaterial, 
  Environment, 
  ContactShadows,
  PerspectiveCamera
} from "@react-three/drei";
import * as THREE from "three";

const FloatingGeometries = () => {
  return (
    <>
      {/* Central Abstract Orb */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[2, 20]} />
          <MeshDistortMaterial
            color="#3b82f6"
            speed={2}
            distort={0.4}
            radius={1}
            roughness={0.1}
            metalness={0.8}
            emissive="#1e3a8a"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      {/* Glass Ring */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <mesh rotation={[Math.PI / 4, 0, 0]} position={[0, 0, -1]}>
          <torusGeometry args={[3.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
        </mesh>
      </Float>

      {/* Floating Particles/Elements */}
      {[...Array(15)].map((_, i) => (
        <Float key={i} speed={Math.random() * 2} position={[
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 5
        ]}>
          <mesh rotation={[Math.random(), Math.random(), 0]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <MeshWobbleMaterial 
              color={i % 2 === 0 ? "#6366f1" : "#ffffff"} 
              factor={0.4} 
              speed={1} 
              roughness={0} 
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        
        <FloatingGeometries />
        
        <Environment preset="city" />
        <ContactShadows
          position={[0, -3.5, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={4.5}
        />
      </Canvas>
    </div>
  );
};

export default HeroScene;