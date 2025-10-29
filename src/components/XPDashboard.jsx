import { useState } from "react";
import Windmill from "./Windmill";
import Panel from "./Panel";
import { useQuestStore } from "../store/useQuestStore";

export default function XPDashboard() {
  console.log(useQuestStore.getState().quests);
  // XP & Level
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const XP_PER_LEVEL = 100;

  // Momentum
  const [momentum, setMomentum] = useState(42);

  const main = useQuestStore((s) => s.quests.main);
  const active = main.filter((q) => !q.completed).slice(0, 5);

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
    <div className="xp-container" style={{ color: "white" }}>
      <div className="xp-grid">
        {/* TOP: TODAY'S QUESTS */}
        <Panel
          title="TODAY'S QUESTS"
          className="panel-quests"
        >
          {active.length === 0 ? (
  <div style={{ opacity: 0.7, fontFamily: "VT323, monospace" }}>
    No active main quests.
  </div>
) : (
  <ul
  style={{
    margin: 0,
    paddingLeft: 0,
    listStyle: "none",
    lineHeight: 1.6,
    fontFamily: "VT323, monospace",
  }}
>
  {active.map((q) => (
    <li key={q.id}>{q.text}</li>
  ))}
</ul>

)}

        </Panel>

        {/* MIDDLE: BIG WINDMILL HERO */}
        <Panel
          title="MOMENTUM"
          className="panel-windmill"
          right={
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={() => setMomentum((m) => Math.min(100, m + 5))}
                style={{
                  padding: "6px 10px",
                  borderRadius: 10,
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
                  borderRadius: 10,
                  background: "rgba(110,231,245,0.15)",
                  border: "1px solid rgba(110,231,245,0.4)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                -5
              </button>
            </div>
          }
        >
          <div className="windmill-hero">
            <Windmill momentum={momentum} size={200} />
          </div>
        </Panel>
      </div>

      {/* FULL WIDTH XP BAR AT BOTTOM */}
      <div className="xp-bar-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h3 style={{ 
            margin: 0, 
            fontFamily: "'Press Start 2P', monospace", 
            fontSize: 12, 
            letterSpacing: 0.5 
          }}>
            LEVEL {level}
          </h3>
          <button
            aria-label="Gain 10 XP"
            onClick={() => gainXP(10)}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              background: "linear-gradient(90deg, #6EE7F5, #3B82F6)",
              border: "none",
              color: "#000",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            +10 XP
          </button>
        </div>
        
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            width: "100%",
            height: 32,
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.2)",
            marginBottom: 8,
          }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={XP_PER_LEVEL}
          aria-valuenow={xp}
          aria-label="Experience bar"
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
        
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          fontFamily: "VT323, monospace",
          fontSize: 14
        }}>
          <span>XP: {xp} / {XP_PER_LEVEL}</span>
          <span>{Math.round((xp / XP_PER_LEVEL) * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
