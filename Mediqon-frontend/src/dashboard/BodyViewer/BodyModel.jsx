import { Text } from "@react-three/drei";

const BodyModel = () => {
  return (
    <group>
      {/* Simple box as placeholder */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 2, 0.5]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
      {/* Text placeholder */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        3D Body Coming Soon
      </Text>
    </group>
  );
};

export default BodyModel;
