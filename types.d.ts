// types.d.ts
import * as THREE from "three"; // 👈 이거 꼭 추가해야 함

export type GLTF = {
  scene: THREE.Group;
  scenes: THREE.Group[];
  animations: THREE.AnimationClip[];
  cameras: THREE.Camera[];
  asset: Record<string, any>;
  parser: any;
  userData: Record<string, any>;
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
};
