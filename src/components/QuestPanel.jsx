import { useState, useMemo } from "react";
import { useQuestStore } from "../store/useQuestStore";
import Panel from "./Panel";

export default function QuestPanel({ title, category }) {
  const [text, setText] = useState("");

  // store selectors
  const items = useQuestStore((s) => s.quests[category] || []);
  const addQuest = useQuestStore((s) => s.addQuest);
  const toggleQuest = useQuestStore((s) => s.toggleQuest);
  const clearCompleted = useQuestStore((s) => s.clearCompleted);
  const clearAll = useQuestStore((s) => s.clearAll);

  const remaining = useMemo(
    () => items.filter((q) => !q.completed).length,
    [items]
  );

  const onAdd = () => {
    const t = (text || "").trim();
    if (!t) return;
    addQuest(category, t);
    setText("");
  };

  return (
    <Panel
      title={title}
      right={
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span
            className="font-vt323"
            style={{ fontSize: 12, opacity: 0.8 }}
            aria-live="polite"
          >
            {remaining}/{items.length} left
          </span>
          <button
            onClick={() => clearCompleted(category)}
            style={{ fontSize: 12, padding: "6px 10px", opacity: 0.9 }}
            title="Remove completed quests"
          >
            Clear done
          </button>
          <button
            onClick={() => clearAll(category)}
            style={{ fontSize: 12, opacity: 0.8, color: "#f87171" }}
           title="Delete all quests"
           >
        Clear all
        </button>
          
        </div>
      }
    >
      {/* Quest list */}
      <ul
        className="font-vt323"
        style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}
      >
        {items.length === 0 ? (
          <li style={{ opacity: 0.7 }}>No quests yet.</li>
        ) : (
          items.map((q) => (
            <li key={q.id}>
              <button
                onClick={() => toggleQuest(category, q.id)}
                aria-label={q.completed ? "Mark as active" : "Mark as done"}
                title={q.completed ? "Uncross" : "Cross off"}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  color: "inherit",
                }}
              >
                <span
                  style={{
                    textDecoration: q.completed ? "line-through" : "none",
                    opacity: q.completed ? 0.6 : 1,
                  }}
                >
                  {q.text}
                </span>
              </button>
            </li>
          ))
        )}
      </ul>

      {/* Input row */}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
          className="font-vt323"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAdd()}
          placeholder={`Add a ${title.toLowerCase()}...`}
          style={{
            flex: 1,
            padding: "8px 10px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(0,0,0,0.2)",
            color: "inherit",
          }}
        />
        <button onClick={onAdd} title="Add quest">Add</button>
      </div>
    </Panel>
  );
}
