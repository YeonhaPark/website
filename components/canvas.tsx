"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const RotatingCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1, 1, 0.5]} />
      <meshLambertMaterial color="#468585" emissive={0x111111} />

      <Sparkles
        count={100}
        scale={3}
        size={1}
        speed={0.005}
        noise={0.2}
        color={"orange"}
      />
    </mesh>
  );
};

const CanvasComponent = () => {
  return (
    <Canvas
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <OrbitControls enableZoom enablePan enableRotate />
      <directionalLight position={[1, 1, 5]} intensity={1} />
      <RotatingCube />
    </Canvas>
  );
};

export default CanvasComponent;
