export default function BottomNav({ screen, setScreen }) {
    return (
      <div className="bottom-nav">
        <button
          className={`nav-item ${screen === "dashboard" ? "active" : ""}`}
          onClick={() => setScreen("dashboard")}
          aria-label="Dashboard"
          title="Dashboard"
        >
          👑
        </button>
  
        <button
          className={`nav-item ${screen === "quests" ? "active" : ""}`}
          onClick={() => setScreen("quests")}
          aria-label="Quests"
          title="Quests"
        >
          🗡
        </button>

        <button
          className={`nav-item ${screen === "journal" ? "active" : ""}`}
          onClick={() => setScreen("journal")}
          aria-label="Journal"
          title="Journal"
        >
          📖
        </button>
      </div>
    );
  }
  