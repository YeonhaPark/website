"use client";
import { PerspectiveCamera, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { HackerRoom } from "./hacker-room";
import { Suspense } from "react";
import { CanvasLoader } from "./canvas-loader";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "@/lib/three";
// import { Target } from "./target";
import { ReactLogo } from "./react-logo";
import { Cube } from "./cube";
import { EthereumLogo } from "./ethereum-logo";
import { HeroCamera } from "./hero-camera";
import { Button } from "./button";

export const Hero = () => {
  const { progress } = useProgress();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isTallScreen = useMediaQuery({ query: "(max-aspect-ratio: 1/1)" }); // 세로형 화면 감지
  const sizes = calculateSizes(isSmall, isMobile, isTablet);
  return (
    <section className="min-h-screen w-full flex flex-col relative overflow-hidden">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-2xl font-medium text-white text-center font-work-sans">
          Hi, I am Yeonha <span className="waving-hand">👋🏻</span>
        </p>
        <p className="hero_tag text-gray_gradient">
          Building Products & Brands
        </p>
      </div>
      <div
        className="w-full h-full absolute inset-0 flex justify-center"
        style={{ height: "100vh", maxHeight: "100vh" }}
      >
        <div className="w-full max-w-[1200px] h-full">
          <Canvas
            className="w-full h-full"
            style={{ height: "100%", width: "100%" }}
          >
            {/* 기존 Canvas 내용 */}
            <Suspense fallback={<CanvasLoader progress={progress} />}>
              <HeroCamera isMobile={isMobile} isTallScreen={isTallScreen}>
                <HackerRoom
                  scale={sizes.deskScale}
                  position={sizes.deskPosition}
                  rotation={[0, -Math.PI, 0]}
                />
              </HeroCamera>
              <group>
                {/* <Target
                  scale={isMobile ? 0.8 : 1.2}
                  position={sizes.targetPosition as [number, number, number]}
                /> */}
                <ReactLogo
                  scale={isMobile ? 0.2 : 0.5}
                  position={sizes.reactLogoPosition as [number, number, number]}
                />
                <Cube
                  scale={isMobile ? 0.4 : 0.74}
                  position={sizes.cubePosition as [number, number, number]}
                />
                <EthereumLogo
                  scale={isMobile ? 0.4 : 0.7}
                  position={
                    sizes.ethereumLogoPosition as [number, number, number]
                  }
                />
              </group>
              <ambientLight intensity={1} />
              <directionalLight position={[10, 10, 10]} intensity={0.5} />
            </Suspense>
            <PerspectiveCamera
              makeDefault
              position={[0, 0, isTallScreen ? 40 : 30]}
              fov={
                isTallScreen
                  ? 85 // 세로형 화면에서 더 넓은 시야
                  : isTablet
                  ? 65
                  : isMobile
                  ? 70
                  : 75
              }
            />
          </Canvas>
        </div>
      </div>
      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        <a href="#about" className="w-fit">
          <Button
            name="Let's work together"
            isBeam
            containerClass="sm:w-fit w-full sm:min-w-96"
          />
        </a>
      </div>
    </section>
  );
};
