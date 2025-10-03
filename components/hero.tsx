"use client";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import HackerRoom from "./hacker-room";
import { Suspense } from "react";
import { CanvasLoader } from "./canvas-loader";
import { FiFacebook } from "react-icons/fi";

export const Hero = () => {
  return (
    <div className="w-full h-full">
      <FiFacebook className="text-white" />
      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 30]} />
        {/* <Suspense fallback={<CanvasLoader />}> */}
        <HackerRoom scale={0.1} position={[0, 0, 0]} rotation={[0.5, 280, 0]} />
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={0.5} />
        {/* </Suspense> */}
      </Canvas>
    </div>
  );
};
