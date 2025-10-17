import QuestPanel from "./QuestPanel";

export default function Quests() {
  return (
    <div className="screen xp-container">
      <div className="xp-grid">
        <div className="panel-quests">
          <QuestPanel title="Main Quests" category="main" />
        </div>
      </div>
    </div>
  );
}