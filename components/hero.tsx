"use client";
import { PerspectiveCamera, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { HackerRoom } from "./hacker-room";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { CanvasLoader } from "./canvas-loader";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "@/lib/three";
import { Target } from "./target";
import { ReactLogo } from "./react-logo";
import { Cube } from "./cube";
import { EthereumLogo } from "./ethereum-logo";

export const Hero = () => {
  const { progress } = useProgress();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-2xl font-medium text-white text-center font-work-sans">
          Hi, I am Yeonha <span className="waving-hand">👋🏻</span>
        </p>
        <p className="hero_tag text-gray_gradient">
          Building Products & Brands
        </p>
      </div>
      <div className="w-full h-full absolute inset-0">
        {/* <Leva /> */}

        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader progress={progress} />}>
            <HackerRoom
              scale={sizes.deskScale}
              position={sizes.deskPosition}
              rotation={[0, -Math.PI, 0]}
            />
            <group>
              <Target
                position={sizes.targetPosition as [number, number, number]}
              />
              <ReactLogo
                position={sizes.reactLogoPosition as [number, number, number]}
              />
              <Cube position={sizes.cubePosition as [number, number, number]} />
              <EthereumLogo
                scale={0.8}
                position={sizes.ringPosition as [number, number, number]}
              />
              {/* <OrbitControls /> */}
            </group>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
          <PerspectiveCamera makeDefault position={[0, 0, 20]} />
        </Canvas>
      </div>
    </section>
  );
};
