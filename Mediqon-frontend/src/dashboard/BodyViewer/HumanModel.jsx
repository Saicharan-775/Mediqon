import { useGLTF } from "@react-three/drei";

export default function HumanModel() {
  const gltf = useGLTF("/models/human_body.glb");

  return (
    <primitive
      object={gltf.scene}
      scale={1}
      position={[0, -1, 0]}
    />
  );
}