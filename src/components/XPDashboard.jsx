import { useState } from "react";
import Windmill from "./Windmill"; // ← if Windmill.jsx is in the same /components folder

function XPDashboard() {
  // XP & Level
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const XP_PER_LEVEL = 100;

  // Momentum (local for now — we’ll move to Zustand next)
  const [momentum, setMomentum] = useState(42);

  const gainXP = (amount) => {
    const newXP = xp + amount;
    if (newXP >= XP_PER_LEVEL) {
      setLevel((prev) => prev + 1);
      setXP(newXP - XP_PER_LEVEL); // carry over
    } else {
      setXP(newXP);
    }
  };

  return (
    <div
      style={{

        padding: "20px",  
        color: "white",
      }}
    >
      {/* Header: Level + Momentum readout */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div
          style={{
            display: "inline-block",
            padding: "8px 16px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "12px",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "12px",
          }}
        >
          Lv {level}
        </div>
        <div style={{ fontFamily: "VT323, monospace", color: "#94A3B8", fontSize: 18 }}>
          Momentum: {momentum}
        </div>
      </div>

      {/* Grid: XP bar + Windmill */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: 20 }}>
        {/* XP column */}
        <div>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              width: "100%",
              height: "24px",
              borderRadius: "12px",
              overflow: "hidden",
              margin: "12px 0",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <div
              style={{
                background: "linear-gradient(90deg, #6EE7F5, #3B82F6)",
                width: `${(xp / XP_PER_LEVEL) * 100}%`,
                height: "100%",
                transition: "width 0.3s ease-out",
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <p style={{ margin: 0, fontFamily: "VT323, monospace" }}>
              XP: {xp} / {XP_PER_LEVEL}
            </p>
            <button
              onClick={() => gainXP(10)}
              style={{
                padding: "10px 16px",
                borderRadius: "12px",
                background: "linear-gradient(90deg, #6EE7F5, #3B82F6)",
                border: "none",
                color: "#000",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Gain 10 XP
            </button>
          </div>
        </div>

        {/* Windmill column */}
        <div style={{ display: "grid", placeItems: "center" }}>
          <Windmill momentum={momentum} size={160} />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button
              onClick={() => setMomentum((m) => Math.min(100, m + 5))}
              style={{
                padding: "6px 10px",
                borderRadius: "10px",
                background: "rgba(110,231,245,0.15)",
                border: "1px solid rgba(110,231,245,0.4)",
                color: "white",
                cursor: "pointer",
              }}
            >
              +5
            </button>
            <button
              onClick={() => setMomentum((m) => Math.max(0, m - 5))}
              style={{
                padding: "6px 10px",
                borderRadius: "10px",
                background: "rgba(110,231,245,0.15)",
                border: "1px solid rgba(110,231,245,0.4)",
                color: "white",
                cursor: "pointer",
              }}
            >
              -5
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default XPDashboard;
