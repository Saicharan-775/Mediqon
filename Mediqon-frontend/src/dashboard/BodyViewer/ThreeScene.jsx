import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BodyModel from "./BodyModel";
const ThreeScene = () => {
  return (
     <Canvas
      camera={{ position: [0, 1.5, 4], fov: 45 }}
      style={{ background: "#eef1f7" }}
    >
      {/* LIGHTS */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} />

     <BodyModel />
      {/* CONTROLS */}
      <OrbitControls
        enablePan={false}
        minDistance={2.5}
        maxDistance={6}
      />
    </Canvas>
  )
}

export default ThreeScene