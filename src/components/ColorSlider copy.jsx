import React, { useRef, useState, useEffect } from "react";

export default function ColorPickerHSL({
  value,                 // "#rrggbb" khởi tạo (optional)
  onChange = () => {},   // (hex) => void
}) {
  // state HSL
  const [H, setH] = useState(0);    // 0..360
  const [S, setS] = useState(100);  // 0..100
  const [L, setL] = useState(50);   // 0..100

  // đồng bộ từ prop hex -> HSL
  useEffect(() => {
    if (!value) return;
    const { h, s, l } = hexToHsl(value);
    setH(h); setS(s); setL(l);
  }, [value]);

  // phát hex mỗi khi H/S/L đổi
  useEffect(() => {
    onChange(hslToHex(H, S, L));
  }, [H, S, L, onChange]);

  return (
    <div className="w-full space-y-3">
      {/* PREVIEW */}
      <div className="h-10 rounded-md border border-white/10 shadow-inner"
           style={{ background: `hsl(${H} ${S}% ${L}%)` }} />

      {/* HUE */}
      <Slider
        height={18}
        value={H/360}
        onChangeRatio={(r)=>setH(Math.round(r*360))}
        trackBg={`linear-gradient(90deg,
          #ff0000, #ff8000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)`}
        thumbColor={`hsl(${H} ${100}% ${50}%)`}
        label="Hue"
      />

      {/* SATURATION */}
      <Slider
        height={14}
        value={S/100}
        onChangeRatio={(r)=>setS(Math.round(r*100))}
        trackBg={`linear-gradient(90deg,
          hsl(${H} 0% ${L}%),
          hsl(${H} 100% ${L}%))`}
        thumbColor={`hsl(${H} ${S}% ${L}%)`}
        label="Saturation"
      />

      {/* LIGHTNESS */}
      <Slider
        height={14}
        value={L/100}
        onChangeRatio={(r)=>setL(Math.round(r*100))}
        trackBg={`linear-gradient(90deg,
          hsl(${H} ${S}% 0%),
          hsl(${H} ${S}% 50%),
          hsl(${H} ${S}% 100%))`}
        thumbColor={`hsl(${H} ${S}% ${L}%)`}
        label="Lightness"
      />
    </div>
  );
}

/* ---- Slider con dùng Pointer Events ---- */
function Slider({ value=0, onChangeRatio=()=>{}, height=18, trackBg, thumbColor, rounded=9999, label }) {
  const barRef = useRef(null);
  const thumbRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const pickAt = (clientX) => {
    const rect = barRef.current.getBoundingClientRect();
    let p = (clientX - rect.left) / rect.width;
    p = Math.max(0, Math.min(1, p));
    onChangeRatio(p);
  };

  const startDrag = (e, captureEl) => {
    captureEl?.setPointerCapture?.(e.pointerId);
    setDragging(true);
    pickAt(e.clientX);
  };
  const moveDrag = (e) => dragging && pickAt(e.clientX);
  const endDrag  = (e, captureEl) => {
    setDragging(false);
    captureEl?.releasePointerCapture?.(e.pointerId);
  };

  const left = `calc(${value * 100}% - ${height / 2}px)`;

  return (
    <div>
      {label && <div className="text-xs text-white/60 mb-1">{label}</div>}
      <div className="relative w-full select-none">
        {/* Track */}
        <div
          ref={barRef}
          className="w-full cursor-pointer touch-none rounded-full"
          style={{
            height,
            borderRadius: rounded,
            background: trackBg,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,.35), 0 6px 16px rgba(0,0,0,.35)",
          }}
          onPointerDown={(e) => startDrag(e, barRef.current)}
          onPointerMove={moveDrag}
          onPointerUp={(e) => endDrag(e, barRef.current)}
          onPointerCancel={(e) => endDrag(e, barRef.current)}
        />
        {/* Thumb */}
        <div
          ref={thumbRef}
          className="absolute top-1/2 -translate-y-1/2 touch-none cursor-grab active:cursor-grabbing"
          style={{ left }}
          onPointerDown={(e) => startDrag(e, thumbRef.current)}
          onPointerMove={moveDrag}
          onPointerUp={(e) => endDrag(e, thumbRef.current)}
          onPointerCancel={(e) => endDrag(e, thumbRef.current)}
        >
          <div
            className="w-5 h-5 rounded-full ring-2 ring-white shadow-[0_0_10px_rgba(0,0,0,.45)]"
            style={{ background: thumbColor }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---- helpers ---- */
function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return `#${[f(0), f(8), f(4)].map(x => Math.round(255 * x).toString(16).padStart(2, "0")).join("")}`;
}
function hexToHsl(H) {
  let r=0,g=0,b=0; const m=H.replace("#","");
  if (m.length===3){ r=parseInt(m[0]+m[0],16); g=parseInt(m[1]+m[1],16); b=parseInt(m[2]+m[2],16);}
  else { r=parseInt(m.slice(0,2),16); g=parseInt(m.slice(2,4),16); b=parseInt(m.slice(4,6),16); }
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h=0, s=0, l=(max+min)/2;
  if(max!==min){
    const d=max-min;
    s = l>0.5 ? d/(2-max-min) : d/(max+min);
    switch(max){ case r: h=(g-b)/d+(g<b?6:0); break;
                 case g: h=(b-r)/d+2; break;
                 case b: h=(r-g)/d+4; break; }
    h*=60;
  }
  return { h, s:s*100, l:l*100 };
}
