// EnergyRingPlus.jsx
import React from "react";

export default function EnergyRingPlus({
  size = 180,
  color = "14, 165, 233", // sky-500 (R,G,B có dấu phẩy)
  speed = 6,              // giây / vòng
  intensity = 1.0,        // 0.6..1.5 (độ rực)
  src,
  onClick,
  children
}) {
  const hole = 0.56;          // lỗ giữa
  const ringWidthPct = 2.5;   // % bán kính cho bề dày vòng

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }} onClick={onClick}>
      {/* HALO NGOÀI – phát sáng lớn, nhịp nháy */}
      <div
        className="absolute rounded-full"
        style={{
          inset: `-${size * 0.06}px`,
          boxShadow: `
            0 0 ${size * 0.40}px ${size * 0.18}px rgba(${color},${0.35 * intensity}),
            0 0 ${size * 0.22}px ${size * 0.10}px rgba(${color},${0.55 * intensity})
          `,
          animation: "er-pulse 1.6s ease-in-out infinite",
          filter: "blur(0.5px)",
        }}
      />

      {/* VÒNG 1 – xoay thuận */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            conic-gradient(
              from 0deg,
              rgba(${color},0) 0deg,
              rgba(${color},.95) 24deg,
              rgba(${color},0) 48deg,
              rgba(${color},.85) 78deg,
              rgba(${color},0) 110deg,
              rgba(${color},.9) 150deg,
              rgba(${color},0) 190deg,
              rgba(${color},.85) 230deg,
              rgba(${color},0) 270deg,
              rgba(${color},.95) 310deg,
              rgba(${color},0) 360deg
            )
          `,
          filter: `blur(${1.6 * intensity}px)`,
          mask: `radial-gradient(circle, transparent ${hole * 100}%, black ${hole * 100 + ringWidthPct}%)`,
          WebkitMask: `radial-gradient(circle, transparent ${hole * 100}%, black ${hole * 100 + ringWidthPct}%)`,
          animation: `er-spin ${speed}s linear infinite`,
          opacity: 0.95,
        }}
      />

      {/* VÒNG 2 – xoay NGƯỢC để dày lửa hơn */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            conic-gradient(
              from 10deg,
              rgba(${color},0) 0deg,
              rgba(${color},.75) 18deg,
              rgba(${color},0) 40deg,
              rgba(${color},.6) 70deg,
              rgba(${color},0) 100deg,
              rgba(${color},.7) 140deg,
              rgba(${color},0) 180deg,
              rgba(${color},.6) 220deg,
              rgba(${color},0) 260deg,
              rgba(${color},.75) 300deg,
              rgba(${color},0) 340deg,
              rgba(${color},.6) 360deg
            )
          `,
          filter: `blur(${2.2 * intensity}px)`,
          mask: `radial-gradient(circle, transparent ${hole * 100 - 0.6}%, black ${hole * 100 + ringWidthPct + 1.2}%)`,
          WebkitMask: `radial-gradient(circle, transparent ${hole * 100 - 0.6}%, black ${hole * 100 + ringWidthPct + 1.2}%)`,
          animation: `er-spin-rev ${speed * 1.3}s linear infinite`,
          opacity: 0.8,
        }}
      />

      {/* GLOW LÕI – phát sáng trong tâm */}
      <div
        className="absolute rounded-full"
        style={{
          inset: `${size * 0.14}px`,
          boxShadow: `0 0 ${size * 0.22}px ${size * 0.08}px rgba(${color},${0.65 * intensity})`,
          animation: "er-flicker 1.4s ease-in-out infinite",
        }}
      />

      {/* NỘI DUNG Ở GIỮA (tuỳ chọn) */}
      {src && <img src={src} alt="" className="relative z-10 w-full object-contain" />}
        {children}
      {/* Keyframes */}
      <style>{`
        @keyframes er-spin { to { transform: rotate(360deg); } }
        @keyframes er-spin-rev { to { transform: rotate(-360deg); } }
        @keyframes er-flicker {
          0%,100% { opacity: .9; filter: brightness(1); }
          50%     { opacity: 1;  filter: brightness(1.2); }
        }
        @keyframes er-pulse {
          0%,100% { opacity: .85; transform: scale(1); }
          50%     { opacity: 1;   transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
}
