import React, { useEffect, useRef, useState } from "react";
import SplashBg from "./../../assets/splashBg.png";

/**
 * Props:
 * - image: URL nền splash
 * - initial: % bắt đầu (0–99)
 * - target: % mục tiêu (tự tăng tới target; mặc định 100)
 * - speed: ms mỗi tick tăng (càng nhỏ càng nhanh)
 * - autoClose: tự ẩn khi đạt 100
 * - onDone: callback khi đạt 100%
 * - show: điều khiển hiển thị từ ngoài (nếu muốn)
 */
export default function SplashScreen({
  image,
  initial = 0,
  target = 100,
  speed = 35,
  autoClose = true,
  onDone,
  show: showProp,
}) {
  // ✅ Giữ progress qua DEV double-mount (StrictMode) để không "chạy 2 lần"
  const [progress, setProgress] = useState(() => {
    const saved = typeof window !== "undefined" ? window.__splashProgress : undefined;
    return Number.isFinite(saved) ? saved : initial;
  });
  const [show, setShow] = useState(showProp ?? true);

  // dùng 1 interval duy nhất
  const intervalRef = useRef(null);

  // lock scroll khi hiển thị
  useEffect(() => {
    if (show) {
      const old = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = old);
    }
  }, [show]);

  // điều khiển show từ prop
  useEffect(() => {
    if (showProp !== undefined) setShow(showProp);
  }, [showProp]);

  // ✅ auto tăng %: 1 setInterval + lưu vào window để không reset khi remount
  useEffect(() => {
    if (!show) return;

    // nếu có interval cũ thì clear
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        const step = Math.max(1, Math.round((100 - p) / 25)); // nhanh lúc đầu, chậm dần
        const next = Math.min(target, p + step);
        if (typeof window !== "undefined") window.__splashProgress = next;
        return next;
      });
    }, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [show, speed, target]);

  // đạt 100% → đóng + callback, và reset cờ
  useEffect(() => {
    if (progress >= 100) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const finish = () => {
        if (typeof window !== "undefined") {
          delete window.__splashProgress;
        }
        onDone && onDone();
      };

      if (autoClose) {
        const t = setTimeout(() => {
          setShow(false);
          finish();
        }, 300); // delay nhẹ cho cảm giác hoàn tất
        return () => clearTimeout(t);
      } else {
        finish();
      }
    }
  }, [progress, autoClose, onDone]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black"
      role="dialog"
      aria-label="Loading"
      aria-live="polite"
    >
      {/* Ảnh nền */}
      <div
        className="absolute inset-0 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${image || SplashBg})` }}
      >
        <span
          className="
                font-batman text-5xl font-bold text-white
                [filter:drop-shadow(0_0_10px_rgba(239,68,68,.9))]
                md:[filter:drop-shadow(0_0_18px_rgba(239,68,68,.9))]
              "
        >
          grabway
        </span>
      </div>
      {/* overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

      {/* Nội dung */}
      <div className="relative h-full w-full flex flex-col items-center justify-end pb-10">
        {/* Thanh tiến trình */}
        <div className="w-[80%] max-w-md">
          <div className="h-3 rounded-full bg-white backdrop-blur-md overflow-hidden border border-white/30">
            <div
              className="
                relative h-full rounded-full bg-red-500
                transition-[width] duration-150 ease-out
                [filter:drop-shadow(0_0_10px_rgba(239,68,68,.9))]
                md:[filter:drop-shadow(0_0_18px_rgba(239,68,68,.9))]
                [box-shadow:0_0_8px_rgba(239,68,68,.8),0_0_18px_rgba(239,68,68,.6),0_0_36px_rgba(239,68,68,.4)]
                [will-change:width]
              "
              style={{ width: `${Math.min(100, progress)}%` }}
            >
              {/* lớp glow mềm gần */}
              <span className="pointer-events-none absolute inset-0 rounded-full bg-red-500 blur-[6px] opacity-80" />
              {/* lớp glow xa + nhịp thở */}
              <span className="pointer-events-none absolute inset-0 rounded-full bg-red-500 blur-[14px] opacity-60 animate-pulse" />
            </div>
          </div>

          {/* Dòng % lớn: chữ trắng glow đỏ */}
          <div className="mt-3 text-center">
            <span
              className="
                font-batman text-5xl font-bold text-white
                [filter:drop-shadow(0_0_10px_rgba(239,68,68,.9))]
                md:[filter:drop-shadow(0_0_18px_rgba(239,68,68,.9))]
              "
            >
              {Math.min(100, Math.round(progress))}%
            </span>
          </div>
        </div>

        {/* Footer nhỏ (tùy) */}
        <div className="mt-6 text-white/70 text-xs">@grabway_miniapp_bot</div>
      </div>
    </div>
  );
}
