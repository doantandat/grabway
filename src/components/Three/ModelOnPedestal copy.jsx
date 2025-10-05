// src/components/ModelOnPedestal.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls, ContactShadows } from "@react-three/drei";

function Model({ url = "/models/f-16_fighting_falcon_-_fighter_jet_-_free.glb", scale = 0.01 }) {
  const { scene } = useGLTF(url, true);
  return <primitive object={scene} scale={scale} />;
}

export default function ModelOnPedestal({
  url = "/models/f-16_fighting_falcon_-_fighter_jet_-_free.glb",
  scale = 0.018,
  className
}) {
  // góc camera mong muốn (giống ảnh): hơi chếch từ trên xuống ~30–35°
  const ELEV = Math.PI * 0.28; // ~50° (chỉnh tuỳ mắt: 0.22–0.35)
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ position: [3.2, 1.8, 6.0], fov: 45 }}  // giữ nguyên góc nhìn
      className={`!absolute top-10 !w-full !h-screen ${className}`}
    
    >
      {/* KHÔNG để Stage tự chỉnh camera */}
      <Stage environment="sunset" intensity={0.9} shadows="contact" adjustCamera={false}>
        <Model url={url} scale={scale} />
      </Stage>

      {/* Chỉ cho quay quanh trục Y: khoá polar (elevation) = ELEV */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={ELEV}
        maxPolarAngle={ELEV}
        // cho quay tự do 360° quanh Y:
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        rotateSpeed={1.5} // tăng/giảm tốc độ xoay khi vuốt
        target={[0, 0, 0]}
        makeDefault
      />

      <ContactShadows position={[0, -0.8, 0]} opacity={0.35} scale={10} blur={2.4} far={8} />
    </Canvas>
  );
}
