import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { easing } from "maath";
interface HeroCameraProps {
  children: React.ReactNode;
  isMobile: boolean;
  isTallScreen: boolean;
}

export const HeroCamera = ({
  children,
  isMobile,
  isTallScreen,
}: HeroCameraProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [0, 0, !isMobile && isTallScreen ? 30 : 20],
      0.25,
      delta
    );

    if (!isMobile && groupRef.current) {
      easing.dampE(
        groupRef.current.rotation,
        [-state.pointer.y / 3, -state.pointer.x / 5, 0],
        0.25,
        delta
      );
    }
  });
  return (
    <group ref={groupRef} scale={isMobile ? 0.8 : 1.2}>
      {children}
    </group>
  );
};
