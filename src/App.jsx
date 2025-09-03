import "./App.css";
import { useState } from "react";
import XPDashboard from "./components/XPDashboard";
import JournalScreen from "./components/JournalScreen";
import Quests from "./components/Quests";
import FuelLog from "./components/FuelLog";
import BottomNav from "./components/BottomNav";
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
        </div>
      )}

      {screen === "quests" && (
        <div className="quests-screen">
          <Quests />
        </div>
      )}
      {screen === "journal" && (
        <div className="journal-screen">
          <JournalScreen />
        </div>
      )}
      {screen === "fuel" && (
        <div className="fuel-screen">
          <FuelLog />
        </div>
      )}
         {screen !== "intro" && <BottomNav screen={screen} setScreen={setScreen} />}
    </div>
  );
}
export default App;