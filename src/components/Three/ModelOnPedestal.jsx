// src/components/ModelOnPedestal.jsx
import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls, ContactShadows } from "@react-three/drei";
// --- Model bên trong ModelOnPedestal ---
function Model({ url, scale = 0.01, tint, targetNames, resetCounter = 0 }) {
  const { scene: cachedScene } = useGLTF(url, true);
  // Luôn làm việc trên 1 scene CLONE để không làm bẩn cache của useGLTF
  const scene = React.useMemo(() => cachedScene.clone(true), [cachedScene]);

  // Lưu "gốc" & "đang dùng"
  const baseMats   = useRef([]); // [{ mesh, base: Material|Material[], index/null }]
  const tintedMats = useRef([]); // Material[] đang gán cho mesh (để dispose/gán mới)
  const collected  = useRef(false);

  // Thu thập 1 lần: chụp lại vật liệu GỐC (clone)
  useEffect(() => {
    if (collected.current) return;
    const list = [];
    scene.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      if (Array.isArray(targetNames)) {
        const ok = targetNames.includes(o.name) || targetNames.includes(o.material?.name);
        if (!ok) return;
      }
      if (Array.isArray(o.material)) {
        // clone gốc để giữ vĩnh viễn
        const baseArr = o.material.map((m) => m.clone());
        list.push({ mesh: o, base: baseArr, index: 'array' });
      } else {
        const baseOne = o.material.clone();
        list.push({ mesh: o, base: baseOne, index: null });
      }
    });
    baseMats.current = list;
    collected.current = true;

    // cleanup: luôn trả về gốc & huỷ tinted
    return () => {
      resetToOriginal();
      disposeTinted();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, targetNames?.join?.("|")]);

  const disposeTinted = () => {
    tintedMats.current.forEach((m) => {
      try { Array.isArray(m) ? m.forEach(x => x?.dispose?.()) : m?.dispose?.(); } catch {}
    });
    tintedMats.current = [];
  };

  const resetToOriginal = () => {
    // gán lại đúng base clone đã chụp lúc mount
    baseMats.current.forEach(({ mesh, base, index }) => {
      if (!mesh) return;
      if (index === 'array') {
        mesh.material = base.map((m) => m); // reattach base arr
      } else {
        mesh.material = base;
      }
    });
  };

  // ÉP reset cứng mỗi khi resetCounter tăng
  useEffect(() => {
    if (resetCounter > 0) {
      resetToOriginal();
      disposeTinted();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCounter]);

  // Áp dụng màu mỗi khi tint đổi
  useEffect(() => {
    // reset mềm: null/undefined/"" => về gốc
    if (tint == null || tint === "") {
      resetToOriginal();
      disposeTinted();
      return;
    }

    // Tạo bộ material mới theo base, set color, gán vào mesh
    // (mỗi lần đổi tint → tạo mới, gán mới, dispose bộ cũ)
    const newTinted = baseMats.current.map(({ mesh, base, index }) => {
      if (index === 'array') {
        const arr = base.map((b) => {
          const c = b.clone();
          if (c?.color) c.color.set(tint);
          c.needsUpdate = true;
          return c;
        });
        mesh.material = arr;
        return arr;
      } else {
        const c = base.clone();
        if (c?.color) c.color.set(tint);
        c.needsUpdate = true;
        mesh.material = c;
        return c;
      }
    });

    // huỷ bộ cũ rồi lưu bộ mới
    disposeTinted();
    tintedMats.current = newTinted;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tint]);

  return <primitive object={scene} scale={scale} />;
}

export default function ModelOnPedestal({
  url = "/models/f-16_fighting_falcon_-_fighter_jet_-_free.glb",
  scale = 0.018,
  tint = undefined,        // hex => tô; null/undefined/"" => reset mềm
  resetCounter = 0,        // số tăng dần để ép reset cứng
  onlyParts = null,
  className,
}) {
  const ELEV = Math.PI * 0.28;

  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ position: [3.2, 1.8, 6.0], fov: 45 }}
      className={`!absolute top-10 !w-full !h-screen ${className}`}
    >
      <Stage environment="sunset" intensity={0.9} shadows="contact" adjustCamera={false}>
        <Model
          url={url}
          scale={scale}
          tint={tint}
          resetCounter={resetCounter}
          targetNames={onlyParts}
        />
      </Stage>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={ELEV}
        maxPolarAngle={ELEV}
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        rotateSpeed={1.5}
        target={[0, 0, 0]}
        makeDefault
      />
      <ContactShadows position={[0, -0.8, 0]} opacity={0.35} scale={10} blur={2.4} far={8} />
    </Canvas>
  );
}
