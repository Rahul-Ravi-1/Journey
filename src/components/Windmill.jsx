import React from "react";

export default function Windmill({ momentum = 40, size = 140 }) {
  const clamped = Math.max(0, Math.min(100, momentum));
  // Map momentum to rotation speed (higher momentum = faster)
  const secondsPerRev = 3 - (clamped / 100) * 2.4; // 3s at 0 → 0.6s at 100
  const dur = Math.max(0.6, secondsPerRev);

  const blade = (
    <rect x={-6} y={-size * 0.35} width={12} height={size * 0.35} rx={4} fill="#6EE7F5" />
  );

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <svg width={size} height={size} viewBox={`-${size/2} -${size/2} ${size} ${size}`}>
        {/* tower */}
        <rect x={-6} y={-size*0.1} width={12} height={size*0.6} rx={6} fill="rgba(255,255,255,0.15)"/>
        {/* hub */}
        <circle r="10" fill="#F59E0B" />
        {/* blades */}
        <g style={{ transformOrigin: "0px 0px", animation: `spin ${dur}s linear infinite` }}>
          {blade}
          <g transform="rotate(90)">{blade}</g>
          <g transform="rotate(180)">{blade}</g>
          <g transform="rotate(270)">{blade}</g>
        </g>
      </svg>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ marginTop: 8, fontFamily: "VT323, monospace", color: "#94A3B8" }}>
        Momentum: {clamped}
      </div>
    </div>
  );
}
