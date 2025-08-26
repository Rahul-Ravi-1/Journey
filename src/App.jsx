import "./App.css";
import { useState } from "react";
import XPDashboard from "./components/XPDashboard";
import JournalScreen from "./components/JournalScreen";
import Quests from "./components/Quests";
import FuelLog from "./components/FuelLog";
function App() {
  const [screen, setScreen] = useState("intro"); // 🔁 controls intro vs. dashboard

  return (
    <div>
      {screen === "intro" && (
        <div className="intro-screen">
          <h1 className="journey-title">Journey</h1>
          <p className="tagline">Make today count</p>
          <p className="press-to-continue" onClick={() => setScreen("dashboard")}>
            Press to continue
          </p>
        </div>
      )}
      {screen === "dashboard" && (
        <div className="dashboard-screen">
          <XPDashboard />
          <button onClick={() => setScreen("quests")}>Go to Quests</button>
          <button onClick={() => setScreen("journal")}>Go to Journal</button>
          <button onClick={() => setScreen("fuel")}>Go to Fuel Log</button>
        </div>
      )}

      {screen === "quests" && (
        <div className="quests-screen">
          <Quests />
          <button onClick={() => setScreen("dashboard")}>Back to Dashboard</button>
        </div>
      )}
      {screen === "journal" && (
        <div className="journal-screen">
          <JournalScreen />
          <button onClick={() => setScreen("dashboard")}>Back to Dashboard</button>
        </div>
      )}
      {screen === "fuel" && (
        <div className="fuel-screen">
          <FuelLog />
          <button onClick={() => setScreen("dashboard")}>Back to Dashboard</button>
        </div>
      )}
    </div>

  );
}
export default App;