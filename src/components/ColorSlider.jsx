import React, { useRef, useState, useEffect } from "react";

export default function ColorSlider({
  value,
  onChange = () => {},
  height = 18,
  rounded = 9999,
}) {
  const barRef = useRef(null);
  const thumbRef = useRef(null);
  const [pos, setPos] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!value) return;
    const { h } = hexToHsl(value);
    setPos(h / 360);
  }, [value]);

  const pickAt = (clientX) => {
    const rect = barRef.current.getBoundingClientRect();
    let p = (clientX - rect.left) / rect.width;
    p = Math.max(0, Math.min(1, p));
    setPos(p);
    onChange(hslToHex(p * 360, 100, 50));
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

  const thumbLeft = `calc(${pos * 100}% - ${height / 2}px)`;
  const selectedHex = hslToHex(pos * 360, 100, 50);

  return (
    <div className="relative w-full select-none">
      {/* Track */}
      <div
        ref={barRef}
        className="w-full cursor-pointer touch-none"
        style={{
          height,
          borderRadius: rounded,
          background:
            "linear-gradient(90deg, red, #ff8000, yellow, #00ff00, #00ffff, #0000ff, #ff00ff, red)",
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,.35), 0 6px 16px rgba(0,0,0,.35)",
        }}
        onPointerDown={(e) => startDrag(e, barRef.current)}
        onPointerMove={moveDrag}
        onPointerUp={(e) => endDrag(e, barRef.current)}
        onPointerCancel={(e) => endDrag(e, barRef.current)}
      />

      {/* Thumb – nay cũng kéo được */}
      <div
        ref={thumbRef}
        className="absolute top-1/2 -translate-y-1/2 touch-none cursor-grab active:cursor-grabbing"
        style={{ left: thumbLeft }}
        onPointerDown={(e) => startDrag(e, thumbRef.current)}
        onPointerMove={moveDrag}
        onPointerUp={(e) => endDrag(e, thumbRef.current)}
        onPointerCancel={(e) => endDrag(e, thumbRef.current)}
      >
        <div
          className="w-6 h-6 rounded-full ring-2 ring-white shadow-[0_0_10px_rgba(0,0,0,.45)]"
          style={{ background: selectedHex }}
        />
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
  return `#${[f(0), f(8), f(4)]
    .map(x => Math.round(255 * x).toString(16).padStart(2, "0"))
    .join("")}`;
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
