import React, { useId, useMemo } from "react";

export default function StatChipBorderSVG({
    shape = "slant-right",
    width = 240,
    height = 40,
    radius,
    slant = 20,

    // viền chính của chip (màu -> trong suốt)
    strokeStops = [
        { offset: "0%", color: "#22c55e", opacity: 1 },
        { offset: "100%", color: "#22c55e", opacity: 0 },
    ],
    strokeWidth = 2,

    // fill bên trong: đen -> trong suốt
    alpha = 0.85,
    stopAt = 0.7,

    // === socket (ô tròn ở góc) ===
    icon,
    iconSide = "left",                         // "left" | "right"
    iconBg = "rgba(255,255,255,.08)",
    iconGlow = 0.6,                            // 0..1
    iconScale = 0.72,                          // tỉ lệ icon so với đường kính socket
    socketStrokeWidth = 2,                     // dày viền của socket
    socketStrokeStops,                         // nếu không truyền, sẽ tự lấy theo strokeStops

    className = "",
    children,
}) {
    const id = useId();
    const w = Math.max(width, 1);
    const h = Math.max(height, 1);
    const r = Math.min(radius ?? Math.floor(h / 2), h / 2);
    const s = Math.max(Math.min(slant, w / 2), 0);

    const pathSlantRight = `
    M ${r},0 H ${w - s} L ${w},${h} H ${r}
    A ${r},${r} 0 0 1 0,${h - r} V ${r}
    A ${r},${r} 0 0 1 ${r},0 Z
  `;
    const pathSlantLeft = `
    M ${s},0 H ${w - r}
    A ${r},${r} 0 0 1 ${w},${r} V ${h - r}
    A ${r},${r} 0 0 1 ${w - r},${h} H 0 L ${s},0 Z
  `;

    // màu chủ đạo để dùng cho glow/icon
    const primaryStrokeColor = useMemo(
        () => (strokeStops.find(st => (st.opacity ?? 1) > 0)?.color) || "#22c55e",
        [strokeStops]
    );

    // socket “vừa góc bo”
    const R_socket = Math.max(r - strokeWidth / 2, 0);
    const D_socket = R_socket * 2;
    const cx = (shape === "slant-left" || (shape === "pill" && iconSide === "right")) ? (w - r) : r;
    const cy = h / 2;

    // viền gradient cho socket (nếu không truyền -> mặc định màu -> trong suốt)
    const socketStops = socketStrokeStops ?? [
        { offset: "0%", color: primaryStrokeColor, opacity: 1 },
        { offset: "100%", color: primaryStrokeColor, opacity: 0 },
    ];
    const hexToRgba = (hex, opacity = 1) => {
        const h = hex.replace('#', '');
        const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    // build chuỗi stop cho linear-gradient
    const cssStops = (stops) =>
        stops.map(s => `${hexToRgba(s.color, s.opacity ?? 1)} ${s.offset}`).join(', ');
    return (
        <div className={`relative inline-block ${className}`} style={{ width: w, height: h }}>
            <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
                <defs>
                    {/* fill: đen -> trong suốt */}
                    <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={`rgba(0,0,0,${alpha})`} />
                        <stop offset={`${stopAt * 100}%`} stopColor="rgba(0,0,0,0)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </linearGradient>

                    {/* stroke của chip */}
                    <linearGradient id={`stroke-${id}`} x1="0" y1="0" x2="1" y2="0">
                        {strokeStops.map((st, i) => (
                            <stop key={i} offset={st.offset} stopColor={st.color} stopOpacity={st.opacity ?? 1} />
                        ))}
                    </linearGradient>

                    {/* stroke gradient cho socket – chạy ngang qua tâm */}
                    <linearGradient
                        id={`socket-stroke-${id}`}
                        x1={cx - R_socket} y1={cy}
                        x2={cx + R_socket} y2={cy}
                        gradientUnits="userSpaceOnUse"
                    >
                        {socketStops.map((st, i) => (
                            <stop key={i} offset={st.offset} stopColor={st.color} stopOpacity={st.opacity ?? 1} />
                        ))}
                    </linearGradient>

                    {/* mask giữ hình + socket khít nhau */}
                    <mask id={`mask-${id}`}>
                        {shape === "pill" ? (
                            <rect x="0" y="0" width={w} height={h} rx={r} fill="white" />
                        ) : shape === "slant-right" ? (
                            <path d={pathSlantRight} fill="white" />
                        ) : (
                            <path d={pathSlantLeft} fill="white" />
                        )}
                        <circle cx={cx} cy={cy} r={R_socket} fill="white" />
                    </mask>
                </defs>

                {/* lớp chip */}
                {shape === "pill" ? (
                    <rect
                        x={strokeWidth / 2}
                        y={strokeWidth / 2}
                        width={w - strokeWidth}
                        height={h - strokeWidth}
                        rx={r}
                        fill={`url(#fill-${id})`}
                        stroke={`url(#stroke-${id})`}
                        strokeWidth={strokeWidth}
                        mask={`url(#mask-${id})`}
                    />
                ) : shape === "slant-right" ? (
                    <path
                        d={pathSlantRight}
                        fill={`url(#fill-${id})`}
                        stroke={`url(#stroke-${id})`}
                        strokeWidth={strokeWidth}
                        vectorEffect="non-scaling-stroke"
                        mask={`url(#mask-${id})`}
                    />
                ) : (
                    <path
                        d={pathSlantLeft}
                        fill={`url(#fill-${id})`}
                        stroke={`url(#stroke-${id})`}
                        strokeWidth={strokeWidth}
                        vectorEffect="non-scaling-stroke"
                        mask={`url(#mask-${id})`}
                    />
                )}

                {/* socket: nền + glow (không viền) */}

            </svg>

            {/* nội dung + icon */}
            <div
                className="absolute inset-0 flex items-center  gap-3 "
            // style={{ paddingLeft: padL, paddingRight: padR, gap: 8 }}
            >
                {icon && (
                    <div
                        className={`grid items-center justify-center border   rounded-full icon-center`}
                        style={{
                            border: `${strokeWidth}px solid ${strokeStops[0]?.color || '#22c55e'}`,
                            width: D_socket + 1,
                            height: D_socket + 1,
                            filter: iconGlow ? `drop-shadow(0 0 ${8 * iconGlow}px ${primaryStrokeColor})` : "none",
                        }}
                    >
                        {React.isValidElement(icon)
                            ? React.cloneElement(icon, {
                                focusable: "false",
                                preserveAspectRatio: "xMidYMid meet",
                            })
                            : <img src={icon} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        }
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}
