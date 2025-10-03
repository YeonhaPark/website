import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import * as THREE from "three";

interface HackerRoomProps {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

type GLTFResult = GLTF & {
  nodes: {
    computer_computer_mat_0: THREE.Mesh;
    server_server_mat_0: THREE.Mesh;
    vhs_vhsPlayer_mat_0: THREE.Mesh;
    shelf_stand_mat_0: THREE.Mesh;
    keyboard_mat_mat_mat_0: THREE.Mesh;
    arm_arm_mat_0: THREE.Mesh;
    Tv_tv_mat_0: THREE.Mesh;
    table_table_mat_0: THREE.Mesh;
    table_table_mat_0_1: THREE.Mesh;
    table_table_mat_0_2: THREE.Mesh;
    table_table_mat_0_3: THREE.Mesh;
    table_table_mat_0_4: THREE.Mesh;
    table_table_mat_0_5: THREE.Mesh;
    table_table_mat_0_6: THREE.Mesh;
    table_table_mat_0_7: THREE.Mesh;
    table_table_mat_0_8: THREE.Mesh;
    table_table_mat_0_9: THREE.Mesh;
    table_table_mat_0_10: THREE.Mesh;
    table_table_mat_0_11: THREE.Mesh;
    table_table_mat_0_12: THREE.Mesh;
    Cables_cables_mat_0: THREE.Mesh;
    props_props_mat_0: THREE.Mesh;
    screen_screens_0: THREE.Mesh;
    screen_glass_glass_0: THREE.Mesh;
    Ground_ground_mat_0: THREE.Mesh;
    peripherals_key_mat_0: THREE.Mesh;
  };
  materials: {
    computer_mat: THREE.MeshStandardMaterial;
    server_mat: THREE.MeshStandardMaterial;
    vhsPlayer_mat: THREE.MeshStandardMaterial;
    stand_mat: THREE.MeshStandardMaterial;
    mat_mat: THREE.MeshStandardMaterial;
    arm_mat: THREE.MeshStandardMaterial;
    tv_mat: THREE.MeshStandardMaterial;
    table_mat: THREE.MeshStandardMaterial;
    cables_mat: THREE.MeshStandardMaterial;
    props_mat: THREE.MeshStandardMaterial;
    screens: THREE.MeshStandardMaterial;
    glass: THREE.MeshPhysicalMaterial;
    ground_mat: THREE.MeshStandardMaterial;
    key_mat: THREE.MeshStandardMaterial;
  };
};

export function HackerRoom(props: HackerRoomProps) {
  const { nodes, materials } = useGLTF(
    "/models/hacker-room.glb"
  ) as unknown as GLTFResult;

  const monitortxt = useTexture("textures/desk/monitor.png");
  const screenTxt = useTexture("textures/desk/screen.png");

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.screen_screens_0.geometry}
        material={materials.screens}
      >
        <meshMatcapMaterial map={screenTxt} />
      </mesh>
      <mesh
        geometry={nodes.screen_glass_glass_0.geometry}
        material={materials.glass}
      />
      <mesh
        geometry={nodes.table_table_mat_0_1.geometry}
        material={materials.table_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_2.geometry}
        material={materials.computer_mat}
      >
        <meshMatcapMaterial map={monitortxt} />
      </mesh>
      <mesh
        geometry={nodes.table_table_mat_0_3.geometry}
        material={materials.server_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_4.geometry}
        material={materials.vhsPlayer_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_5.geometry}
        material={materials.stand_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_6.geometry}
        material={materials.mat_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_7.geometry}
        material={materials.arm_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_8.geometry}
        material={materials.tv_mat}
      >
        <meshMatcapMaterial map={monitortxt} />
      </mesh>
      <mesh
        geometry={nodes.table_table_mat_0_9.geometry}
        material={materials.cables_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_10.geometry}
        material={materials.props_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_11.geometry}
        material={materials.ground_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_12.geometry}
        material={materials.key_mat}
      />
    </group>
  );
}
useGLTF.preload("/models/hacker-room.glb");

export default HackerRoom;
