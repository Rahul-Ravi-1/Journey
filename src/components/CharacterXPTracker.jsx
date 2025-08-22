import { useState } from "react";

function CharacterXPTracker() {
  // 🧠 State for XP and Level
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(0);
  const XP_PER_LEVEL = 100;

  // 🎮 Function to gain XP
  const gainXP = (amount) => {
    const newXP = xp + amount;

    if (newXP >= XP_PER_LEVEL) {
      setLevel((prev) => prev + 1);
      setXP(newXP - XP_PER_LEVEL); // carry over extra XP
    } else {
      setXP(newXP);
    }
  };

  return (
    <div>
      <h2>Level {level}</h2>

      {/* XP Bar */}
      <div style={{
        backgroundColor: "#ccc",
        width: "100%",
        height: "20px",
        borderRadius: "10px",
        margin: "10px 0"
      }}>
        <div style={{
          backgroundColor: "#6c63ff",
          width: `${(xp / XP_PER_LEVEL) * 100}%`,
          height: "100%",
          borderRadius: "10px"
        }} />
      </div>

      <p>XP: {xp} / {XP_PER_LEVEL}</p>

      {/* Temporary XP Button */}
      <button onClick={() => gainXP(10)}>Gain 10 XP</button>
    </div>
  );
}

export default CharacterXPTracker;
