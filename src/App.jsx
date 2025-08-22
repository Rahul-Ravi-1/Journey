import "./App.css";
import { useState } from "react";
import CharacterXPTracker from "./components/CharacterXPTracker";
//import JourneyScreens from "./components/JourneyScreens";

function App() {
  const [started, setStarted] = useState(false); // 🔁 controls intro vs. dashboard

  return (
    <div>
      {/* 🔁 Conditional rendering based on `started` */}
      {!started ? (
        <div className="intro-screen">
        <h1 className="journey-title">Journey</h1>
        <p className="tagline">Make today count</p>
        <p className="press-to-continue" onClick={() => setStarted(true)}>
          Press to continue
        </p>
      </div>
      ) : (
        <div className="dashboard-screen">
          <CharacterXPTracker />
        </div>
      )}
    </div>
  );
}

export default App;