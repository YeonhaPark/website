import { Float } from "@react-three/drei";
import { useGLTF } from "@react-three/drei/core/Gltf";
import { JSX } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
type GLTFResult = GLTF & {
  nodes: {
    ["React-Logo_Material002_0"]: THREE.Mesh;
  };
  materials: {
    ["Material.002"]: THREE.MeshStandardMaterial;
  };
};
export const ReactLogo = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes, materials } = useGLTF(
    "/models/react.glb"
  ) as unknown as GLTFResult;
  return (
    <Float floatIntensity={1}>
      <group position={[8, 8, 0]} scale={0.3} {...props}>
        <mesh
          geometry={nodes["React-Logo_Material002_0"].geometry}
          material={materials["Material.002"]}
          position={[0, 0.079, 0.181]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.392, 0.392, 0.527]}
        />
      </group>
    </Float>
  );
};

useGLTF.preload("/models/react.glb");
